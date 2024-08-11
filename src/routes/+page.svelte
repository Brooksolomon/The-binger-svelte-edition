<script>
	import GridDisplay from '../lib/components/DisplayGrid.svelte'
	import SearchBar from '../lib/components/SearchBar.svelte'
	import MovieHomePageCaresoul from '../lib/components/MovieHomePageCaresoul.svelte';
	export let data
	console.log(data.Movies)
	let searchTerm = ''
</script>
<div class="flex flex-col">
<div >
<SearchBar bind:searchTerm baseRoute='/searchResult/'/>
<MovieHomePageCaresoul Movies={data.Latest} type="Movie"/>
</div>
<GridDisplay data={data.Latest} type="Movie" src="Home"/>

</div>