<script>
    import GridDisplay from '../../grids/gridDisplay.svelte';
    let searchTerm = ''
    export let data 
    const {Latest} = data
</script>
<input type="text" placeholder="Search" class="input in
put-bordered input-primary manip"  bind:value={searchTerm} />
<a href="/searchResult/{searchTerm}" >
<button class="btn btn-secondary">Search</button>
</a>
<GridDisplay propValue = {Latest}/>

<style>
    .manip
    {
        margin-top: 20px;
        margin-left:10%; 
        width:60%;
    }
    @media (min-width: 550px) {
    .manip{
        margin-left:18%;
    }
    }
</style>