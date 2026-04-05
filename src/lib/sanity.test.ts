import { describe, it, expect } from 'vitest';

describe('Environment Sanity Check', () => {
	it('should pass successfully to prove Vitest is working', () => {
		expect(1 + 1).toBe(2);
		expect(true).toBe(true);
	});
});
