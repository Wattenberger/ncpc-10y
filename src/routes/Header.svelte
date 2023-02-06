<script>
	import { page } from '$app/stores';
	import { title } from '$/content/general.json';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header class="w-full px-10 py-6 font-sans">
	<nav class="flex items-center justify-between">
		<span class="font-bold text-xl">{title}</span>
	</nav>
</header>
