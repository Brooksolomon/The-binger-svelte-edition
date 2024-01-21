<script>
	import GridDisplay from '../lib/components/DisplayGrid.svelte'
	import SearchBar from '../lib/components/SearchBar.svelte'
	export let data

	let searchTerm = ''
</script>

<SearchBar bind:searchTerm baseRoute='/searchResult/'/>

<GridDisplay data={data.Latest} type="Movie"/>
