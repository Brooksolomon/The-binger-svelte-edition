<script lang="ts">
	import Card from './Card.svelte'

	export let data
	console.log(data)
</script>

<div class="flex flex-row flex-wrap justify-center gap-4 bg-base-100 px-12 py-6 transition-all">
	{#each data.results as d}
		<Card {d} />
	{/each}
</div>
