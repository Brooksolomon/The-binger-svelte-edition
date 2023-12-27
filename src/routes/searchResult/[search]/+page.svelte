<script>
	import GridDisplay from '$components/MovieGrid.svelte'
	import SearchBar from '../../../lib/components/SearchBar.svelte'
	let searchTerm = ''
	export let data
	const { Latest } = data
</script>

<SearchBar bind:searchTerm />
<GridDisplay data={Latest} />
