import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getLyzdaPulse } from '$lib/data/mock-engine';

/**
 * Lyzda Pulse API
 * REAL API → GET /api/lyzda/price (Lyzda Treasury Service)
 *
 * Used by client-side timer for real-time hydration of the Lyzda price ticker.
 */
export const GET: RequestHandler = async ({ url }) => {
	const isBullMode = url.searchParams.get('mode') === 'bull';
	const pulse = await getLyzdaPulse(isBullMode);

	return json(pulse, {
		headers: {
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			'X-Powered-By': 'Joymify BFF'
		}
	});
};
