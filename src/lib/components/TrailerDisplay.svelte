<script>
	import { FilmStrip } from 'phosphor-svelte'
	export let Trailers = []
</script>

<div class="flex flex-row gap-2">
	<h1 class="ml-[8%] mt-4 text-5xl font-bold">Trailers</h1>
	<FilmStrip weight="duotone" size={64} class="mt-2" />
</div>

<div class="carousel carousel-center m-4 ml-[10%] w-[80%] space-x-4 rounded-2xl bg-transparent p-4">
	<div class="carousel-item">
		{#each Trailers as Trailer}
			<iframe
				width="460"
				height="255"
				src="https://www.youtube.com/embed/{Trailer.key}"
				title="YouTube Video"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				class="m-4 rounded-2xl hover:scale-105"></iframe>
		{/each}
	</div>
</div>
