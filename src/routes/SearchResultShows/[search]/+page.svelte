<script>
    import GridDisplay from '../../../lib/components/DisplayGrid.svelte'
	import SearchBar from '../../../lib/components/SearchBar.svelte'
    let searchTerm = ''
    
    export let data  

</script>
<SearchBar bind:searchTerm baseRoute='/SearchResultShows/' />
<GridDisplay data = {data.Latest} type='Show'/>

