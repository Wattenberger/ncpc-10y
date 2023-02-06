<script>
	import Header from './Header.svelte';
	import { footer } from '$/content/general.json';
	import './styles.css';
</script>

<div class="">
	<!-- <Header /> -->

	<main class="w-full min-h-[calc(100vh-10em)]">
		<slot />
	</main>

	<footer class="w-full flex justify-end px-10 py-6 font-sans">
		{footer}
	</footer>
</div>
