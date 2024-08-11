<script>
	import GridDisplay from '../lib/components/DisplayGrid.svelte'
	import SearchBar from '../lib/components/SearchBar.svelte'
	import MovieHomePageCaresoul from '../lib/components/MovieHomePageCaresoul.svelte'
	import SearchBarMobile from '../lib/components/SearchBarMobile.svelte'
	import SearchBubble from '../lib/components/SearchBubble.svelte'
	export let data

	let searchTerm = ''
	let baseRoute = '/searchResult/'
	let searchBarVisible = false
</script>

<div class="flex flex-col">
	<div>
		<SearchBar bind:searchTerm {baseRoute} />
		<MovieHomePageCaresoul Movies={data.Latest} type="Movie" />
	</div>
	<GridDisplay data={data.Latest} type="Movie" src="Home" />
</div>

{#if !searchBarVisible}
	<SearchBubble bind:searchBarVisible />
{/if}

{#if searchBarVisible}
	<SearchBarMobile bind:searchTerm bind:searchBarVisible {baseRoute} />
{/if}
