<script>
	import MovieGrid from '$components/MovieGrid.svelte'
	import { NoteBlank } from 'phosphor-svelte'
	export let data
	const { answer } = data
	console.log(answer)
</script>

{#if answer.results.length > 0}
	<MovieGrid data={answer} />
{:else}
	<div class="flex h-screen w-screen flex-row items-center justify-center">
		<div class="flex flex-col items-center justify-center gap-4">
			<NoteBlank size="124" weight="duotone" />
			<h3 class="text-4xl font-bold">
				You dont have any <span class="text-secondary"> movies </span> saved yet
			</h3>
			<small>Save some and find them here </small>
		</div>
	</div>
{/if}
