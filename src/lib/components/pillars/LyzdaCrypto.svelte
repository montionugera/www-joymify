<script lang="ts">
	interface Props {
		isBullMode?: boolean;
	}
	let { isBullMode = false }: Props = $props();

	const price = $derived(isBullMode ? 1.65 : 1.24);
	const reserve = $derived(isBullMode ? 18.2 : 12.4);
	const apy = $derived(isBullMode ? '14.2%' : '8.6%');
	const supply = 42_000_000;
	const staked = $derived(isBullMode ? 28_400_000 : 18_700_000);
	const stakedPct = $derived(Math.round((staked / supply) * 100));
</script>

<div class="lyzda-crypto">
	<!-- Coin Visual -->
	<div class="coin-container">
		<div class="coin" aria-label="Lyzda Coin">
			<div class="coin-face front">
				<div class="coin-symbol">₿</div>
				<div class="coin-name">LYD</div>
			</div>
			<div class="coin-face back">
				<div class="coin-symbol">⊕</div>
			</div>
			<!-- Orbital ring -->
			<div class="orbit-ring">
				<div class="orbit-particle"></div>
			</div>
		</div>

		<div class="coin-price">
			<div class="price-value text-gold">${price.toFixed(4)}</div>
			<div class="price-label">LZD / USD</div>
		</div>
	</div>

	<!-- Treasury bar -->
	<div class="treasury-section">
		<div class="treasury-header">
			<span class="t-label">Centralized Treasury Reserve</span>
			<span class="t-value text-gold">${reserve}M</span>
		</div>
		<div class="treasury-bar">
			<div class="treasury-fill" style="width: {Math.min(100, (reserve / 25) * 100)}%"></div>
		</div>
		<div class="treasury-legend">
			<span>0</span>
			<span>Target: $25M</span>
		</div>
	</div>

	<!-- Staking stats -->
	<div class="staking-row">
		<div class="staking-item">
			<span class="s-val text-gold">{stakedPct}%</span>
			<span class="s-label">Supply Staked</span>
		</div>
		<div class="staking-item">
			<span class="s-val text-electric">{apy}</span>
			<span class="s-label">Staking APY</span>
		</div>
		<div class="staking-item">
			<span class="s-val" style="color: var(--color-success)">42M</span>
			<span class="s-label">Max Supply</span>
		</div>
	</div>
</div>

<style>
	.lyzda-crypto {
		width: 100%;
	}

	.coin-container {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 1.25rem;
		justify-content: center;
	}

	.coin {
		width: 80px;
		height: 80px;
		position: relative;
		transform-style: preserve-3d;
		animation: coin-spin 8s linear infinite;
		flex-shrink: 0;
	}

	.coin-face {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		backface-visibility: hidden;
	}

	.front {
		background: radial-gradient(circle at 35% 35%, #ffe066, #b8860b, #7a5800);
		border: 3px solid rgba(255, 215, 0, 0.5);
		box-shadow:
			0 0 20px rgba(255, 215, 0, 0.4),
			inset 0 2px 4px rgba(255, 255, 255, 0.3);
	}

	.back {
		background: radial-gradient(circle at 65% 35%, #b8860b, #7a5800);
		transform: rotateY(180deg);
	}

	.coin-symbol {
		font-size: 1.5rem;
		line-height: 1;
	}
	.coin-name {
		font-size: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.8);
	}

	.orbit-ring {
		position: absolute;
		inset: -16px;
		border-radius: 50%;
		border: 1px solid rgba(255, 215, 0, 0.2);
	}

	.orbit-particle {
		position: absolute;
		width: 6px;
		height: 6px;
		background: var(--color-gold);
		border-radius: 50%;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		animation: orbit 4s linear infinite;
	}

	.coin-price {
		text-align: left;
	}
	.price-value {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.5rem;
		font-weight: 800;
	}
	.price-label {
		font-size: 0.65rem;
		color: var(--color-text-secondary);
		letter-spacing: 0.1em;
	}

	/* Treasury */
	.treasury-section {
		margin-bottom: 1rem;
	}
	.treasury-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.4rem;
	}
	.t-label {
		font-size: 0.65rem;
		color: var(--color-text-muted);
		letter-spacing: 0.05em;
	}
	.t-value {
		font-weight: 700;
		font-size: 0.9rem;
	}

	.treasury-bar {
		height: 8px;
		background: rgba(255, 215, 0, 0.1);
		border-radius: 4px;
		overflow: hidden;
		border: 1px solid rgba(255, 215, 0, 0.15);
	}
	.treasury-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-gold), #ffa500);
		border-radius: 4px;
		transition: width 1.5s ease;
		box-shadow: 0 0 8px var(--color-gold-glow);
	}
	.treasury-legend {
		display: flex;
		justify-content: space-between;
		font-size: 0.55rem;
		color: var(--color-text-muted);
		margin-top: 0.25rem;
	}

	/* Staking */
	.staking-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		text-align: center;
	}
	.staking-item {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	.s-val {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.9rem;
		font-weight: 700;
	}
	.s-label {
		font-size: 0.6rem;
		color: var(--color-text-muted);
	}
</style>
