<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { bullMode } from '$lib/stores/portal';
	import type { LyzdaPulse } from '$lib/types';

	interface Props {
		initialPulse: LyzdaPulse;
		isBullMode?: boolean;
	}

	let { initialPulse, isBullMode = false }: Props = $props();

	let pulse = $state<LyzdaPulse>(initialPulse);
	let volumeDisplayed = $state(0);
	let tickerInterval: ReturnType<typeof setInterval> | null = null;
	let counterAnimFrame: number | null = null;
	let priceFlash = $state<'up' | 'down' | null>(null);

	// ── Animate volume counter on mount ──────────────────────────────────────
	const targetVolume = initialPulse.volume;
	const counterDuration = 2000;

	function animateCounter() {
		const start = performance.now();
		function step(now: number) {
			const p = Math.min((now - start) / counterDuration, 1);
			const ease = 1 - Math.pow(1 - p, 3); // ease-out-cubic
			volumeDisplayed = Math.floor(ease * targetVolume);
			if (p < 1) counterAnimFrame = requestAnimationFrame(step);
			else volumeDisplayed = targetVolume;
		}
		counterAnimFrame = requestAnimationFrame(step);
	}

	// ── Live hydration via client-side ticker ─────────────────────────────────
	async function fetchPulse() {
		try {
			const mode = isBullMode ? '?mode=bull' : '';
			const res = await fetch(`/api/pulse${mode}`);
			const next: LyzdaPulse = await res.json();
			const prev = pulse.price;
			pulse = next;
			priceFlash = next.price > prev ? 'up' : next.price < prev ? 'down' : null;
			setTimeout(() => (priceFlash = null), 600);
		} catch {
			// Silently fail — BFF may be temporarily unavailable
		}
	}

	onMount(() => {
		animateCounter();
		tickerInterval = setInterval(fetchPulse, 3500);
	});

	onDestroy(() => {
		if (tickerInterval) clearInterval(tickerInterval);
		if (counterAnimFrame) cancelAnimationFrame(counterAnimFrame);
	});

	function formatCurrency(n: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 4
		}).format(n);
	}

	function formatVolume(n: number): string {
		if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
		if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
		return `$${n}`;
	}
</script>

<header class="joymify-pulse">
	<!-- Grid background -->
	<div class="pulse-grid-bg"></div>

	<!-- Orb glows -->
	<div class="orb orb-blue"></div>
	<div class="orb orb-gold"></div>

	<div class="pulse-content">
		<!-- Left: Branding -->
		<div class="brand-section">
			<div class="brand-badge">
				<span class="badge-dot"></span>
				<span>LIVE COMMAND CENTER</span>
			</div>
			<h1 class="brand-title">
				<span class="gradient-text-electric">Joymify</span>
				<span class="text-gold shimmer-text"> Universe</span>
			</h1>
			<p class="brand-subtitle">The ecosystem where every pillar runs on Lyzda.</p>
		</div>

		<!-- Center: Lyzda Price Ticker -->
		<div class="lyzda-ticker glass-gold">
			<div class="ticker-header">
				<span class="ticker-label">LZD / USD</span>
				<span class="ticker-live">● LIVE</span>
			</div>
			<div
				class="ticker-price"
				class:flash-up={priceFlash === 'up'}
				class:flash-down={priceFlash === 'down'}
			>
				{formatCurrency(pulse.price)}
			</div>
			<div
				class="ticker-change"
				class:positive={pulse.priceChange >= 0}
				class:negative={pulse.priceChange < 0}
			>
				{pulse.priceChange >= 0 ? '▲' : '▼'}
				{Math.abs(pulse.priceChange).toFixed(4)}
				({pulse.priceChangePct >= 0 ? '+' : ''}{pulse.priceChangePct}%)
			</div>
		</div>

		<!-- Right: Stats Grid -->
		<div class="stats-grid">
			<!-- Volume -->
			<div class="stat-card glass">
				<div class="stat-label">Ecosystem Volume</div>
				<div class="stat-value text-electric">{formatVolume(volumeDisplayed)}+</div>
				<div class="stat-sub">Total 24h</div>
			</div>

			<!-- Network Health -->
			<div class="stat-card glass">
				<div class="stat-label">Network Health</div>
				<div class="stat-value" style="color: var(--color-success)">{pulse.networkHealth}%</div>
				<div class="health-bar">
					<div class="health-fill" style="width: {pulse.networkHealth}%"></div>
				</div>
			</div>

			<!-- Node Status -->
			<div class="stat-card glass">
				<div class="stat-label">Global Node Status</div>
				<div class="node-status">
					<span class="node-dot"></span>
					<span class="node-text">{pulse.nodeStatus}</span>
				</div>
				<div class="stat-sub">All regions nominal</div>
			</div>
		</div>
	</div>

	{#if isBullMode}
		<div class="bull-banner">
			🚀 BULL MODE ACTIVE — All metrics showing success scenario projections
		</div>
	{/if}
</header>

<style>
	.joymify-pulse {
		position: relative;
		overflow: hidden;
		padding: 2rem 2.5rem 1.5rem;
		border-bottom: 1px solid var(--color-border);
		background: radial-gradient(
			ellipse 80% 100% at 50% -20%,
			rgba(0, 112, 243, 0.08) 0%,
			transparent 60%
		);
	}

	.pulse-grid-bg {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
		background-size: 48px 48px;
		pointer-events: none;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(40px);
		pointer-events: none;
		animation: pulse-glow 4s ease-in-out infinite;
	}
	.orb-blue {
		width: 300px;
		height: 300px;
		background: rgba(0, 112, 243, 0.12);
		top: -100px;
		left: 10%;
	}
	.orb-gold {
		width: 200px;
		height: 200px;
		background: rgba(255, 215, 0, 0.08);
		top: -80px;
		right: 15%;
		animation-delay: 2s;
	}

	.pulse-content {
		position: relative;
		display: flex;
		align-items: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	/* Brand */
	.brand-section {
		flex: 1;
		min-width: 220px;
	}

	.brand-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		color: var(--color-electric);
		padding: 0.25rem 0.75rem;
		background: var(--color-electric-muted);
		border: 1px solid rgba(0, 112, 243, 0.3);
		border-radius: 999px;
		margin-bottom: 0.75rem;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		background: var(--color-electric);
		border-radius: 50%;
		animation: pulse-green 2s ease-in-out infinite;
	}

	.brand-title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 900;
		margin: 0 0 0.5rem;
		line-height: 1.1;
	}

	.brand-subtitle {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		margin: 0;
	}

	/* Lyzda Ticker */
	.lyzda-ticker {
		flex: 0 0 auto;
		padding: 1.25rem 2rem;
		text-align: center;
		min-width: 200px;
	}

	.ticker-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.ticker-label {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--color-text-secondary);
	}

	.ticker-live {
		font-size: 0.65rem;
		font-weight: 700;
		color: var(--color-success);
		letter-spacing: 0.05em;
		animation: pulse-glow 1.5s ease-in-out infinite;
	}

	.ticker-price {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--color-gold);
		letter-spacing: -0.02em;
		transition: color 0.3s ease;
	}

	.flash-up {
		color: var(--color-success) !important;
	}
	.flash-down {
		color: #ef4444 !important;
	}

	.ticker-change {
		font-size: 0.8rem;
		font-weight: 600;
		margin-top: 0.35rem;
		font-variant-numeric: tabular-nums;
	}
	.ticker-change.positive {
		color: var(--color-success);
	}
	.ticker-change.negative {
		color: #f87171;
	}

	/* Stats */
	.stats-grid {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		min-width: 320px;
	}

	.stat-card {
		padding: 0.875rem 1rem;
	}

	.stat-label {
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
		text-transform: uppercase;
		margin-bottom: 0.35rem;
	}

	.stat-value {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.3rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.stat-sub {
		font-size: 0.65rem;
		color: var(--color-text-muted);
		margin-top: 0.2rem;
	}

	.health-bar {
		height: 4px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
		margin-top: 0.4rem;
		overflow: hidden;
	}

	.health-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-success), #34d399);
		border-radius: 2px;
		transition: width 1s ease;
	}

	.node-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.node-dot {
		width: 10px;
		height: 10px;
		background: var(--color-success);
		border-radius: 50%;
		animation: pulse-green 2s ease-in-out infinite;
		flex-shrink: 0;
	}

	.node-text {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-success);
	}

	/* Bull Mode Banner */
	.bull-banner {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(90deg, #10b981, #059669);
		color: #fff;
		text-align: center;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		padding: 0.3rem;
	}

	@media (max-width: 768px) {
		.pulse-content {
			flex-direction: column;
		}
		.stats-grid {
			grid-template-columns: repeat(3, 1fr);
			min-width: auto;
			width: 100%;
		}
		.lyzda-ticker {
			width: 100%;
		}
	}
</style>
