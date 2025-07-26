<script lang="ts">
    import {Moon, Sun} from 'lucide-svelte';
    import { onMount } from 'svelte';

	// Use a reactive `$state` variable to hold the theme.
	// We default to 'light' to prevent errors during SSR.
	let theme = $state('light');

    // This is crucial: onMount runs only in the browser after the component loads.
	onMount(() => {
		// Get the saved theme or respect the user's OS preference.
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		theme = savedTheme || (prefersDark ? 'dark' : 'light');
	});

    $effect(() => {
		// Don't run this on the server
		if (typeof window !== 'undefined') {
			if (theme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
			// Save the user's choice for next time.
			localStorage.setItem('theme', theme);
		}
	});
    function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
	}
</script>

<button onclick={toggleTheme} class="flex items-center dark:text-brand-teal dark:border-medium-gray p-3 border rounded hover:bg-dark-slate/10   " aria-label="Toggle theme">
	{#if theme === 'dark'}
		<Sun color="currentColor" />
	{:else}
		<Moon color="currentColor" />
	{/if}
</button>