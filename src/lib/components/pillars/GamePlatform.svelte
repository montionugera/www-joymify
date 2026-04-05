<script lang="ts">
	interface Props {
		isBullMode?: boolean;
	}
	let { isBullMode = false }: Props = $props();

	const concurrent = $derived(isBullMode ? '128K' : '47K');
	const lyd = $derived(isBullMode ? '840K' : '210K');
	const guilds = $derived(isBullMode ? '3,200' : '890');
</script>

<div class="game-platform">
	<!-- Hero image -->
	<div class="game-hero">
		<img
			src="/images/game-platform-hero.png"
			alt="MMORPG World — Joymify Game Platform"
			loading="lazy"
		/>
		<div class="game-overlay">
			<div class="overlay-top">
				<div class="world-badge">
					<span class="world-dot"></span>
					SERVERS ONLINE
				</div>
			</div>
			<div class="overlay-bottom">
				<div class="game-title-badge">Joymify Online</div>
				<p class="game-tagline">Epic Worlds. Real Rewards.</p>
			</div>
		</div>
	</div>

	<!-- LZD play-to-earn banner -->
	<div class="earn-banner">
		<span class="earn-icon">🪙</span>
		<span class="earn-text"
			>Every quest completed earns <strong class="text-gold">Lyzda (LYD)</strong> tokens</span
		>
	</div>

	<!-- Stats -->
	<div class="game-stats">
		<div class="gs-item">
			<span class="gs-val" style="color: #ef4444">{concurrent}</span>
			<span class="gs-label">Online Now</span>
		</div>
		<div class="gs-item">
			<span class="gs-val text-gold">{lyd}</span>
			<span class="gs-label">LZD Earned</span>
		</div>
		<div class="gs-item">
			<span class="gs-val text-electric">{guilds}</span>
			<span class="gs-label">Active Guilds</span>
		</div>
	</div>
</div>

<style>
	.game-platform {
		width: 100%;
	}

	/* Hero image */
	.game-hero {
		position: relative;
		border-radius: 0.75rem;
		overflow: hidden;
		margin-bottom: 0.75rem;
		height: 130px;
	}

	.game-hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 30%;
		display: block;
	}

	.game-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0.6rem;
	}

	.overlay-top {
		display: flex;
		justify-content: flex-end;
	}

	.world-badge {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: #fff;
		background: rgba(239, 68, 68, 0.3);
		border: 1px solid rgba(239, 68, 68, 0.5);
		border-radius: 999px;
		padding: 0.15rem 0.5rem;
	}

	.world-dot {
		width: 5px;
		height: 5px;
		background: #ef4444;
		border-radius: 50%;
		animation: pulse-green 1.5s infinite;
	}

	.overlay-bottom {
		text-align: left;
	}

	.game-title-badge {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.9rem;
		font-weight: 800;
		color: #fff;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
	}

	.game-tagline {
		font-size: 0.6rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0.1rem 0 0;
	}

	/* LZD banner */
	.earn-banner {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.75rem;
		background: rgba(255, 215, 0, 0.07);
		border: 1px solid rgba(255, 215, 0, 0.15);
		border-radius: 0.5rem;
		margin-bottom: 0.75rem;
		font-size: 0.65rem;
		color: var(--color-text-secondary);
	}

	.earn-icon {
		font-size: 0.9rem;
	}

	/* Stats */
	.game-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		text-align: center;
	}
	.gs-item {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	.gs-val {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.9rem;
		font-weight: 700;
	}
	.gs-label {
		font-size: 0.6rem;
		color: var(--color-text-muted);
	}
</style>
