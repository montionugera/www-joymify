import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPillarData } from '$lib/data/mock-engine';
import type { PersonaType } from '$lib/types';

/**
 * Pillars Reorder API
 * REAL API → POST /api/pillars/reorder  (Portal Config Service)
 *
 * Accepts a persona and returns pillars re-ordered by relevance.
 * Called by the Navigator Quiz on persona selection.
 */
export const POST: RequestHandler = async ({ request, url }) => {
	const body = await request.json();
	const persona = (body.persona as PersonaType) ?? null;
	const isBullMode = url.searchParams.get('mode') === 'bull';

	const pillars = await getPillarData(persona, isBullMode);

	return json({ pillars, persona });
};
