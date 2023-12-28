<script lang="ts">
	//@ts-nocheck
	import { authFunc, authStore } from '$lib/Auth/Auth'

	import { blur } from 'svelte/transition'
	import { onMount } from 'svelte'
	import { themeChange } from 'theme-change'
	import { browser } from '$app/environment'

	import { Sun, Moon, PaintBrush, ListDashes, GoogleLogo, DoorOpen, Spinner } from 'phosphor-svelte'

	if (browser) {
		authStore.set(localStorage.getItem('curr'))
	}

	const getTheme = () => {
		if (browser) {
			return localStorage.getItem('theme')
		}
	}

	onMount(() => {
		themeChange(false)
		theme = getTheme()
	})

	$: theme = getTheme()
</script>

<div class="navbar bg-base-200 px-12 text-primary">
	<div class="navbar-start" >
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="dropdown"  >
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="9999" class="btn btn-ghost lg:hidden">
				
				<ListDashes size="24" />
			</label>
			<ul
				tabindex="9999"
				class="menu dropdown-content rounded-box menu-lg z-[100] mt-3 w-52 bg-base-200 p-2 shadow">
				<li><a href="/">Movies</a></li>
				<li><a href="/shows">Shows</a></li>
				{#if $authStore !== null}
					<li><a href="/myMovies/{$authStore}">My Movies</a></li>
					<li><a href="/myShows/{$authStore}">My Shows</a></li>
				{/if}
			</ul>
		</div>
		<a href="/" class=" px-4 text-xl font-semibold">The Binger.</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">Movies</a></li>
			<li><a href="/shows">Shows</a></li>
			{#if $authStore !== null}
				<li><a href="/myMovies/{$authStore}">My Movies</a></li>
				<li><a href="/myShows/{$authStore}">My Shows</a></li>
			{/if}
		</ul>
	</div>
	<div class="navbar-end gap-4">
		{#if browser}
			{#if $authStore !== null}
				<button class="btn btn-primary btn-outline btn-sm" on:click={authFunc.signoutfunction}>
					<DoorOpen size="20" />
					Log out
				</button>
			{:else}
				<button class="btn btn-primary btn-sm" on:click={authFunc.loginFunciton}>
					<GoogleLogo size="20" />
					Login with google
				</button>
			{/if}
		{:else}
			<button class="btn btn-primary btn-sm">
				<Spinner size="20" />
				Checking ...
			</button>
		{/if}

		<button
			class="ml-4"
			data-toggle-theme="dark,light"
			on:click={() => {
				theme = getTheme()
			}}>
			{#if theme == 'dark'}
				<span in:blur={{ duration: 100 }}>
					<Moon weight="duotone" size={24} />
				</span>
			{:else if theme == 'light'}
				<span in:blur={{ duration: 100 }}>
					<Sun weight="duotone" size={24} />
				</span>
			{:else}
				<span in:blur={{ duration: 100 }}>
					<PaintBrush weight="duotone" size={24} />
				</span>
			{/if}
		</button>
	</div>
</div>
