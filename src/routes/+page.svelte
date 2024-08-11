<script>
	import { MagnifyingGlass } from 'phosphor-svelte'
	import { slide } from 'svelte/transition'

	import GridDisplay from '../lib/components/DisplayGrid.svelte'
	import SearchBar from '../lib/components/SearchBar.svelte'
	import MovieHomePageCaresoul from '../lib/components/MovieHomePageCaresoul.svelte'
	export let data
	console.log(data.Movies)
	let searchTerm = ''

	let searchBarVisible = false

	function fadeSlide(node, options) {
		const slideTrans = slide(node, options)
		return {
			duration: options.duration,
			css: (t) => `
				${slideTrans.css(t)}
				opacity: ${t};
			`,
		}
	}
</script>

<div class="flex flex-col">
	<div>
		<SearchBar bind:searchTerm baseRoute="/searchResult/" />
		<MovieHomePageCaresoul Movies={data.Latest} type="Movie" />
	</div>
	<GridDisplay data={data.Latest} type="Movie" src="Home" />
</div>

{#if !searchBarVisible}
	<div
		on:click={() => (searchBarVisible = true)}
		class="  fixed bottom-[5%] right-0 mx-4 flex h-11 w-11 items-center justify-center rounded-full bg-black lg:invisible">
		<MagnifyingGlass color="white" size={25} />
	</div>{/if}

{#if searchBarVisible}
	<div
		class=" fixed left-0 top-0 h-full w-[full] bg-black/60"
		on:click={() => (searchBarVisible = false)}>
	</div>
	<div
		transition:fadeSlide={{ duration: 300 }}
		class=" bg-rounded-md fixed bottom-[5%] left-3 right-3 h-[4rem] w-[100%]">
		<div class="  flex h-full w-full rounded-md bg-white">
			<input
				bind:value={searchTerm}
				type="text"
				placeholder="search here"
				class="flex-[0.8] rounded-md px-3 text-black focus-visible:outline-none" />
			<button
				on:click={() => {
					if (searchTerm) {
						window.location.href = `/searchResult/${searchTerm}`
					}
				}}
				class=" flex flex-[0.2] items-center justify-center rounded-md bg-black"
				><MagnifyingGlass color="white" size={25} /></button>
		</div>
	</div>
{/if}
