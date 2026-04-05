<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { activePillar } from '$lib/stores/portal';
	import AlgoTrading from '$lib/components/pillars/AlgoTrading.svelte';
	import LyzdaCrypto from '$lib/components/pillars/LyzdaCrypto.svelte';
	import AIAgentHub from '$lib/components/pillars/AIAgentHub.svelte';
	import BusinessPlatform from '$lib/components/pillars/BusinessPlatform.svelte';
	import AppDailyBundle from '$lib/components/pillars/AppDailyBundle.svelte';
	import GamePlatform from '$lib/components/pillars/GamePlatform.svelte';
	import type { AlgoChartPoint, AgentTask, CRMStats } from '$lib/types';

	interface Props {
		algoChart: AlgoChartPoint[];
		agentFeed: AgentTask[];
		crmStats: CRMStats;
		isBullMode?: boolean;
	}

	let { algoChart, agentFeed, crmStats, isBullMode = false }: Props = $props();

	const pillar = $derived($activePillar);
</script>

<aside class="contextual-sidebar">
	{#if !pillar}
		<!-- Empty state -->
		<div class="empty-state" in:fade={{ duration: 200 }}>
			<div class="empty-icon">⬡</div>
			<p class="empty-title">Select a Pillar</p>
			<p class="empty-sub">
				Click any card to explore detailed metrics and live data for that business pillar.
			</p>

			<!-- Quick hints -->
			<div class="hint-list">
				{#each ['📈 Algo Trading — strategy performance', '🪙 Lyzda — treasury reserve', '🤖 AI Hub — live agent feed', '📊 Business — CRM funnel', '📱 App Bundle — mirroring demo', '⚔️ Game — MMORPG world'] as hint}
					<span class="hint-item">{hint}</span>
				{/each}
			</div>
		</div>
	{:else}
		<div
			class="pillar-detail"
			style="--pillar-color: {pillar.color}; --pillar-glow: {pillar.glowColor};"
			in:fly={{ x: 20, duration: 260 }}
		>
			<!-- Header -->
			<div class="detail-header">
				<div class="detail-top">
					<div class="detail-icon">
						{#if pillar.id === 'algo-trading'}📈{:else if pillar.id === 'lyzda-crypto'}🪙{:else if pillar.id === 'ai-agent-hub'}🤖{:else if pillar.id === 'business-platform'}📊{:else if pillar.id === 'app-daily-bundle'}📱{:else}⚔️{/if}
					</div>
					<div>
						<h2 class="detail-name" style="color: var(--pillar-color)">{pillar.name}</h2>
						<p class="detail-tagline">{pillar.tagline}</p>
					</div>
				</div>
				<p class="detail-desc">{pillar.description}</p>
			</div>

			<!-- Pillar-specific content -->
			<div class="detail-visual">
				{#if pillar.id === 'algo-trading'}
					<AlgoTrading chartData={algoChart} {isBullMode} />
				{:else if pillar.id === 'lyzda-crypto'}
					<LyzdaCrypto {isBullMode} />
				{:else if pillar.id === 'ai-agent-hub'}
					<AIAgentHub {agentFeed} {isBullMode} />
				{:else if pillar.id === 'business-platform'}
					<BusinessPlatform stats={crmStats} {isBullMode} />
				{:else if pillar.id === 'app-daily-bundle'}
					<AppDailyBundle {isBullMode} />
				{:else if pillar.id === 'game-platform'}
					<GamePlatform {isBullMode} />
				{/if}
			</div>

			<!-- Metric KPIs -->
			<div class="metric-pills">
				{#each pillar.metrics as m}
					<div class="pill" style="border-color: {pillar.glowColor}">
						<span class="pill-label">{m.label}</span>
						<span class="pill-value" style="color: var(--pillar-color)">{m.value}</span>
					</div>
				{/each}
			</div>

			<!-- Close CTA -->
			<button class="close-btn" onclick={() => activePillar.set(null)} aria-label="Deselect pillar">
				Deselect
			</button>
		</div>
	{/if}
</aside>

<style>
	.contextual-sidebar {
		width: 100%;
		height: 100%;
		min-height: 400px;
		overflow-y: auto;
	}

	/* Empty state */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 2rem 1rem;
	}

	.empty-icon {
		font-size: 3rem;
		color: var(--color-text-muted);
		margin-bottom: 1rem;
		animation: float-y 4s ease-in-out infinite;
	}

	.empty-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-text-secondary);
		margin: 0 0 0.5rem;
	}

	.empty-sub {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin: 0 0 1.5rem;
		max-width: 220px;
		line-height: 1.6;
	}

	.hint-list {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		width: 100%;
	}

	.hint-item {
		font-size: 0.65rem;
		color: var(--color-text-muted);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 0.5rem;
		padding: 0.4rem 0.75rem;
		text-align: left;
	}

	/* Pillar detail */
	.pillar-detail {
		width: 100%;
	}

	.detail-header {
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.detail-top {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.detail-icon {
		font-size: 2rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.detail-name {
		font-size: 1.1rem;
		font-weight: 800;
		margin: 0 0 0.25rem;
	}

	.detail-tagline {
		font-size: 0.72rem;
		color: var(--color-text-secondary);
		margin: 0;
	}

	.detail-desc {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		margin: 0;
	}

	.detail-visual {
		padding: 1rem;
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 0.75rem;
		margin-bottom: 1rem;
	}

	/* Metric pills */
	.metric-pills {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.pill {
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.pill-label {
		font-size: 0.6rem;
		color: var(--color-text-muted);
	}
	.pill-value {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.85rem;
		font-weight: 700;
	}

	.close-btn {
		width: 100%;
		padding: 0.6rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-text-secondary);
		border-radius: 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		color: var(--color-text-primary);
	}
</style>
