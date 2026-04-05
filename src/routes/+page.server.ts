import type { PageServerLoad } from './$types';
import {
	getLyzdaPulse,
	getPillarData,
	getAlgoChartData,
	getAgentFeed,
	getCRMStats
} from '$lib/data/mock-engine';
import type { PersonaType } from '$lib/types';

/**
 * BFF Load Function — Simulated Aggregation Layer
 *
 * This function mimics a real Backend-for-Frontend that would
 * fan-out requests to 6 downstream microservices in parallel.
 *
 * To migrate from mock to production:
 * 1. Replace each function call with its real API endpoint (see README.md)
 * 2. Add authentication headers (Bearer token from session)
 * 3. Add proper error handling and fallback values
 */
export const load: PageServerLoad = async ({ url }) => {
	const isBullMode = url.searchParams.get('mode') === 'bull';
	const persona = url.searchParams.get('persona') as PersonaType;

	// ── Parallel fan-out to all 6 services ────────────────────────────────────
	// REAL: Replace with Promise.all of fetch() calls to your microservices
	const [pulse, pillars, algoChart, agentFeed, crmStats] = await Promise.all([
		getLyzdaPulse(isBullMode),
		getPillarData(persona, isBullMode),
		getAlgoChartData(isBullMode),
		getAgentFeed(isBullMode),
		getCRMStats(isBullMode)
	]);

	return {
		pulse,
		pillars,
		algoChart,
		agentFeed,
		crmStats,
		isBullMode,
		persona
	};
};
