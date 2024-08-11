<script>
	import SearchBar from '../../lib/components/SearchBar.svelte'
	import ShowGrid from '../../lib/components/DisplayGrid.svelte'
	import MovieHomePageCaresoul from '../../lib/components/MovieHomePageCaresoul.svelte';

	export let data
	const { Latest,Movies } = data
	let searchTerm = ''
</script>

<SearchBar bind:searchTerm baseRoute="/SearchResultShows/" />
<MovieHomePageCaresoul Movies={Latest} type="Show"/>
<ShowGrid data={Latest} type="Show" src="Home" />
