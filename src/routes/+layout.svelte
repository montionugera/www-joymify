<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { bullMode } from '$lib/stores/portal';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const isBull = $page.url.searchParams.get('mode') === 'bull';
		bullMode.set(isBull);
		if (isBull) document.body.classList.add('bull-mode');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Joymify Universe — Investor Portal</title>
	<meta
		name="description"
		content="The Command Center for the Joymify Universe. Explore 6 interconnected business pillars powered by the Lyzda currency ecosystem."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta property="og:title" content="Joymify Universe — Investor Portal" />
	<meta property="og:description" content="Command Center. 6 Pillars. One Ecosystem." />
	<meta name="theme-color" content="#09090b" />
</svelte:head>

{@render children()}
