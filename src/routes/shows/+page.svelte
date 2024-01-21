<script>
	import SearchBar from '../../lib/components/SearchBar.svelte'
	import ShowGrid from '../../lib/components/DisplayGrid.svelte'

	export let data
	const { Latest } = data
	let searchTerm = ''
</script>

<SearchBar bind:searchTerm baseRoute="/SearchResultShows/" />
<ShowGrid data={Latest} type="Show" />
