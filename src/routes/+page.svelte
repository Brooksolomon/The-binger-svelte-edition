<script>
	import GridDisplay from '../lib/components/MovieGrid.svelte'
	import SearchBar from '../lib/components/SearchBar.svelte'
	export let data

	let searchTerm = ''
</script>

<SearchBar bind:searchTerm />

<GridDisplay data={data.Latest} />
//entry point
