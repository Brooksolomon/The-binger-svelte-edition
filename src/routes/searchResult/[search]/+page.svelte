<script>
	import GridDisplay from '$components/DisplayGrid.svelte'
	import SearchBar from '../../../lib/components/SearchBar.svelte'
	let searchTerm = ''
	export let data
	const { Latest } = data
</script>

<SearchBar bind:searchTerm baseRoute='/searchResult/'/>
<GridDisplay data={Latest}  />
