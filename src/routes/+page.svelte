<script>
	import content from '$/content/general.json';
	import HtmlContent from '$/HtmlContent.svelte';
</script>

<svelte:head>
	<title>{content.tab_title}</title>
	<meta name="description" content="Info about the NCPC 10Y beat" />
</svelte:head>

<div class="w-full overflow-hidden flex items-start justify-center">
	{@html content.header_image}
</div>

<section class="grid grid-cols-[2em,1fr,min(50em,calc(100vw-4em)),1fr,2em]">
	<div class="col-start-3">
		<h1 class="">{content.title}</h1>

		<HtmlContent value={content.about} />

		<div class="my-20 grid md:grid-cols-[1fr,1fr] gap-9">
			{#each (content.faq || []).filter(Boolean) as faq}
				{@const length = JSON.stringify(faq).length}
				{@const isFullWidth = length > 800}
				<div class:md:col-span-2={isFullWidth}>
					<h3>
						<HtmlContent value={faq.title} />
					</h3>
					<HtmlContent value={faq.info} />
				</div>
			{/each}
		</div>
	</div>

	<div class="my-20 gap-10 col-start-1 col-span-5 h-[36em]">
		<iframe
			width="100%"
			height="100%"
			frameborder="0"
			title="Police beats"
			src="https://felt.com/embed/map/Tutorial-Learn-to-Use-Felt-SSfd9AgpRQMOPPucWAFUeOC?lat=37.837316&lon=-122.27199&zoom=14.491"
		/>
	</div>

	<div class="col-start-3">
		<h2>Meetings</h2>

		<HtmlContent value={content.schedule} />
	</div>
</section>

<style></style>
