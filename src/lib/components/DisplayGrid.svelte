<script lang="ts">
	import Card from './Card.svelte'

	export let data
	export let type
</script>

<div class="flex flex-row flex-wrap justify-center gap-4 bg-base-100 px-12 py-6 transition-all">
	{#each data.results as d}
		<Card {d} type={type} />
	{/each}
</div>
