import archieml from 'archieml'
import fs from 'fs'
import fetch from 'node-fetch'
import { parse } from 'node-html-parser';

const DOC_ID = "1sBKDE5HD9C7Sjqa3kz3GdAajA_R5XAjxma_dqLmUdMI"
const DOC_SHEET_INDEX = 0
const fetchContent = async () => {
  const base = "https://docs.google.com";
  const post = `document/d/${DOC_ID}/export?format=html&id=${DOC_ID}&gid=${DOC_SHEET_INDEX}`;
  const url = `${base}/${post}`;
  console.log("Fetching content from Google Docs...", url);

  try {
    const res = await fetch(url);
    const text = await res.text();
    if (text.includes("<title>Page Not Found</title>")) {
      throw new Error("Content not found!");
    }

    const htmlStructure = parse(text);

    const stylesText = htmlStructure.querySelector('style')?.text || '';
    const styleMarks = getStylesFromText(stylesText);
    console.log('styleMarks', styleMarks)

    const bodyContent = htmlStructure.querySelector('body')
    const bodyText = splatTextAndAddStyleMarks(bodyContent, styleMarks)

    const data = archieml.load(bodyText);
    console.log("Content parsed!", data);
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

const inlineElements = ["span", "a"]
const splatTextAndAddStyleMarks = (node, styleMarksPerClass = {}) => {
  let styleMarks = new Set();
  (node.classList?.value || []).forEach((className) => {
    styleMarksPerClass[className]?.forEach((styleMark) => styleMarks.add(styleMark))
  })
  styleMarks = [...styleMarks]
  let text = node.childNodes.length ? "" : node.text
  text += node.childNodes.map((child) => {
    let text = splatTextAndAddStyleMarks(child, styleMarksPerClass)
    return text
  }).join('')
  text = [
    styleMarks.map((styleMark) => `<${styleMark}>`).join(''),
    text,
    styleMarks.map((styleMark) => `</${styleMark}>`).reverse().join('')
  ].join('')
  if (!inlineElements.includes(node.rawTagName) && node.childNodes.length) text += '\n'
  if (node.rawTagName === 'a') {
    const url = /href="([^"]+)"/.exec(node.rawAttrs)?.[1]
      .replace("https://www.google.com/url?q=", "")
      .split("&")[0]
    text = `<a href="${url}">${text}</a>`
  }
  if (["ul", "ol", "li"].includes(node.rawTagName)) {
    text = `<${node.rawTagName}>${text}</${node.rawTagName}>`
  }
  return text
}

const getStylesFromText = (text) => {
  const classStyles = {};
  [
    ["font-weight:700", "strong"],
    ["font-style:italic", "em"],
  ].forEach(([style, styleMarks]) => {
    const regex = new RegExp(`([^}]+)({[^{}]*(${style})[^{}]*})`, 'g')
    const matches = text.match(regex)
    matches?.forEach((match) => {
      const selectors = match.split('{')[0].split(',');
      const classNames = selectors.filter((selector) => selector.startsWith('.')).map((selector) => selector.slice(1))
      classNames?.forEach((className) => {
        if (!classStyles[className]) classStyles[className] = []
        classStyles[className].push(styleMarks)
      })
    })
  })
  return classStyles;
}



export default async function updateContent() {
  try {
    const data = await fetchContent(DOC_ID);
    if (!data) return;
    fs.writeFileSync(
      './src/content/general.json',
      JSON.stringify(data, null, 2)
    );
  } catch (err) {
    console.error(err.message);
  }
}

updateContent();