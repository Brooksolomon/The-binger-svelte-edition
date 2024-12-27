<script>
	import MovieGrid from '$components/DisplayGrid.svelte'
	import { authFunc, authStore } from '../../../lib/Auth/Auth'
	import { concat, mergeGenres, GenereNameFromId } from '$utils/utils.ts'
	import { Clock, SignIn, Eye, EyeSlash, FilmStrip } from 'phosphor-svelte'
	import TrailerDisplay from '../../../lib/components/TrailerDisplay.svelte'
	import ReviewDisplay from '../../../lib/components/ReviewDisplay.svelte'
	export let data

	const { Details } = data
	const { Reccomendations } = data
	const { Trailers } = data
	const { Reviews } = data
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
	if (browser) {
		window.addEventListener('message', (event) => {
			if (event.origin !== 'https://vidlink.pro') return

			if (event.data?.type === 'MEDIA_DATA') {
				const mediaData = event.data.data
				localStorage.setItem('vidLinkProgress', JSON.stringify(mediaData))
			}
		})
	}
</script>

<div class="fixed left-0 top-0 z-[-1] h-screen w-[100%] bg-white/5 blur-xl">
	<span
		class="  lazy-load-image-loaded blur"
		style="color: transparent; display: inline-block; height: 100%; width: 100%;">
		<img
			src={concat(Details.backdrop_path)}
			width="100%"
			height="100%"
			class=" hidden h-full w-full object-cover !opacity-60 md:flex"
			alt="movie poster" />
		<img
			src={concat(Details.poster_path)}
			width="100%"
			height="100%"
			class=" h-full w-full object-cover !opacity-60 md:hidden"
			alt="movie poster" />
	</span>
</div>
<div
	class="mx-auto flex min-h-screen w-full flex-row items-center justify-center bg-cover bg-center bg-no-repeat p-12">
	<iframe
		src="https://vidlink.pro/movie/{Details.id}?primaryColor=1d29cd&secondaryColor=aba6a6&iconColor=f5f5f5&icons=default&player=default&title=true&poster=true"
		class=" aspect-video w-[100%] rounded-2xl md:w-[70%]"
		title={Details.name}
		allowfullscreen>
	</iframe>
</div>
<div class="card-body top-40 mx-[5%] items-center rounded-2xl shadow-2xl backdrop-blur-sm">
	<div class="hero-content flex-col gap-24 lg:flex-row">
		<img src={concat(Details.poster_path)} class="w-48 rounded-lg shadow-2xl" alt="movie poster" />
		<div>
			<h1 class="text-5xl font-bold">{Details.original_title}</h1>
			<div class="my-6 flex w-40 flex-row gap-2">
				<p>{Details.release_date}</p>
				<span class="flex w-16 flex-row rounded-md bg-transparent"
					><Clock color="yellow" weight="duotone" size={24} />
					<p>{Details.runtime}m</p></span>
			</div>
			<div class="flex flex-row gap-2">
				{#each Details.genres as gen}
					<span class="rounded-md bg-transparent p-2 outline outline-1 outline-neutral-300"
						><p>{gen.name}</p></span>
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
						class="btn w-60 bg-transparent outline outline-2 outline-lime-300 hover:scale-105 hover:bg-lime-500 hover:text-black"
						style="position:absolute, top: 0; left: 0; "
						on:click={addwatched}><Eye weight="duotone" size="20" />Mark as watched</button>
				{/if}
			{:else}
				<button
					on:click={authFunc.loginFunciton}
					class="btn-failed btn btn-outline w-60 hover:scale-105"
					style="position:absolute, top: 0; left: 0; "
					><SignIn weight="duotone" size="20" />Login to track</button>
			{/if}
		</div>
	</div>
</div>
{#if Trailers}
	<TrailerDisplay {Trailers} />
{/if}

{#if Reviews.results}
	<ReviewDisplay reviews={Reviews.results} />
{/if}
<h1 class="my-4 ml-[8%] mt-4 text-5xl font-bold">Similar Movies</h1>
<MovieGrid data={Reccomendations} />
