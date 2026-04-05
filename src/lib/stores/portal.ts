import { writable } from 'svelte/store';
import type { Pillar, PersonaType, PillarId } from '$lib/types';

/** Whether ?mode=bull is active — triggers all-green metrics */
export const bullMode = writable<boolean>(false);

/** Currently selected/active pillar card */
export const activePillar = writable<Pillar | null>(null);

/** Persona selected from the Navigator quiz */
export const personaStore = writable<PersonaType>(null);

/** Whether the Navigator quiz modal is open */
export const navigatorOpen = writable<boolean>(false);

/** Spotlight: which pillar is hovered (for subtle grid effects) */
export const hoveredPillar = writable<PillarId | null>(null);
