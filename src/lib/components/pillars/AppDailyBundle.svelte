<script lang="ts">
	interface Props {
		isBullMode?: boolean;
	}
	let { isBullMode = false }: Props = $props();

	const dau = $derived(isBullMode ? '94K' : '38K');
	const session = $derived(isBullMode ? '48m' : '32m');
	const appCount = 24;

	// Simulated mirrored apps
	const apps = [
		{ name: 'Joy Music', icon: '🎵', color: '#8b5cf6' },
		{ name: 'Joy Map', icon: '🗺️', color: '#0070f3' },
		{ name: 'Joy Finance', icon: '💰', color: '#10b981' },
		{ name: 'Joy Social', icon: '💬', color: '#f59e0b' },
		{ name: 'Joy Work', icon: '📋', color: '#ef4444' },
		{ name: 'Joy AI', icon: '🤖', color: '#6366f1' }
	];
</script>

<div class="app-daily-bundle">
	<!-- Phone mockup -->
	<div class="phone-frame-wrapper">
		<div class="phone-frame" aria-label="Air Mirroring demo">
			<!-- Status bar -->
			<div class="phone-status">
				<span>9:41</span>
				<div class="phone-indicators">
					<span>●●●</span>
					<span>WiFi</span>
					<span>⚡</span>
				</div>
			</div>

			<!-- Air Mirroring badge -->
			<div class="air-mirror-badge">
				<span class="am-dot"></span>
				AIR MIRRORING
			</div>

			<!-- App grid -->
			<div class="phone-app-grid">
				{#each apps as app}
					<div class="phone-app" style="--app-color: {app.color}">
						<div class="app-icon">{app.icon}</div>
						<div class="app-name">{app.name.replace('Joy ', '')}</div>
					</div>
				{/each}
			</div>

			<!-- Bottom wave -->
			<div class="phone-home-bar"></div>
		</div>

		<!-- Receiving screen indicator -->
		<div class="mirror-arrow">→</div>
		<div class="tv-frame">
			<div class="tv-label">Any Screen</div>
			<div class="tv-content">
				<div class="tv-mirrored">
					<span>🖥️</span>
					<span class="tv-text">Mirroring Active</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Stats row -->
	<div class="bundle-stats">
		<div class="bs-item">
			<span class="bs-val text-gold">{appCount}</span>
			<span class="bs-label">Apps Bundled</span>
		</div>
		<div class="bs-item">
			<span class="bs-val" style="color: #f59e0b">{dau}</span>
			<span class="bs-label">Daily Users</span>
		</div>
		<div class="bs-item">
			<span class="bs-val text-electric">{session}</span>
			<span class="bs-label">Avg Session</span>
		</div>
	</div>
</div>

<style>
	.app-daily-bundle {
		width: 100%;
	}

	.phone-frame-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	/* Phone */
	.phone-frame {
		width: 100px;
		background: #1a1a2e;
		border-radius: 16px;
		border: 2px solid rgba(255, 255, 255, 0.15);
		padding: 6px;
		box-shadow:
			0 8px 24px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(245, 158, 11, 0.2);
		position: relative;
		animation: float-y 4s ease-in-out infinite;
	}

	.phone-status {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.5rem;
		color: rgba(255, 255, 255, 0.6);
		padding: 2px 4px;
		margin-bottom: 4px;
	}

	.phone-indicators {
		display: flex;
		gap: 3px;
	}

	.air-mirror-badge {
		display: flex;
		align-items: center;
		gap: 3px;
		font-size: 0.45rem;
		font-weight: 700;
		color: #f59e0b;
		letter-spacing: 0.06em;
		background: rgba(245, 158, 11, 0.1);
		border: 1px solid rgba(245, 158, 11, 0.3);
		border-radius: 4px;
		padding: 2px 6px;
		margin-bottom: 6px;
		justify-content: center;
	}

	.am-dot {
		width: 4px;
		height: 4px;
		background: #f59e0b;
		border-radius: 50%;
		animation: pulse-green 1.5s infinite;
	}

	.phone-app-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 4px;
		margin-bottom: 6px;
	}

	.phone-app {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 4px 2px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.2s;
	}

	.phone-app:hover {
		background: rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 6px var(--app-color);
	}

	.app-icon {
		font-size: 0.9rem;
		line-height: 1;
	}
	.app-name {
		font-size: 0.38rem;
		color: rgba(255, 255, 255, 0.6);
		text-align: center;
	}

	.phone-home-bar {
		width: 40%;
		height: 3px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		margin: 0 auto;
	}

	/* Arrow + TV */
	.mirror-arrow {
		color: rgba(245, 158, 11, 0.5);
		font-size: 1.2rem;
		animation: pulse-glow 2s infinite;
	}

	.tv-frame {
		width: 80px;
		background: #1a1a2e;
		border-radius: 8px;
		border: 2px solid rgba(245, 158, 11, 0.2);
		padding: 6px;
		box-shadow: 0 0 12px rgba(245, 158, 11, 0.15);
	}

	.tv-label {
		font-size: 0.45rem;
		color: rgba(255, 255, 255, 0.4);
		text-align: center;
		margin-bottom: 4px;
	}

	.tv-content {
		height: 50px;
		background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(0, 112, 243, 0.1));
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tv-mirrored {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}
	.tv-text {
		font-size: 0.4rem;
		color: rgba(245, 158, 11, 0.8);
		text-align: center;
	}

	/* Stats */
	.bundle-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		text-align: center;
	}
	.bs-item {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	.bs-val {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.9rem;
		font-weight: 700;
	}
	.bs-label {
		font-size: 0.6rem;
		color: var(--color-text-muted);
	}
</style>
