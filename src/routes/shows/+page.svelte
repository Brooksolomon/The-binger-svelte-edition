<script>
	import SearchBar from '../../lib/components/SearchBar.svelte'
	import ShowGrid from '../../lib/components/DisplayGrid.svelte'
	import MovieHomePageCaresoul from '../../lib/components/MovieHomePageCaresoul.svelte'
	import SearchBarMobile from '../../lib/components/SearchBarMobile.svelte'
	import SearchBubble from '../../lib/components/SearchBubble.svelte'
	let baseRoute = '/SearchResultShows/'
	export let data
	const { Latest, Movies } = data
	let searchTerm = ''
	let searchBarVisible = false
</script>

<SearchBar bind:searchTerm {baseRoute} />
<MovieHomePageCaresoul Movies={Latest} type="Show" />
<ShowGrid data={Latest} type="Show" src="Home" />

{#if !searchBarVisible}
	<SearchBubble bind:searchBarVisible />
{/if}

{#if searchBarVisible}
	<SearchBarMobile bind:searchTerm bind:searchBarVisible {baseRoute} />
{/if}
