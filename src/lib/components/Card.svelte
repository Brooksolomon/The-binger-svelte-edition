<script>
	import { concat, cropName } from '$utils/utils.ts'
	import { slide } from 'svelte/transition'
	import { Prohibit, ShieldWarning } from 'phosphor-svelte'
	let hovered = false
	export let d
</script>

<a
	href="/Movies/{d.id}"
	on:mouseover={() => (hovered = true)}
	on:focus={() => (hovered = true)}
	on:mouseout={() => (hovered = false)}
	on:blur={() => (hovered = false)}
	data-sveltekit-reload>
	<div class="relative h-full max-w-xs overflow-hidden rounded-md pb-1">
		{#if !d.adult}
			<span class=" absolute right-1 top-1 z-50 flex w-fit gap-1 rounded-md bg-orange-500 p-1 px-2">
				<ShieldWarning weight="duotone" size="18" />
				<small> 18+</small>
			</span>
		{/if}
		<img
			class="h-fit w-fit rounded-md bg-contain bg-center transition-all duration-500 ease-in-out hover:scale-105"
			src={concat(d.poster_path)}
			alt={concat(d.poster_path)} />
		{#if hovered}
			<div
				class="absolute bottom-0 left-0 right-0 flex flex-col justify-between gap-2 rounded-md bg-slate-800/60 p-2 py-4 backdrop-blur-sm"
				transition:slide>
				<div class="flex flex-row justify-between">
					<h2 class="text-white">{cropName(d.title)}</h2>
				</div>
				<small class="text-neutral">{d.release_date}</small>
			</div>
		{/if}
	</div>
</a>

<!-- 
<a href="/showHome/{d.id}" data-sveltekit-reload>
	<div class="griditem card glass w-72">
		<figure>
		</figure>
		<div class="card-body">
			<h2 class="card-title">{cropName(d.name, 20)}</h2>
			<p>{d.first_air_date.slice(0, 4)}</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Watch now!</button>
			</div>
		</div>
	</div>
</a> -->
