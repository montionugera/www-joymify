// Joymify Portal — TypeScript Type Definitions

export interface LyzdaPulse {
	price: number;
	priceChange: number;
	priceChangePct: number;
	volume: number;
	nodeStatus: 'Operational' | 'Degraded' | 'Offline';
	networkHealth: number; // 0-100
	lastUpdated: string;
}

export interface AgentTask {
	id: number;
	agentId: string;
	role: string;
	task: string;
	status: 'Done' | 'In Progress' | 'Queued' | 'Failed';
	duration: string;
}

export interface CRMStats {
	mrr: number;
	mrrGrowth: number;
	leads: number;
	leadsGrowth: number;
	conversion: number;
	activeUsers: number;
	nps: number;
}

export interface AlgoChartPoint {
	x: number;
	y: number;
	timestamp: string;
}

export type PersonaType = 'investor' | 'builder' | 'gamer' | 'trader' | null;

export interface PersonaQuizStep {
	question: string;
	options: { label: string; value: string; emoji: string }[];
}

export type PillarId =
	| 'algo-trading'
	| 'lyzda-crypto'
	| 'ai-agent-hub'
	| 'business-platform'
	| 'app-daily-bundle'
	| 'game-platform';

export interface Pillar {
	id: PillarId;
	name: string;
	tagline: string;
	description: string;
	color: string; // CSS color
	glowColor: string; // CSS rgba
	icon: string; // Lucide icon name
	metrics: { label: string; value: string; trend?: number }[];
	priority: number; // lower = higher priority
}

export interface PortalData {
	pulse: LyzdaPulse;
	pillars: Pillar[];
	algoChart: AlgoChartPoint[];
	agentFeed: AgentTask[];
	crmStats: CRMStats;
	isBullMode: boolean;
}
