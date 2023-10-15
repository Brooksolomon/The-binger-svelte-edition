<script>

    import GridDisplay from '../../grids/gridDisplay.svelte';
    export let data
    const {answer} = data
</script>
<GridDisplay propValue = {answer}/>