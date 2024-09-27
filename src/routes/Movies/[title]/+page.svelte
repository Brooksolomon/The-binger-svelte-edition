<script>
	import MovieGrid from '$components/DisplayGrid.svelte'
	import { authFunc, authStore } from '../../../lib/Auth/Auth'
	import { concat, mergeGenres, GenereNameFromId } from '$utils/utils.ts'
	import { Clock,SignIn,Eye,EyeSlash,FilmStrip } from "phosphor-svelte"
	export let data

	const { Details } = data
	const { Reccomendations } = data
	const { Trailers } = data
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

	<div class="fixed top-0 left-0 z-[-1] blur-xl h-screen w-[100%] bg-white/5">
	<span class="  blur lazy-load-image-loaded" style="color: transparent; display: inline-block; height: 100%; width: 100%;">
	<img src="{concat(Details.backdrop_path)}" width="100%" height="100%" class=" object-cover !opacity-60 h-full w-full  hidden md:flex">
	<img src="{concat(Details.poster_path)}" width="100%" height="100%" class=" object-cover !opacity-60 h-full w-full md:hidden ">

</span>
</div>
<div
	class="flex min-h-screen w-full flex-row items-center justify-center bg-cover bg-center bg-no-repeat p-12  mx-auto "
	>

	<iframe
		src="https://vidsrc.xyz/embed/movie/{Details.id}"
		class="w-full aspect-video "
		title={Details.name}
		allowfullscreen>
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
				on:click={deleteWatched}><EyeSlash weight="duotone" size="20" /> Unwatch</button>
		{:else}
			<button
				class="btn bg-transparent outline-lime-300 outline-2 outline   w-60 hover:scale-105 hover:bg-lime-500 hover:text-black"
				style="position:absolute, top: 0; left: 0; "
				on:click={addwatched}><Eye weight="duotone" size="20" />Mark as watched</button>
		{/if}
	{:else}
			<button
				on:click={authFunc.loginFunciton}
				class="btn-failed btn btn-outline w-60 hover:scale-105"
				style="position:absolute, top: 0; left: 0; "><SignIn weight="duotone" size="20"/>Login to track</button>
	{/if}
	<p>{Details.overview}</p>
<!-- </div> -->
</div>
{/if}
<h1 class="text-5xl font-bold ml-[8%] mt-4 my-4">Similar Movies </h1>
<MovieGrid data={Reccomendations} />
