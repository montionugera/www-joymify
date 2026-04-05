/**
 * Joymify Mock Data Engine
 *
 * This module simulates data from 6 downstream microservices.
 * Each function is annotated with the real API endpoint it should
 * eventually call. See README.md → "API Migration Guide" for details.
 *
 * @module mock-engine
 */

import type {
	LyzdaPulse,
	Pillar,
	AgentTask,
	CRMStats,
	AlgoChartPoint,
	PillarId,
	PersonaType
} from '$lib/types';

// ── Simulated network delay (ms) ──────────────────────────────────────────────
const LATENCY = { min: 40, max: 180 };

function simulateLatency(): Promise<void> {
	const ms = Math.random() * (LATENCY.max - LATENCY.min) + LATENCY.min;
	return new Promise((r) => setTimeout(r, ms));
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function rand(min: number, max: number, decimals = 2): number {
	return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function jitter(base: number, pct = 0.05): number {
	return parseFloat((base * (1 + (Math.random() * 2 - 1) * pct)).toFixed(4));
}

// ── Lyzda Pulse ─────────────────────────────────────────────────────────────
// REAL API → GET /api/lyzda/price  (Lyzda Treasury Service)
export async function getLyzdaPulse(bullMode = false): Promise<LyzdaPulse> {
	await simulateLatency();

	const basePrice = bullMode ? rand(1.58, 1.72) : rand(1.18, 1.3);
	const change = bullMode ? rand(0.05, 0.12) : rand(-0.03, 0.04);

	return {
		price: basePrice,
		priceChange: change,
		priceChangePct: parseFloat(((change / basePrice) * 100).toFixed(2)),
		volume: bullMode ? rand(8_000_000, 12_000_000, 0) : rand(3_800_000, 5_200_000, 0),
		nodeStatus: 'Operational',
		networkHealth: bullMode ? rand(97, 100, 0) : rand(91, 99, 0),
		lastUpdated: new Date().toISOString()
	};
}

// ── Algo Chart ────────────────────────────────────────────────────────────────
// REAL API → GET /api/algo/performance?strategy=safe&range=7d  (Algo Trading Service)
export async function getAlgoChartData(bullMode = false): Promise<AlgoChartPoint[]> {
	await simulateLatency();

	const points: AlgoChartPoint[] = [];
	const steps = 40;
	let value = bullMode ? 10200 : 10000;

	for (let i = 0; i < steps; i++) {
		const delta = bullMode
			? rand(-20, 80) // trending up in bull mode
			: rand(-60, 70); // balanced
		value = Math.max(9500, value + delta);

		const d = new Date();
		d.setHours(d.getHours() - (steps - i));

		points.push({
			x: (i / (steps - 1)) * 100,
			y: Math.min(100, Math.max(0, ((value - 9500) / 1500) * 100)),
			timestamp: d.toISOString()
		});
	}
	return points;
}

// ── Agent Feed ────────────────────────────────────────────────────────────────
// REAL API → GET /api/agents/feed?limit=20  (AI Agent JD Hub Service)
export async function getAgentFeed(bullMode = false): Promise<AgentTask[]> {
	await simulateLatency();

	const roles = [
		'Web Dev',
		'Data Analyst',
		'UI Designer',
		'Backend Eng',
		'ML Engineer',
		'SEO Specialist',
		'Copywriter',
		'Video Editor',
		'QA Tester',
		'DevOps Eng',
		'Content Strategist',
		'Growth Hacker',
		'Blockchain Dev',
		'Game Designer'
	];

	const tasks = [
		'Landing page redesign',
		'Q2 metrics dashboard',
		'Token audit report',
		'API rate limiter',
		'User onboarding flow',
		'Campaign A/B test',
		'NFT metadata sync',
		'Sentiment analysis model',
		'Latency profiling',
		'Community newsletter',
		'Smart contract review',
		'TikTok ad creative'
	];

	return Array.from({ length: 18 }, (_, i) => {
		const statusPool: AgentTask['status'][] = bullMode
			? ['Done', 'Done', 'Done', 'In Progress']
			: ['Done', 'Done', 'In Progress', 'In Progress', 'Queued', 'Failed'];

		return {
			id: i + 1,
			agentId: `Agent #${String(i + 1).padStart(2, '0')}`,
			role: roles[i % roles.length],
			task: tasks[i % tasks.length],
			status: statusPool[Math.floor(Math.random() * statusPool.length)],
			duration: `${rand(2, 48, 0)}h ${rand(0, 59, 0)}m`
		};
	});
}

// ── CRM Stats ─────────────────────────────────────────────────────────────────
// REAL API → GET /api/business/crm/summary  (Business Platform Service)
export async function getCRMStats(bullMode = false): Promise<CRMStats> {
	await simulateLatency();

	return {
		mrr: bullMode ? rand(980_000, 1_200_000, 0) : rand(420_000, 580_000, 0),
		mrrGrowth: bullMode ? rand(18, 32) : rand(7, 15),
		leads: bullMode ? rand(4800, 6200, 0) : rand(1800, 2400, 0),
		leadsGrowth: bullMode ? rand(22, 40) : rand(5, 18),
		conversion: bullMode ? rand(12, 18) : rand(6, 10),
		activeUsers: bullMode ? rand(94_000, 110_000, 0) : rand(38_000, 52_000, 0),
		nps: bullMode ? rand(72, 89, 0) : rand(54, 68, 0)
	};
}

// ── Pillars Config ─────────────────────────────────────────────────────────────
// REAL API → GET /api/pillars?persona=<type>  (Portal Config Service)
export async function getPillarData(
	persona: PersonaType = null,
	bullMode = false
): Promise<Pillar[]> {
	await simulateLatency();

	const basePillars: Pillar[] = [
		{
			id: 'algo-trading',
			name: 'Algo Trading',
			tagline: 'Systematic Alpha, Zero Emotion',
			description:
				'Our proprietary algorithms execute safe, risk-adjusted strategies across multiple asset classes. Backtested across 10 years of data with consistent Sharpe ratios above 1.8.',
			color: '#0070f3',
			glowColor: 'rgba(0, 112, 243, 0.3)',
			icon: 'TrendingUp',
			priority: 3,
			metrics: [
				{ label: 'Win Rate', value: bullMode ? '78.4%' : '72.1%', trend: 1 },
				{ label: 'Sharpe Ratio', value: bullMode ? '2.1' : '1.84', trend: 1 },
				{ label: 'Daily PnL', value: bullMode ? '+$4,820' : '+$1,240', trend: 1 }
			]
		},
		{
			id: 'lyzda-crypto',
			name: 'Lyzda Crypto',
			tagline: 'The Currency of the Joymify Universe',
			description:
				'Lyzda (LYD) is the native utility and governance token. A centralized treasury model ensures price stability while enabling cross-pillar value transfer and staking rewards.',
			color: '#ffd700',
			glowColor: 'rgba(255, 215, 0, 0.3)',
			icon: 'Coins',
			priority: 1,
			metrics: [
				{ label: 'Treasury Reserve', value: bullMode ? '$18.2M' : '$12.4M', trend: 1 },
				{ label: 'Circulating Supply', value: '42M LYD', trend: 0 },
				{ label: 'Staking APY', value: bullMode ? '14.2%' : '8.6%', trend: 1 }
			]
		},
		{
			id: 'ai-agent-hub',
			name: 'AI Agent JD Hub',
			tagline: 'On-Demand Intelligence, At Scale',
			description:
				'A marketplace connecting businesses with specialized AI agents for every digital task — from content creation to complex data analysis. Powered by LZD micro-payments.',
			color: '#8b5cf6',
			glowColor: 'rgba(139, 92, 246, 0.3)',
			icon: 'Bot',
			priority: 2,
			metrics: [
				{ label: 'Active Agents', value: bullMode ? '2,847' : '1,209', trend: 1 },
				{ label: 'Tasks/Day', value: bullMode ? '38.4K' : '12.7K', trend: 1 },
				{ label: 'Avg Rating', value: bullMode ? '4.93' : '4.76', trend: 1 }
			]
		},
		{
			id: 'business-platform',
			name: 'Business Platform',
			tagline: 'Mini-SaaS for Modern Teams',
			description:
				'An all-in-one business suite featuring CRM, marketing automation, and analytics — purpose-built for the creator economy and LYD-gated premium features.',
			color: '#10b981',
			glowColor: 'rgba(16, 185, 129, 0.3)',
			icon: 'BarChart3',
			priority: 4,
			metrics: [
				{ label: 'MRR', value: bullMode ? '$980K' : '$421K', trend: 1 },
				{ label: 'Active Orgs', value: bullMode ? '1,840' : '624', trend: 1 },
				{ label: 'NPS Score', value: bullMode ? '81' : '62', trend: 1 }
			]
		},
		{
			id: 'app-daily-bundle',
			name: 'App Daily Bundle',
			tagline: 'Your Digital Life, Unified',
			description:
				'A curated bundle of productivity, entertainment, and utility apps — bridged by seamless Air Mirroring technology that extends mobile to any screen in your environment.',
			color: '#f59e0b',
			glowColor: 'rgba(245, 158, 11, 0.3)',
			icon: 'Smartphone',
			priority: 5,
			metrics: [
				{ label: 'Bundle Apps', value: '24 Apps', trend: 0 },
				{ label: 'Daily Active Users', value: bullMode ? '94K' : '38K', trend: 1 },
				{ label: 'Session Length', value: bullMode ? '48m' : '32m', trend: 1 }
			]
		},
		{
			id: 'game-platform',
			name: 'Game Platform',
			tagline: 'Epic Worlds. Real Rewards.',
			description:
				'A multi-title MMORPG ecosystem where in-game economies are backed by Lyzda tokens. Players earn real value through gameplay, guilds, and rare asset trading.',
			color: '#ef4444',
			glowColor: 'rgba(239, 68, 68, 0.3)',
			icon: 'Swords',
			priority: 6,
			metrics: [
				{ label: 'Concurrent Players', value: bullMode ? '128K' : '47K', trend: 1 },
				{ label: 'LZD Earned/Day', value: bullMode ? '840K' : '210K', trend: 1 },
				{ label: 'Active Guilds', value: bullMode ? '3,200' : '890', trend: 1 }
			]
		}
	];

	// Re-order based on persona
	const priorityMap: Record<string, PillarId[]> = {
		investor: [
			'lyzda-crypto',
			'algo-trading',
			'business-platform',
			'ai-agent-hub',
			'app-daily-bundle',
			'game-platform'
		],
		builder: [
			'ai-agent-hub',
			'business-platform',
			'algo-trading',
			'lyzda-crypto',
			'app-daily-bundle',
			'game-platform'
		],
		gamer: [
			'game-platform',
			'lyzda-crypto',
			'app-daily-bundle',
			'ai-agent-hub',
			'algo-trading',
			'business-platform'
		],
		trader: [
			'algo-trading',
			'lyzda-crypto',
			'ai-agent-hub',
			'business-platform',
			'game-platform',
			'app-daily-bundle'
		]
	};

	if (persona && priorityMap[persona]) {
		const order = priorityMap[persona];
		return basePillars.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
	}

	return basePillars.sort((a, b) => a.priority - b.priority);
}
