<script>
	import content from '$/content/general.json';
</script>

<svelte:head>
	<title>{content.tab_title}</title>
	<meta name="description" content="Info about the NCPC 10Y beat" />
</svelte:head>

<section>
	<div class="whitespace-pre-wrap max-w-[60em] mx-auto">
		<h1 class="">{content.title}</h1>

		{@html content.about}

		<div class="my-20 grid grid-cols-[1fr,1fr] gap-5">
			{#each content.faq || [] as { title, info }}
				<div>
					<h3>{title}</h3>
					{@html info}
				</div>
			{/each}
		</div>

		<div class="my-20">
			<iframe
				width="100%"
				height="450"
				frameborder="0"
				title="Police beats"
				src="https://felt.com/embed/map/Tutorial-Learn-to-Use-Felt-SSfd9AgpRQMOPPucWAFUeOC?lat=37.837316&lon=-122.27199&zoom=14.491"
			/>
		</div>

		<h2>Meetings</h2>

		{@html content.schedule}
	</div>
</section>

<style></style>
