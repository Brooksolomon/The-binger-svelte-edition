<script lang="ts">
	import Card from './Card.svelte'

	export let data
	export let type
	export let src
	var filterItems = (i)=>i
	if (src == "Home")
		{ filterItems = (i) => i.slice(4, i.length);}

</script>

<div class="flex flex-row flex-wrap justify-center gap-4 bg-transparent px-12 py-6 ">

	{#each filterItems(data.results )as d}

		<Card {d} type={type} />
	{/each}
</div>
