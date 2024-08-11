<script>
	import GridDisplay from '../../../lib/components/DisplayGrid.svelte'
	import SearchBar from '../../../lib/components/SearchBar.svelte'
	import SearchBarMobile from '../../../lib/components/SearchBarMobile.svelte'
	import SearchBubble from '../../../lib/components/SearchBubble.svelte'

	let searchTerm = ''

	let searchBarVisible = false
	let baseRoute = '/SearchResultShows/'
	export let data
</script>

<SearchBar bind:searchTerm {baseRoute} />
<GridDisplay data={data.Latest} type="Show" />

{#if !searchBarVisible}
	<SearchBubble bind:searchBarVisible />
{/if}

{#if searchBarVisible}
	<SearchBarMobile bind:searchTerm bind:searchBarVisible {baseRoute} />
{/if}
