<script lang="ts">
	import type { AgentTask } from '$lib/types';

	interface Props {
		agentFeed: AgentTask[];
		isBullMode?: boolean;
	}

	let { agentFeed, isBullMode = false }: Props = $props();

	// Double the feed for seamless infinite scroll
	const doubled = $derived([...agentFeed, ...agentFeed]);

	const statusColors: Record<AgentTask['status'], string> = {
		Done: '#10b981',
		'In Progress': '#0070f3',
		Queued: '#6b7280',
		Failed: '#ef4444'
	};

	const statusDots: Record<AgentTask['status'], string> = {
		Done: '✓',
		'In Progress': '◉',
		Queued: '○',
		Failed: '✗'
	};
</script>

<div class="ai-agent-hub">
	<div class="hub-header">
		<span class="hub-title">Live Job Feed</span>
		<div class="hub-stats">
			<span class="live-badge"
				>● {agentFeed.filter((a) => a.status === 'In Progress').length} Active</span
			>
			<span class="done-badge">✓ {agentFeed.filter((a) => a.status === 'Done').length} Done</span>
		</div>
	</div>

	<div class="feed-container" aria-label="Agent task feed">
		<div class="feed-track">
			{#each doubled as task, i (i + '-' + task.id)}
				<div class="feed-item">
					<span class="agent-id">{task.agentId}</span>
					<div class="task-info">
						<span class="task-role">{task.role}</span>
						<span class="task-name">{task.task}</span>
					</div>
					<span
						class="status-badge"
						style="color: {statusColors[task.status]}; border-color: {statusColors[task.status]}40;"
					>
						{statusDots[task.status]}
						{task.status}
					</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Total stats footer -->
	<div class="hub-footer">
		<div class="hf-stat">
			<span class="hf-val" style="color: #8b5cf6">{isBullMode ? '2,847' : '1,209'}</span>
			<span class="hf-label">Total Agents</span>
		</div>
		<div class="hf-stat">
			<span class="hf-val text-electric">{isBullMode ? '38.4K' : '12.7K'}</span>
			<span class="hf-label">Tasks/Day</span>
		</div>
		<div class="hf-stat">
			<span class="hf-val text-gold">{isBullMode ? '4.93' : '4.76'}</span>
			<span class="hf-label">Avg Rating</span>
		</div>
	</div>
</div>

<style>
	.ai-agent-hub {
		width: 100%;
	}

	.hub-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.hub-title {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: var(--color-text-secondary);
	}

	.hub-stats {
		display: flex;
		gap: 0.75rem;
	}

	.live-badge {
		font-size: 0.65rem;
		font-weight: 700;
		color: #0070f3;
		animation: pulse-glow 2s infinite;
	}

	.done-badge {
		font-size: 0.65rem;
		font-weight: 700;
		color: var(--color-success);
	}

	/* Scrolling feed */
	.feed-container {
		height: 120px;
		overflow: hidden;
		mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
		border-radius: 0.5rem;
		background: rgba(0, 0, 0, 0.2);
		margin-bottom: 0.75rem;
	}

	.feed-track {
		display: flex;
		flex-direction: column;
		animation: ticker-scroll 25s linear infinite;
	}

	.feed-track:hover {
		animation-play-state: paused;
	}

	.feed-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.4rem 0.75rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
		flex-shrink: 0;
	}

	.agent-id {
		font-size: 0.62rem;
		font-weight: 700;
		color: #8b5cf6;
		white-space: nowrap;
		min-width: 72px;
		font-family: 'Space Grotesk', monospace;
	}

	.task-info {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		flex: 1;
		min-width: 0;
	}

	.task-role {
		font-size: 0.62rem;
		font-weight: 600;
		color: var(--color-text-secondary);
		white-space: nowrap;
		padding: 0.1rem 0.4rem;
		background: rgba(139, 92, 246, 0.12);
		border-radius: 4px;
	}

	.task-name {
		font-size: 0.65rem;
		color: var(--color-text-primary);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.status-badge {
		font-size: 0.6rem;
		font-weight: 700;
		padding: 0.15rem 0.45rem;
		border: 1px solid;
		border-radius: 4px;
		white-space: nowrap;
		flex-shrink: 0;
	}

	/* Footer */
	.hub-footer {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		text-align: center;
	}
	.hf-stat {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	.hf-val {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.85rem;
		font-weight: 700;
	}
	.hf-label {
		font-size: 0.6rem;
		color: var(--color-text-muted);
	}
</style>
