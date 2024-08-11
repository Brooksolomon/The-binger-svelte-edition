<script>
	import GridDisplay from '$components/DisplayGrid.svelte'
	import SearchBar from '../../../lib/components/SearchBar.svelte'
	import SearchBarMobile from '../../../lib/components/SearchBarMobile.svelte'
	import SearchBubble from '../../../lib/components/SearchBubble.svelte'

	let searchTerm = ''
	let searchBarVisible = false
	export let data
	const { Latest } = data
	let baseRoute = '/searchResult/'
</script>

<SearchBar bind:searchTerm {baseRoute} />
<GridDisplay data={Latest} />

{#if !searchBarVisible}
	<SearchBubble bind:searchBarVisible />
{/if}

{#if searchBarVisible}
	<SearchBarMobile bind:searchTerm bind:searchBarVisible {baseRoute} />
{/if}
