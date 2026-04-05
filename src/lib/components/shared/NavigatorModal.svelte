<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { navigatorOpen, personaStore } from '$lib/stores/portal';
	import type { PersonaType } from '$lib/types';

	interface Props {
		onPersonaSelected?: (persona: PersonaType) => void;
	}
	let { onPersonaSelected }: Props = $props();

	let step = $state(0);
	let answers = $state<string[]>([]);

	const steps = [
		{
			question: 'What best describes your primary goal?',
			options: [
				{ label: 'Grow my wealth', value: 'investor', emoji: '💰' },
				{ label: 'Build products', value: 'builder', emoji: '🔨' },
				{ label: 'Play & earn', value: 'gamer', emoji: '🎮' },
				{ label: 'Trade markets', value: 'trader', emoji: '📈' }
			]
		},
		{
			question: 'Which ecosystem excites you most?',
			options: [
				{ label: 'AI & Automation', value: 'builder', emoji: '🤖' },
				{ label: 'Crypto & DeFi', value: 'investor', emoji: '🪙' },
				{ label: 'Gaming & NFTs', value: 'gamer', emoji: '⚔️' },
				{ label: 'Algorithmic Trading', value: 'trader', emoji: '⚡' }
			]
		},
		{
			question: 'What is your investment time horizon?',
			options: [
				{ label: 'Long-term (3+ years)', value: 'investor', emoji: '🏛️' },
				{ label: 'Mid-term (6–18 months)', value: 'builder', emoji: '📅' },
				{ label: 'Short-term (weeks)', value: 'trader', emoji: '⚡' },
				{ label: "I'm just here to play!", value: 'gamer', emoji: '🎲' }
			]
		}
	];

	function selectOption(value: string) {
		answers = [...answers, value];
		if (step < steps.length - 1) {
			step++;
		} else {
			// Tally
			const counts = answers.reduce((acc: Record<string, number>, v) => {
				acc[v] = (acc[v] ?? 0) + 1;
				return acc;
			}, {});
			const persona = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as PersonaType;
			personaStore.set(persona);
			onPersonaSelected?.(persona);
			navigatorOpen.set(false);
			step = 0;
			answers = [];
		}
	}

	function close() {
		navigatorOpen.set(false);
		step = 0;
		answers = [];
	}

	const currentStep = $derived(steps[step]);
	const progress = $derived((step / steps.length) * 100);
</script>

{#if $navigatorOpen}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
	<div
		class="modal-backdrop"
		role="dialog"
		aria-modal="true"
		aria-label="Joymify Navigator"
		tabindex="-1"
		onclick={close}
		onkeydown={(e) => e.key === 'Escape' && close()}
		transition:fade={{ duration: 200 }}
	>
		<!-- Modal panel -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="modal-panel glass"
			role="document"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && close()}
			in:fly={{ y: 40, duration: 300 }}
			out:fly={{ y: 40, duration: 200 }}
		>
			<!-- Header -->
			<div class="modal-header">
				<div class="modal-brand">
					<span class="modal-icon">🧭</span>
					<div>
						<h2 class="modal-title gradient-text-electric">Joymify Navigator</h2>
						<p class="modal-sub">Personalize your portal experience</p>
					</div>
				</div>
				<button class="modal-close" onclick={close} aria-label="Close navigator">✕</button>
			</div>

			<!-- Progress bar -->
			<div class="progress-bar">
				<div class="progress-fill" style="width: {progress}%"></div>
			</div>
			<div class="step-indicator">Step {step + 1} of {steps.length}</div>

			<!-- Question -->
			<div class="question-section" in:fly={{ y: 16, duration: 220 }}>
				<p class="question-text">{currentStep.question}</p>

				<div class="options-grid">
					{#each currentStep.options as opt}
						<button
							class="option-btn"
							onclick={() => selectOption(opt.value)}
							aria-label={opt.label}
						>
							<span class="opt-emoji">{opt.emoji}</span>
							<span class="opt-label">{opt.label}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Skip -->
			<button class="skip-btn" onclick={close}>Skip — Show default view</button>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(12px);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.modal-panel {
		width: 100%;
		max-width: 480px;
		padding: 2rem;
		position: relative;
	}

	/* Header */
	.modal-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	.modal-brand {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}
	.modal-icon {
		font-size: 2rem;
	}

	.modal-title {
		font-size: 1.4rem;
		font-weight: 800;
		margin: 0 0 0.25rem;
	}

	.modal-sub {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		margin: 0;
	}

	.modal-close {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-text-secondary);
		width: 32px;
		height: 32px;
		border-radius: 50%;
		cursor: pointer;
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: all 0.2s;
	}

	.modal-close:hover {
		background: rgba(255, 255, 255, 0.12);
		color: var(--color-text-primary);
	}

	/* Progress */
	.progress-bar {
		height: 3px;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 2px;
		overflow: hidden;
		margin-bottom: 0.35rem;
	}
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-electric), #00d4ff);
		border-radius: 2px;
		transition: width 0.4s ease;
	}

	.step-indicator {
		font-size: 0.65rem;
		color: var(--color-text-muted);
		letter-spacing: 0.05em;
		margin-bottom: 1.5rem;
	}

	/* Question */
	.question-section {
		margin-bottom: 1.5rem;
	}

	.question-text {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin: 0 0 1.25rem;
		line-height: 1.4;
	}

	.options-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.option-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.25rem 0.75rem;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0.75rem;
		cursor: pointer;
		transition: all 0.22s ease;
		color: var(--color-text-primary);
	}

	.option-btn:hover {
		background: rgba(0, 112, 243, 0.12);
		border-color: rgba(0, 112, 243, 0.4);
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(0, 112, 243, 0.2);
	}

	.opt-emoji {
		font-size: 1.75rem;
	}
	.opt-label {
		font-size: 0.8rem;
		font-weight: 600;
		text-align: center;
	}

	/* Skip */
	.skip-btn {
		background: none;
		border: none;
		color: var(--color-text-muted);
		font-size: 0.7rem;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 3px;
		width: 100%;
		text-align: center;
		padding: 0.5rem;
		transition: color 0.2s;
	}
	.skip-btn:hover {
		color: var(--color-text-secondary);
	}
</style>
