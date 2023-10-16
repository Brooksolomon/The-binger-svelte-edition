<script>
	import MovieGrid from '$components/MovieGrid.svelte'
	import { authFunc, authStore } from '../../Authentication/Auth'
	import { concat, mergeGenres, cropName } from '$utils/utils.ts'
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

<div class="Thebody"  style=" background-image: url({concat(Details.backdrop_path)}); ">
	<iframe
		src="https://vidsrc.to/embed/movie/{Details.id}"
		class="theFrame"
		title="The movie"
		allowfullscreen>
  </iframe>
	<div
		class="TheCard card card-side mt-5 w-3/4 bg-base-300 text-center shadow-xl"
		style="opacity: 2; position:relative;">
		<!-- <figure style="height: 500px; width:600px " class="hidden"><img  class="hidden"  src="{concatctinate(Details.poster_path)}" alt="Movie" /></figure> -->
		<div class="card-body">
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
		</div>
	</div>
</div>
<div class="my-32">&nbsp;</div>
<MovieGrid data={Reccomendations} />

<style>
	.Thebody {
		padding-top: 20px;
		height: 700px;
		width: 100%;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	@media (min-width: 475px) {
		.TheCard {
			margin-left: 65px;
		}
		.theFrame {
			width: 100%;
			height: 50%;
			margin-top: 40px;
		}
	}
	@media (min-width: 555px) {
		.TheCard {
			grid-template-columns: repeat(1, 1fr);
			margin-left: 145px;
		}
	}
	@media (min-width: 600px) {
		.TheCard {
			grid-template-columns: repeat(2, 1fr);
			margin-left: 10px;
		}

		/* git push https://github.com/brooksolo2/The-binger --force */
	}
	@media (min-width: 900px) {
		.TheCard {
			grid-template-columns: repeat(3, 1fr);
			margin-left: 50px;
			margin-bottom: 1000px;
		}
		.theFrame {
			width: 70%;
			height: 90%;
			margin-left: 300px;
		}
	}
	@media (min-width: 1200px) {
		.TheCard {
			grid-template-columns: repeat(4, 1fr);
			margin-left: 50px;
		}
	}
	@media (min-width: 1500px) {
		.TheCard {
			margin-left: 280px;
		}
	}
</style>
