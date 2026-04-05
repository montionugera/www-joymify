<script lang="ts">
	import type { AlgoChartPoint } from '$lib/types';

	interface Props {
		chartData: AlgoChartPoint[];
		isBullMode?: boolean;
	}

	let { chartData, isBullMode = false }: Props = $props();

	const W = 280,
		H = 100;
	const PAD = 8;

	const points = $derived(
		chartData.map((p) => ({
			x: PAD + (p.x / 100) * (W - PAD * 2),
			y: H - PAD - (p.y / 100) * (H - PAD * 2)
		}))
	);

	const pathD = $derived(
		points.length === 0
			? ''
			: points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
	);

	const areaD = $derived(
		pathD ? `${pathD} L ${(points.at(-1)?.x ?? W).toFixed(1)} ${H} L ${PAD} ${H} Z` : ''
	);

	const lastPoint = $derived(points.at(-1));
	const firstY = $derived(points[0]?.y ?? H / 2);
	const lastY = $derived(lastPoint?.y ?? H / 2);
	const isPositive = $derived(lastY < firstY);
	const lineColor = $derived(isBullMode ? '#00ff88' : isPositive ? '#10b981' : '#0070f3');
</script>

<div class="algo-trading">
	<div class="algo-header">
		<div class="algo-info">
			<span class="strategy-badge">Safe Strategy</span>
			<span class="strategy-status {isBullMode ? 'bull' : 'nominal'}">
				{isBullMode ? '🚀 Bull Run' : '● Active'}
			</span>
		</div>
		<div class="algo-pnl" style="color: {lineColor}">
			{isPositive ? '+' : ''}{((lastPoint?.y ?? 50) - 50).toFixed(1)}% vs Base
		</div>
	</div>

	<div class="chart-wrapper">
		<svg viewBox="0 0 {W} {H}" width="100%" preserveAspectRatio="none" class="chart-svg">
			<defs>
				<linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color={lineColor} stop-opacity="0.3" />
					<stop offset="100%" stop-color={lineColor} stop-opacity="0" />
				</linearGradient>
			</defs>

			<!-- Area fill -->
			{#if areaD}
				<path d={areaD} fill="url(#lineGrad)" />
			{/if}

			<!-- Grid lines -->
			{#each [0.25, 0.5, 0.75] as t}
				<line
					x1={PAD}
					y1={PAD + t * (H - PAD * 2)}
					x2={W - PAD}
					y2={PAD + t * (H - PAD * 2)}
					stroke="rgba(255,255,255,0.06)"
					stroke-width="1"
				/>
			{/each}

			<!-- Main line -->
			{#if pathD}
				<path
					d={pathD}
					fill="none"
					stroke={lineColor}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="chart-line"
					style="stroke-dasharray: 600; animation: draw-line 1.5s ease forwards;"
				/>
			{/if}

			<!-- Current price dot -->
			{#if lastPoint}
				<circle cx={lastPoint.x} cy={lastPoint.y} r="4" fill={lineColor} class="price-dot" />
				<circle
					cx={lastPoint.x}
					cy={lastPoint.y}
					r="8"
					fill={lineColor}
					opacity="0.2"
					class="price-ping"
				/>
			{/if}
		</svg>

		<!-- Y-axis labels -->
		<div class="y-labels">
			<span>+{isBullMode ? '15' : '8'}%</span>
			<span>Base</span>
			<span>-5%</span>
		</div>
	</div>

	<div class="algo-stats">
		<div class="as-item">
			<span class="as-val" style="color: {lineColor}">{isBullMode ? '78.4' : '72.1'}%</span>
			<span class="as-label">Win Rate</span>
		</div>
		<div class="as-item">
			<span class="as-val text-electric">{isBullMode ? '2.1' : '1.84'}</span>
			<span class="as-label">Sharpe</span>
		</div>
		<div class="as-item">
			<span class="as-val text-gold">{isBullMode ? '$4,820' : '$1,240'}/d</span>
			<span class="as-label">Avg PnL</span>
		</div>
	</div>
</div>

<style>
	.algo-trading {
		width: 100%;
	}

	.algo-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.algo-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.strategy-badge {
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		padding: 0.2rem 0.6rem;
		background: rgba(0, 112, 243, 0.15);
		border: 1px solid rgba(0, 112, 243, 0.3);
		color: var(--color-electric);
		border-radius: 999px;
	}

	.strategy-status.nominal {
		font-size: 0.7rem;
		color: var(--color-success);
		font-weight: 600;
	}
	.strategy-status.bull {
		font-size: 0.7rem;
		color: #00ff88;
		font-weight: 600;
	}

	.algo-pnl {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.9rem;
		font-weight: 700;
	}

	.chart-wrapper {
		position: relative;
		display: flex;
		align-items: stretch;
		gap: 0.25rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
		padding: 0.5rem;
		margin-bottom: 0.75rem;
		overflow: hidden;
	}

	.chart-svg {
		flex: 1;
		display: block;
	}

	.chart-line {
		animation: draw-line 1.5s ease forwards;
	}

	.price-dot {
		animation: pulse-glow 2s infinite;
	}

	.y-labels {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 0.55rem;
		color: var(--color-text-muted);
		padding: 4px 0;
	}

	.algo-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		text-align: center;
	}

	.as-item {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	.as-val {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.85rem;
		font-weight: 700;
	}
	.as-label {
		font-size: 0.6rem;
		color: var(--color-text-muted);
	}
</style>
