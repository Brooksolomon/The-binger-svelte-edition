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

<div class="navbar bg-transparent lg:px-12 md:px-4  sm:px-2 text-primary z-50">
	<div class="navbar-start z-50" >
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="dropdown z-50 "  >
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="9999" class="btn btn-ghost lg:hidden mr-2 z-50">
				
				<ListDashes size="24" />
			</label>
			<ul				
				tabindex="9999"
				class="menu dropdown-content rounded-box menu-lg z-50 mt-3 w-52 bg-base-200 p-2 shadow">
				<li><a href="/">Movies</a></li>
				<li><a href="/shows">Shows</a></li>
				{#if $authStore !== null}
					<li><a href="/myMovies/{$authStore}">My Movies</a></li>
					<li><a href="/myShows/{$authStore}">My Shows</a></li>
				{/if}
			</ul>
		</div>
		<a href="/" class="text-xl font-semibold">The Binger.</a>
	</div>
	<div class="navbar-center hidden lg:flex z-50">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">Movies</a></li>
			<li><a href="/shows">Shows</a></li>
			{#if $authStore !== null}
				<li><a href="/myMovies/{$authStore}">My Movies</a></li>
				<li><a href="/myShows/{$authStore}">My Shows</a></li>
			{/if}
		</ul>
	</div>
	<div class="navbar-end gap-4 z-50">
		<div class="search-box">
			<i class="fa fa-search search-box__icon"></i>
			<input class="search-box__input" type="text" placeholder="Título, personas, generos">
		  </div>
		{#if browser}
			{#if $authStore !== null}
				<button class="btn btn-primary btn-outline btn-sm" on:click={authFunc.signoutFunction}>
					<DoorOpen size="20" />
					Log out
				</button>
			{:else}
				<button class="btn btn-primary btn-sm" on:click={authFunc.loginFunciton}>
					<GoogleLogo size="20" />
					login
				</button>
			{/if}
		{:else}
			<button class="btn btn-primary btn-sm">
				<Spinner size="20" />
				Checking ...
			</button>
		{/if}

		  

		<!-- <button
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
		</button> -->
	</div>
</div>

<style>


.search-box {
  position: relative;
  width: 250px;
}

.search-box .search-box__input {
  outline: none;
  background: rgba(0, 0, 0, 0.85);
  border: solid 1px rgba(255, 255, 255, 0.85);
  box-sizing: border-box;
  padding: 7px 14px 7px 40px;
  width: 0%;
  font-size: 13px;
  color: #fff;
  opacity: 0;
  transition: ease width 1s, ease opacity 1s;
  float: right;
}

.search-box .search-box__icon {
  position: absolute;
  top: 7px;
  color: white;
  z-index: 10;
  cursor: pointer;
  right: 12px;
  transition: ease transform 1s;
  transition-delay: 50ms;
}

.search-box.active .search-box__icon {
  transform: translateX(-214px);
}

.search-box.active .search-box__input {
  opacity: 1;
  width: 100%;
}

</style>