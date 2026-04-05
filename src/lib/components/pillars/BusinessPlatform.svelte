<script lang="ts">
	import type { CRMStats } from '$lib/types';

	interface Props {
		stats: CRMStats;
		isBullMode?: boolean;
	}

	let { stats, isBullMode = false }: Props = $props();

	function formatMRR(n: number): string {
		if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
		return `$${(n / 1000).toFixed(0)}K`;
	}

	function formatUsers(n: number): string {
		if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
		return `${n}`;
	}
</script>

<div class="business-platform">
	<!-- Header KPI row -->
	<div class="kpi-row">
		<div class="kpi-card kpi-mrr">
			<div class="kpi-label">MRR</div>
			<div class="kpi-value" style="color: #10b981">{formatMRR(stats.mrr)}</div>
			<div class="kpi-trend positive">↑ {stats.mrrGrowth.toFixed(1)}% mo/mo</div>
		</div>
		<div class="kpi-card kpi-users">
			<div class="kpi-label">Active Users</div>
			<div class="kpi-value text-electric">{formatUsers(stats.activeUsers)}</div>
			<div class="kpi-sub">Across all orgs</div>
		</div>
		<div class="kpi-card kpi-nps">
			<div class="kpi-label">NPS Score</div>
			<div class="kpi-value text-gold">{stats.nps}</div>
			<div class="kpi-sub">
				{stats.nps >= 70 ? 'World Class' : stats.nps >= 50 ? 'Excellent' : 'Good'}
			</div>
		</div>
	</div>

	<!-- CRM funnel visualization -->
	<div class="funnel">
		<div class="funnel-label">Sales Funnel</div>
		<div class="funnel-bars">
			<div class="funnel-row">
				<span class="funnel-stage">Leads</span>
				<div class="funnel-bar-wrap">
					<div class="funnel-bar" style="width: 100%; background: rgba(16,185,129,0.6);"></div>
				</div>
				<span class="funnel-count">{(stats.leads / 1000).toFixed(1)}K</span>
			</div>
			<div class="funnel-row">
				<span class="funnel-stage">Qualified</span>
				<div class="funnel-bar-wrap">
					<div class="funnel-bar" style="width: 65%; background: rgba(16,185,129,0.5);"></div>
				</div>
				<span class="funnel-count">{((stats.leads * 0.65) / 1000).toFixed(1)}K</span>
			</div>
			<div class="funnel-row">
				<span class="funnel-stage">Customers</span>
				<div class="funnel-bar-wrap">
					<div
						class="funnel-bar"
						style="width: {stats.conversion * 6}%; background: rgba(16,185,129,0.8);"
					></div>
				</div>
				<span class="funnel-count positive">{stats.conversion.toFixed(1)}%</span>
			</div>
		</div>
	</div>

	<!-- Growth indicators -->
	<div class="growth-row">
		<div class="g-item">
			<span class="g-val positive">+{stats.leadsGrowth.toFixed(0)}%</span>
			<span class="g-label">Lead Growth</span>
		</div>
		<div class="g-divider"></div>
		<div class="g-item">
			<span class="g-val" style="color: #10b981">+{stats.mrrGrowth.toFixed(1)}%</span>
			<span class="g-label">Revenue MoM</span>
		</div>
		<div class="g-divider"></div>
		<div class="g-item">
			<span class="g-val text-gold">{stats.conversion.toFixed(1)}%</span>
			<span class="g-label">Conversion</span>
		</div>
	</div>
</div>

<style>
	.business-platform {
		width: 100%;
	}

	.kpi-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.kpi-card {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
		padding: 0.6rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.kpi-label {
		font-size: 0.6rem;
		color: var(--color-text-muted);
		letter-spacing: 0.06em;
		margin-bottom: 0.2rem;
	}
	.kpi-value {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1rem;
		font-weight: 800;
		line-height: 1;
	}
	.kpi-trend {
		font-size: 0.6rem;
		margin-top: 0.15rem;
	}
	.kpi-sub {
		font-size: 0.6rem;
		color: var(--color-text-muted);
		margin-top: 0.15rem;
	}
	.positive {
		color: #10b981;
	}

	/* Funnel */
	.funnel {
		margin-bottom: 0.75rem;
	}
	.funnel-label {
		font-size: 0.65rem;
		color: var(--color-text-muted);
		letter-spacing: 0.06em;
		margin-bottom: 0.5rem;
	}
	.funnel-bars {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.funnel-row {
		display: grid;
		grid-template-columns: 70px 1fr 40px;
		align-items: center;
		gap: 0.5rem;
	}

	.funnel-stage {
		font-size: 0.62rem;
		color: var(--color-text-secondary);
		text-align: right;
	}
	.funnel-bar-wrap {
		height: 8px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 4px;
		overflow: hidden;
	}
	.funnel-bar {
		height: 100%;
		border-radius: 4px;
		transition: width 1s ease;
	}
	.funnel-count {
		font-size: 0.62rem;
		font-weight: 700;
		color: var(--color-text-primary);
	}

	/* Growth row */
	.growth-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		justify-content: space-around;
	}
	.g-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.1rem;
	}
	.g-val {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.9rem;
		font-weight: 700;
	}
	.g-label {
		font-size: 0.6rem;
		color: var(--color-text-muted);
	}
	.g-divider {
		width: 1px;
		height: 24px;
		background: rgba(255, 255, 255, 0.1);
	}
</style>
