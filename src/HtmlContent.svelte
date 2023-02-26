<script>
	export let value = '';

	$: html = typeof value === 'string' ? value : value.map((d) => d.value).join('');
</script>

<div class="element w-full space-y-6">
	<div class="whitespace-pre-wrap mx-auto">
		{@html html}
	</div>
</div>

<style>
	.element :global(img) {
		margin: 2em auto;
	}
</style>
