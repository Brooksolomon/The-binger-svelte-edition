<script>
	import MovieGrid from '$components/DisplayGrid.svelte'
	import { authFunc, authStore } from '../../../lib/Auth/Auth'
	import { concat, mergeGenres,  } from '$utils/utils.ts'
	export let data

	const { Details } = data
	const { Reccomendations } = data
	let watched = false

	function addwatched() {
		authFunc.addWatchedMovie(Details.id, $authStore)
		watched = true
	}
	function deleteWatched() {
		authFunc.deleteWatchedMovie(Details.id, $authStore)
		watched = false
	}

	async function temp() {
		watched = await authFunc.checkMovieFunction(Details.id, $authStore)
	}
	temp()
</script>

<div
	class="flex min-h-screen w-full flex-row items-center justify-center bg-cover bg-center bg-no-repeat p-12"
	style=" background-image: url({concat(Details.backdrop_path)}); ">
	<iframe
		src="https://vidsrc.pro/embed/movie/{Details.id}"
		class="w-full aspect-video "
		title={Details.name}
		allowfullscreen
		> 
	</iframe>

		<!-- <figure style="height: 500px; width:600px " class="hidden"><img  class="hidden"  src="{concatctinate(Details.poster_path)}" alt="Movie" /></figure> -->

	
</div>
<!-- <div
class="absolute top-40 z-50 mx-12 mt-5 rounded-md bg-base-100/80 shadow-xl backdrop-blur-sm"> -->
<div class="card-body items-center  top-40  mx-12 mt-5 rounded-md bg-base-100/80 shadow-xl backdrop-blur-sm">
	<h1 class="card-title text-center text-3xl">{Details.original_title}</h1>

	{mergeGenres(Details.release_date, Details.genres, Details.runtime)}
	{#if $authStore}
		{#if watched}
			<button
				class="btn btn-error btn-outline w-60 hover:scale-105"
				style="position:absolute, top: 0; left: 0; "
				on:click={deleteWatched}>Unwatch</button>
		{:else}
			<button
				class="btn btn-success btn-outline w-60 hover:scale-105"
				style="position:absolute, top: 0; left: 0; "
				on:click={addwatched}>Mark as watched</button>
		{/if}
	{:else}
		<a href="/Authentication">
			<button
				class="btn-failed btn btn-outline w-60 hover:scale-105"
				style="position:absolute, top: 0; left: 0; ">Login to track</button>
		</a>
	{/if}
	<p>{Details.overview}</p>
<!-- </div> -->
</div>
<!-- <div class="my-32">&nbsp;</div> -->
<MovieGrid data={Reccomendations} />

	
