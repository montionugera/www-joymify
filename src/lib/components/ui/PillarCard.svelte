<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { activePillar, hoveredPillar } from '$lib/stores/portal';
	import type { Pillar } from '$lib/types';

	interface Props {
		pillar: Pillar;
		index?: number;
	}

	let { pillar, index = 0 }: Props = $props();

	let isActive = $derived($activePillar?.id === pillar.id);
	let isHovered = $derived($hoveredPillar === pillar.id);

	function selectPillar() {
		activePillar.set(isActive ? null : pillar);
	}

	function onHover(entering: boolean) {
		hoveredPillar.set(entering ? pillar.id : null);
	}

	const lucideMap: Record<string, string> = {
		TrendingUp: '📈',
		Coins: '🪙',
		Bot: '🤖',
		BarChart3: '📊',
		Smartphone: '📱',
		Swords: '⚔️'
	};

	const emoji = lucideMap[pillar.icon] ?? '⬡';

	function trendSymbol(trend?: number) {
		if (trend === 1) return '↑';
		if (trend === -1) return '↓';
		return '—';
	}
</script>

<article
	class="pillar-card"
	class:active={isActive}
	style="--pillar-color: {pillar.color}; --pillar-glow: {pillar.glowColor};"
	role="button"
	tabindex="0"
	aria-label="View {pillar.name} pillar"
	aria-pressed={isActive}
	onclick={selectPillar}
	onkeydown={(e) => e.key === 'Enter' && selectPillar()}
	onmouseenter={() => onHover(true)}
	onmouseleave={() => onHover(false)}
	in:fly={{ y: 30, delay: index * 60, duration: 400 }}
>
	<!-- Glow layer -->
	<div class="card-glow" aria-hidden="true"></div>

	<!-- Top row: Icon + Name -->
	<div class="card-header">
		<div class="card-icon" aria-hidden="true">{emoji}</div>
		<div class="card-meta">
			<h3 class="card-name">{pillar.name}</h3>
			<p class="card-tagline">{pillar.tagline}</p>
		</div>
		{#if isActive}
			<div class="active-badge" in:fade={{ duration: 150 }}>Selected</div>
		{/if}
	</div>

	<!-- Metrics -->
	<div class="card-metrics">
		{#each pillar.metrics as metric}
			<div class="metric">
				<span class="metric-value" style="color: var(--pillar-color)">{metric.value}</span>
				<span class="metric-label">{metric.label} {trendSymbol(metric.trend)}</span>
			</div>
		{/each}
	</div>

	<!-- Bottom accent bar -->
	<div class="accent-bar"></div>
</article>

<style>
	.pillar-card {
		position: relative;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: var(--radius-card);
		padding: 1.25rem;
		cursor: pointer;
		transition:
			transform 0.22s ease,
			box-shadow 0.22s ease,
			border-color 0.22s ease,
			background 0.22s ease;
		overflow: hidden;
		user-select: none;
		-webkit-user-select: none;
	}

	.pillar-card:hover {
		transform: scale(1.035) translateY(-2px);
		box-shadow:
			0 8px 32px var(--pillar-glow),
			0 2px 8px rgba(0, 0, 0, 0.4);
		border-color: var(--pillar-color);
		background: rgba(255, 255, 255, 0.055);
	}

	.pillar-card.active {
		border-color: var(--pillar-color);
		background: rgba(255, 255, 255, 0.06);
		box-shadow:
			0 0 0 2px var(--pillar-color),
			0 8px 32px var(--pillar-glow);
		transform: scale(1.025) translateY(-2px);
	}

	.pillar-card:focus-visible {
		outline: 2px solid var(--pillar-color);
		outline-offset: 2px;
	}

	/* Glow gradient overlay */
	.card-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 80% 60% at 50% 0%, var(--pillar-glow) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}
	.pillar-card:hover .card-glow,
	.pillar-card.active .card-glow {
		opacity: 1;
	}

	/* Header */
	.card-header {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		margin-bottom: 1rem;
		position: relative;
	}

	.card-icon {
		font-size: 1.75rem;
		flex-shrink: 0;
		line-height: 1;
		filter: drop-shadow(0 0 6px var(--pillar-glow));
	}

	.card-meta {
		flex: 1;
	}

	.card-name {
		font-size: 0.95rem;
		font-weight: 700;
		margin: 0 0 0.2rem;
		color: var(--color-text-primary);
	}

	.card-tagline {
		font-size: 0.7rem;
		color: var(--color-text-secondary);
		margin: 0;
		line-height: 1.4;
	}

	.active-badge {
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		padding: 0.15rem 0.5rem;
		background: var(--pillar-color);
		color: #fff;
		border-radius: 999px;
		white-space: nowrap;
	}

	/* Metrics */
	.card-metrics {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.5rem;
	}

	.metric {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.metric-value {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.metric-label {
		font-size: 0.6rem;
		color: var(--color-text-muted);
		letter-spacing: 0.04em;
	}

	/* Bottom accent */
	.accent-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--pillar-color), transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.pillar-card:hover .accent-bar,
	.pillar-card.active .accent-bar {
		opacity: 1;
	}
</style>
