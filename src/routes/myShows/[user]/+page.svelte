<script>
    import GridDisplayForShows from '../../grids/gridDisplayForShows.svelte';
    export let data
    const {answer} = data
</script>
<GridDisplayForShows propValue = {answer}/>