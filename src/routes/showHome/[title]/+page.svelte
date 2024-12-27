<script>
	import { concat, mergeGenres, decideState, cropName } from '$utils/utils'
	import { authStore, authFunc } from '$lib/Auth/Auth'
	import { browser } from '$app/environment'
	import { CaretCircleDown, CaretDown, ListNumbers, Spinner } from 'phosphor-svelte'
	import { slide } from 'svelte/transition'
	import { Clock, SignIn, Eye, EyeSlash, FilmStrip, Monitor } from 'phosphor-svelte'
	import TrailerDisplay from '../../../lib/components/TrailerDisplay.svelte'
	import ReviewDisplay from '../../../lib/components/ReviewDisplay.svelte'

	export let data
	let tracking = false
	const { Details } = data
	const { ShowSeasons } = data
	const { ShowId } = data
	const { Reccomendations } = data
	const { Trailers } = data
	const { Reviews } = data
	let localSeasons = structuredClone(Details.seasons)
	let watchingEpisode = '1'
	let watchingSeason = '1'

	localSeasons.forEach((season) => {
		season['collapsed'] = true
	})

	let reload = false
	async function checkIftracking() {
		tracking = await authFunc.showExists(ShowId, $authStore)
	}
	let loading
	async function addToTracking() {
		loading.innerHTML = 'loading...'
		await authFunc.AddShowToTracking(ShowId, $authStore)
		checkIftracking()
	}
	let trackin
	async function deleteTracking() {
		trackin.innerHTML = 'loading...'
		await authFunc.deleteCollection(ShowId, $authStore)
		checkIftracking()
	}
	async function addEpisode(epid) {
		await authFunc.AddEpisode(ShowId, $authStore, epid)
		checkEpisode(epid)
	}
	async function checkEpisode(epid) {
		let x = await authFunc.checkEpisode(ShowId, $authStore, epid)
		return x
	}
	async function deleteWatchedEpisode(epid) {
		await authFunc.unwatchEpisode(ShowId, $authStore, epid)
	}
	$: markseason = '+'
	let reset = false
	async function markSeasonAsWatched(sid) {
		for (let i = 0; i < ShowSeasons[sid].episodes.length; i++) {
			await addEpisode(ShowSeasons[sid].episodes[i].id)
		}
		reset = !reset
	}
	checkIftracking()
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
			class=" hidden h-full w-full object-cover !opacity-60 md:flex" />
		<img
			src={concat(Details.poster_path)}
			width="100%"
			height="100%"
			class=" h-full w-full object-cover !opacity-60 md:hidden" />
	</span>
</div>

<div
	class="mx-auto flex min-h-screen w-full flex-row items-center justify-center bg-cover bg-center bg-no-repeat p-12">
	<iframe
		src="https://vidlink.pro/tv/{ShowId}/{watchingSeason}/{watchingEpisode}?primaryColor=1d29cd&secondaryColor=aba6a6&iconColor=f5f5f5&icons=default&player=default&title=true&poster=true&autoplay=false&nextbutton=true"
		class="aspect-video w-full"
		title="season {watchingSeason} episode  {watchingEpisode}"
		allowfullscreen></iframe>
</div>

<div class="card-body top-40 mx-[5%] items-center rounded-2xl shadow-2xl backdrop-blur-sm">
	<div class="hero-content flex-col gap-24 lg:flex-row">
		<img src={concat(Details.poster_path)} class="w-48 rounded-lg shadow-2xl" />
		<div>
			<h1 class="text-5xl font-bold">{Details.name}</h1>

			<div class="my-6 flex w-52 flex-row gap-2">
				<p>{decideState(Details.status)}</p>
				<span class="flex w-32 flex-row gap-2 rounded-md bg-transparent"
					><Monitor color="yellow" weight="duotone" size={24} />
					<p>{Details.number_of_seasons + ' Seasons'}</p></span>
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
			{#if browser}
				{#if $authStore}
					{#if tracking}
						<button
							bind:this={trackin}
							class="btn btn-error btn-outline btn-md w-60 place-self-center"
							style="position:absolute, top: 0; left: 0; "
							on:click={deleteTracking}>Stop Tracking</button>
					{:else}
						<button
							bind:this={loading}
							class="btn btn-success btn-outline btn-md w-60 place-self-center"
							style="position:absolute, top: 0; left: 0; "
							on:click={addToTracking}>Start tracking</button>
					{/if}
				{:else}
					<button class="btn btn-info btn-outline btn-md w-fit place-self-center"
						>Login to track</button>
				{/if}
			{:else}
				<button class="btn btn-ghost btn-outline btn-md w-fit place-self-center">
					<Spinner />
					Loading
				</button>
			{/if}
		</div>
	</div>
	<div class="flex w-[90%] flex-col items-center justify-center gap-4 p-12">
		{#each localSeasons as season}
			{#if season.season_number > 0}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="w-full rounded-md p-1 transition-all">
					{#if season.collapsed}
						<div
							on:click={() => {
								season.collapsed = !season.collapsed
							}}
							in:slide
							class="font-lg flex flex-row items-center justify-between gap-4 rounded-2xl bg-base-300 p-4 text-xl">
							<div class="flex flex-row justify-center gap-4">
								<span>
									<CaretCircleDown size="24" />
								</span>
								<h3>
									{season.name}
								</h3>
							</div>

							{#if $authStore && tracking}
								<button
									class="btn btn-warning btn-outline btn-sm"
									on:click={async () => {
										markseason = 'Loading...'
										await markSeasonAsWatched(season.season_number - 1)
										markseason = '+'
									}}>
									{markseason}
								</button>
							{/if}
						</div>
					{:else}
						<div
							transition:slide
							on:click={() => {
								season.collapsed = !season.collapsed
							}}>
							<div
								class="font-lg flex flex-row items-center justify-between gap-4 rounded-2xl bg-base-300 p-4 text-xl">
								<span>
									<CaretDown size="24" />
								</span>
								<h3>
									{season.name}
								</h3>
							</div>
							<div>
								{#if markseason == 'Loading...'}
									<span class="loading loading-ball loading-lg"></span>
								{/if}
								<div>
									<div class="myShowGrid">
										{#each ShowSeasons[season.season_number - 1].episodes as e}
											<div>
												{#key reset}
													<h2 class="card-title">
														{e.episode_number + '.' + cropName(e.name, 13)}
													</h2>
													<div class="join">
														<button
															class="btn btn-warning btn-outline join-item rounded-md hover:scale-105"
															on:click={() => {
																watchingSeason = season.season_number
																watchingEpisode = e.episode_number
																document.body.scrollTop = 0 // For Safari
																document.documentElement.scrollTop = 0
															}}>
															Watch
														</button>

														{#if $authStore && tracking}
															{#await checkEpisode(e.id)}
																&nbsp;
															{:then value}
																{#if !reload}
																	{#if !value}
																		<button
																			class="btn btn-success btn-outline join-item rounded-full hover:scale-105"
																			on:click={async () => {
																				await addEpisode(e.id)
																				value = !value
																			}}>+</button>
																	{:else}
																		<button
																			class="btn btn-success join-item rounded-full hover:scale-105"
																			on:click={() => {
																				deleteWatchedEpisode(e.id)
																				value = !value
																			}}>✓</button>
																	{/if}
																{/if}
															{/await}
														{/if}
													</div>
												{/key}
											</div>
										{/each}
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		{/each}
		{#each Details.seasons as s (s.season_number)}
			{#if s.season_number > 0}
				<div class=" relative bg-base-200">
					<div class="flex flex-row justify-start"></div>
				</div>
			{/if}
		{/each}
	</div>
</div>
<TrailerDisplay {Trailers} />
<ReviewDisplay reviews={Reviews.results} />

<style>
	.myShowGrid {
		display: grid;
		grid-template-columns: auto auto auto auto auto;
	}
	@media (min-width: 300px) {
		.myShowGrid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 600px) {
		.myShowGrid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 800px) {
		.myShowGrid {
			grid-template-columns: repeat(5, 1fr);
		}
	}
</style>
