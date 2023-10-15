<script>
    import GridDisplayForShows from '../grids/gridDisplayForShows.svelte';
    import GridDisplay from '../grids/gridDisplayForShows.svelte'
    
    export let data 
    const {Latest} = data
    let searchTerm = ''
</script>

<input type="text" placeholder="Search" class="input in
put-bordered input-primary manip"  bind:value={searchTerm} />
<a href="/SearchResultShows/{searchTerm}" >
<button class="btn btn-secondary">Search</button>
</a>

<GridDisplayForShows propValue = {Latest}/>
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