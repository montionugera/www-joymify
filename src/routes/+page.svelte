<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { bullMode, navigatorOpen, personaStore } from '$lib/stores/portal';
	import type { PortalData, PersonaType } from '$lib/types';

	import JoymifyPulse from '$lib/components/shared/JoymifyPulse.svelte';
	import ContextualSidebar from '$lib/components/shared/ContextualSidebar.svelte';
	import NavigatorModal from '$lib/components/shared/NavigatorModal.svelte';
	import PillarCard from '$lib/components/ui/PillarCard.svelte';

	// ── Server Data (from BFF) ────────────────────────────────────────────────
	let { data }: { data: PortalData } = $props();

	// Reactive pillars — intentionally captures initial server value.
	// Gets overwritten by handlePersonaSelected() after quiz completion.
	// @ts-ignore
	let pillars = $state(data.pillars);

	// ── Re-order pillars from Navigator result ────────────────────────────────
	async function handlePersonaSelected(persona: PersonaType) {
		if (!persona) return;

		try {
			const mode = data.isBullMode ? '?mode=bull' : '';
			const res = await fetch(`/api/pillars${mode}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ persona })
			});
			const json = await res.json();
			pillars = json.pillars;

			// Optionally update URL for shareability
			const url = new URL($page.url);
			url.searchParams.set('persona', persona);
			goto(url.toString(), { replaceState: true, noScroll: true });
		} catch {
			// Silently retain current order
		}
	}

	// ── Bull mode sync ────────────────────────────────────────────────────────
	onMount(() => {
		bullMode.set(data.isBullMode);
	});
</script>

<svelte:head>
	<title>
		{data.isBullMode ? '🚀 BULL MODE — ' : ''}Joymify Universe | Investor Portal
	</title>
</svelte:head>

<!-- Navigator Modal (portal-level, rendered outside grid) -->
<NavigatorModal onPersonaSelected={handlePersonaSelected} />

<main class="portal-layout" class:bull={data.isBullMode}>
	<!-- ① Hero: Joymify Pulse ──────────────────────────────────────────────── -->
	<JoymifyPulse initialPulse={data.pulse} isBullMode={data.isBullMode} />

	<!-- ② Main content grid ──────────────────────────────────────────────────── -->
	<div class="content-grid">
		<!-- Left: 6 Pillar Cards ─────────────────────────────────────────────── -->
		<section class="pillars-section" aria-label="Joymify Universe Pillars">
			<div class="section-header">
				<div class="section-meta">
					<h2 class="section-title">
						The <span class="gradient-text-gold">6 Pillars</span>
					</h2>
					<p class="section-sub">
						{#if $personaStore}
							Ordered for <strong class="text-electric">{$personaStore}</strong> profile
						{:else}
							Click any pillar to explore its live data
						{/if}
					</p>
				</div>

				<!-- Navigator CTA -->
				<button
					class="navigator-btn"
					onclick={() => navigatorOpen.set(true)}
					aria-label="Start the Joymify Navigator persona quiz"
					id="navigator-cta"
				>
					<span class="nb-icon">🧭</span>
					<span>Start Journey</span>
				</button>
			</div>

			<!-- Pillar Grid -->
			<div class="pillar-grid" role="list" aria-label="6 pillar cards">
				{#each pillars as pillar, i (pillar.id)}
					<div role="listitem" animate:flip={{ duration: 400 }}>
						<PillarCard {pillar} index={i} />
					</div>
				{/each}
			</div>
		</section>

		<!-- Right: Contextual Sidebar ──────────────────────────────────────── -->
		<aside class="sidebar-section glass" aria-label="Pillar detail panel">
			<div class="sidebar-inner">
				<ContextualSidebar
					algoChart={data.algoChart}
					agentFeed={data.agentFeed}
					crmStats={data.crmStats}
					isBullMode={data.isBullMode}
				/>
			</div>
		</aside>
	</div>

	<!-- ③ Footer ──────────────────────────────────────────────────────────────── -->
	<footer class="portal-footer">
		<div class="footer-inner">
			<div class="footer-brand">
				<span class="gradient-text-gold">Joymify Universe</span>
				<span class="footer-sep">·</span>
				<span class="footer-version">Portal v1.0 — BFF Edition</span>
			</div>
			<div class="footer-links">
				<span class="footer-link">Powered by <span class="text-electric">SvelteKit BFF</span></span>
				<span class="footer-sep">·</span>
				<span class="footer-link">Currency: <span class="text-gold">LYD</span></span>
				{#if data.isBullMode}
					<span class="footer-sep">·</span>
					<span class="bull-tag">🚀 BULL MODE</span>
				{/if}
			</div>
		</div>
	</footer>
</main>

<style>
	/* ── Layout ─────────────────────────────────────────────────────────────── */
	.portal-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--color-bg);
	}

	.content-grid {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr 340px;
		gap: 0;
		overflow: hidden;
	}

	/* ── Pillars Section ─────────────────────────────────────────────────────── */
	.pillars-section {
		padding: 1.5rem 2rem;
		border-right: 1px solid var(--color-border);
		overflow-y: auto;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.25rem;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.section-title {
		font-size: 1.3rem;
		font-weight: 800;
		margin: 0 0 0.25rem;
	}

	.section-sub {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		margin: 0;
	}

	/* Navigator button */
	.navigator-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.25rem;
		background: linear-gradient(135deg, var(--color-electric), #005cc8);
		color: #fff;
		border: none;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 700;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		box-shadow: 0 4px 16px rgba(0, 112, 243, 0.35);
		white-space: nowrap;
	}

	.navigator-btn:hover {
		transform: scale(1.06) translateY(-1px);
		box-shadow: 0 6px 24px rgba(0, 112, 243, 0.5);
	}

	.navigator-btn:active {
		transform: scale(0.98);
	}

	.nb-icon {
		font-size: 1rem;
	}

	/* Pillar Grid */
	.pillar-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.875rem;
	}

	/* ── Sidebar ─────────────────────────────────────────────────────────────── */
	.sidebar-section {
		position: sticky;
		top: 0;
		height: calc(100vh - 137px); /* subtract hero height */
		overflow: hidden;
		border-radius: 0;
		border: none;
		border-left: 1px solid var(--color-border);
		background: rgba(255, 255, 255, 0.02);
	}

	.sidebar-inner {
		height: 100%;
		overflow-y: auto;
		padding: 1.5rem;
	}

	/* ── Footer ─────────────────────────────────────────────────────────────── */
	.portal-footer {
		border-top: 1px solid var(--color-border);
		padding: 0.75rem 2rem;
		background: rgba(0, 0, 0, 0.2);
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.footer-brand {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.footer-version {
		color: var(--color-text-muted);
		font-size: 0.7rem;
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.7rem;
		color: var(--color-text-muted);
	}

	.footer-link {
		font-size: 0.7rem;
	}
	.footer-sep {
		color: var(--color-text-muted);
	}

	.bull-tag {
		font-size: 0.65rem;
		font-weight: 700;
		color: var(--color-success);
		letter-spacing: 0.05em;
	}

	/* ── Bull mode global tint ───────────────────────────────────────────────── */
	.portal-layout.bull {
		background-image: radial-gradient(
			ellipse 60% 40% at 50% 0%,
			rgba(16, 185, 129, 0.04) 0%,
			transparent 60%
		);
	}

	/* ── Responsive ─────────────────────────────────────────────────────────── */
	@media (max-width: 1024px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.sidebar-section {
			position: relative;
			height: auto;
			min-height: 400px;
			border-left: none;
			border-top: 1px solid var(--color-border);
		}

		.pillars-section {
			border-right: none;
		}
	}

	@media (max-width: 640px) {
		.pillar-grid {
			grid-template-columns: 1fr;
		}
		.pillars-section {
			padding: 1rem;
		}
		.sidebar-inner {
			padding: 1rem;
		}
	}
</style>
