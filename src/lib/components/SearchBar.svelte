<script lang="ts">
	import { MagnifyingGlass } from 'phosphor-svelte'
	import { getRandomHex } from '../../utils/utils'
	import { scale } from 'svelte/transition'
	import { browser } from '$app/environment'

	export let searchTerm: string
	export let baseRoute: '/searchResult/' | '/SearchResultShows/' = '/searchResult/'
	let innerWidth
	const getTheme = () => {
		if (browser) {
			return localStorage.getItem('theme')
		}
	}
</script>

<svelte:window bind:innerWidth />
<form>
<div class="px-auto hidden lg:flex w-full flex-row justify-center overflow-clip px-12 py-4 pt-8 z-40 ">
	<div
		class="join relative flex max-w-6xl grow flex-row items-center justify-center overflow-clip px-2 z-50">
		{#each Array(9) as item, i}
			{@const randX = i + Math.random() * innerWidth * 0.6 + 90}
			{@const randY = i + Math.random() * 10}
			{@const scaleMultiplier = Math.random() * 2}
			{@const color = '#' + getRandomHex(6)}

			{#if browser && getTheme() == 'dark'}
				<span
					transition:scale
					class="pl-46 absolute h-6 w-6 rounded-full bg-white"
					style="top: {randY}px; left : {randX}px; background : {color}; transform: scale({scaleMultiplier});">
				</span>
			{/if}
		{/each}
		<input
			type="text"
			placeholder="Search {baseRoute == '/SearchResultShows/' ? 'Shows' : 'Movies'} "
			class="input join-item input-primary no-animation input-lg z-50 w-full !rounded-l-2xl border-2 border-r-0 border-base-300 bg-transparent backdrop-blur-xl transition-all focus:outline-none"
			bind:value={searchTerm}
			 />

			 <button 
			 data-sveltekit-reload
			 type="submit"
			 class="btn btn-secondary join-item btn-lg rounded-2xl !border-2 !border-base-300 z-50 bg-primary"
			 class:btn-disabled={searchTerm == ''}
			 on:click={() => window.location.href = `${baseRoute}${searchTerm}`}
			 >
			 <!-- Button content goes here -->
		 

			<MagnifyingGlass weight="duotone" size="20" />
		</button>
	</div>
</div>
</form>
