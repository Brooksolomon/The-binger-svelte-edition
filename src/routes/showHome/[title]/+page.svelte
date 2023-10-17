<script>
	import { concat, mergeGenres, decideState, cropName } from '$utils/utils'
	import { authStore, authFunc } from '$lib/Auth/Auth'
	import { browser } from '$app/environment'
	import { CaretCircleDown, CaretDown, ListNumbers, Spinner } from 'phosphor-svelte'
	import { slide } from 'svelte/transition'

	export let data
	let tracking = false
	const { Details } = data
	const { ShowSeasons } = data
	const { ShowId } = data
	const { Reccomendations } = data
	console.log(Details.seasons)
	let localSeasons = structuredClone(Details.seasons)

	localSeasons.forEach((season) => {
		season['collapsed'] = true
	})

	let reload = false
	async function checkIftracking() {
		tracking = await authFunc.showExists(ShowId, $authStore)
	}
	async function addToTracking() {
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
	$: markseason = 'Mark season as watched'
	let reset = false
	async function markSeasonAsWatched(sid) {
		for (let i = 0; i < ShowSeasons[sid].episodes.length; i++) {
			await addEpisode(ShowSeasons[sid].episodes[i].id)
		}
		reset = !reset
	}
	checkIftracking()
</script>

<div class="relative pb-40">
	<img
		src={concat(Details.backdrop_path)}
		alt="Show poster"
		class="min-h-[400px] w-full bg-cover bg-center bg-no-repeat pt-32" />

	<div class="absolute top-40 z-50 mx-12 mt-5 rounded-md bg-base-100/80 shadow-xl backdrop-blur-sm">
		<div class="flex flex-col items-center justify-center gap-4 p-12">
			<div class="flex flex-col justify-center gap-4">
				<h1 class="text-center text-3xl">{Details.name}</h1>
				{#if browser}
					{#if $authStore}
						{#if tracking}
							<button
								bind:this={trackin}
								class="btn btn-error btn-outline btn-sm w-60"
								style="position:absolute, top: 0; left: 0; "
								on:click={deleteTracking}>Stop Tracking</button>
						{:else}
							<button
								class="btn btn-success btn-outline btn-sm w-60"
								style="position:absolute, top: 0; left: 0; "
								on:click={addToTracking}>Start tracking</button>
						{/if}
					{:else}
						<button class="btn btn-info btn-outline btn-sm">Please Login to track</button>
					{/if}
				{:else}
					<button class="btn btn-ghost btn-outline btn-sm w-fit">
						<Spinner />
						Loading tracking status
					</button>
				{/if}
			</div>

			{mergeGenres(
				decideState(Details.status),
				Details.genres,
				Details.number_of_seasons + ' Seasons',
			).slice(0, -1)}

			<p>{Details.overview}</p>
			{#each localSeasons as season}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="w-full rounded-md p-1 transition-all">
					{#if season.collapsed}
						<div
							in:slide
							class="font-lg flex flex-row items-center justify-between gap-4 rounded-2xl bg-base-300 p-4 text-xl">
							<div class="flex flex-row gap-4 justify-center">
								<span
									on:click={() => {
										season.collapsed = !season.collapsed
									}}>
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
										markseason = 'Mark season as watched'
									}}>
									{markseason}
								</button>
							{/if}
						</div>
					{:else}
						<div transition:slide>
                            <div class="font-lg flex flex-row items-center justify-between gap-4 rounded-2xl bg-base-300 p-4 text-xl">
								<span
									on:click={() => {
										season.collapsed = !season.collapsed
									}}>
									<CaretDown size="24" />
								</span>
								<h3>
									{season.name}
								</h3>
							</div>
							<div >
								{#if markseason == 'Loading...'}
									<span class="loading loading-ball loading-lg"></span>
								{/if}
								<div>
									{#each ShowSeasons[season.season_number - 1].episodes as e}
										<div>
											{#key reset}
												<h2 class="card-title">
													{e.episode_number + '.' + cropName(e.name, 13)}
												</h2>
												<div class="join">
													<a
														href="/showHome/{ShowId}/{season.season_number}/{e.episode_number}"
														class="btn btn-warning btn-outline join-item rounded-md hover:scale-105">
														Watch
													</a>
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
					{/if}
				</div>
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
</div>
