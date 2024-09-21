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
	<div class="fixed top-0 left-0 z-[-1] blur-xl h-screen w-[100%] bg-white/5">
	<span class="  blur lazy-load-image-loaded" style="color: transparent; display: inline-block; height: 100%; width: 100%;">
	<img src="{concat(Details.backdrop_path)}" width="100%" height="100%" class=" object-cover !opacity-60 h-full w-full  hidden md:flex">
	<img src="{concat(Details.poster_path)}" width="100%" height="100%" class=" object-cover !opacity-60 h-full w-full md:hidden ">

</span>
</div>
<div
	class="flex min-h-screen w-full flex-row items-center justify-center bg-cover bg-center bg-no-repeat p-12  mx-auto "
	class="flex min-h-screen w-full flex-row items-center justify-center bg-cover bg-center bg-no-repeat p-12  mx-auto "
	>
	
	<iframe
		src="https://vidsrc.pro/embed/movie/{Details.id}"
		class=" w-[100%] md:w-[70%] aspect-video "
		class=" w-[100%] md:w-[70%] aspect-video "
		title={Details.name}
		allowfullscreen
		> 
	</iframe>

	
</div>
<div class="card-body items-center  top-40  mx-[5%]  rounded-md  shadow-2xl backdrop-blur-sm  ">
<div class="card-body items-center  top-40  mx-[5%]  rounded-md  shadow-2xl backdrop-blur-sm  ">
  <div class="hero-content flex-col lg:flex-row gap-24">
    <img
      src={concat(Details.poster_path)}
      class="w-48 rounded-lg shadow-2xl" />
    <div>
      <h1 class="text-5xl font-bold">{Details.original_title}</h1>
	  <div class="flex flex-row gap-2 my-6  w-40">
	<p>{Details.release_date}</p>
	  <span class="bg-transparent   rounded-md flex flex-row w-16	"><Clock  color="yellow" weight="duotone" size="{24}"/><p>{ Details.runtime}m</p></span>
	</div>
	  <div class="flex flex-row gap-2">
	  {#each Details.genres as gen }
		<span class="bg-transparent outline-neutral-300 outline-1 outline p-2 rounded-md "><p>{gen.name}</p></span>
	  {/each}
	  
	</div>
      <p class="py-6">
        {Details.overview}
      </p>
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
    </div>
  </div>


</div>
{#if Trailers}
<div class="flex flex-row gap-2">
	<h1 class="text-5xl font-bold ml-[8%] mt-4">Trailers  </h1><FilmStrip weight="duotone" size="{64}" class="mt-2"/>
</div>


<div class="carousel carousel-center bg-transparent rounded-box w-[80%] m-4 space-x-4 p-4 ml-[10%]">
<div class="carousel carousel-center bg-transparent rounded-box w-[80%] m-4 space-x-4 p-4 ml-[10%]">
	<div class="carousel-item"> 
{#each Trailers as Trailer}
<iframe width="460" height="255" src="https://www.youtube.com/embed/{Trailer.key}" title="YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="rounded-md m-2"></iframe>
{/each}
</div>
</div>
{/if}
<h1 class="text-5xl font-bold ml-[8%] mt-4 my-4">Similar Movies </h1>
<MovieGrid data={Reccomendations} />

