<script>
	import { MagnifyingGlass } from 'phosphor-svelte'
	import { slide } from 'svelte/transition'
	export let searchTerm
	export let searchBarVisible
	export let baseRoute

	function fadeSlide(node, options) {
		const slideTrans = slide(node, options)
		return {
			duration: options.duration,
			css: (t) => `
				${slideTrans.css(t)}
				opacity: ${t};
			`,
		}
	}
</script>

<div
	class=" fixed left-0 top-0 z-40 h-full w-full bg-black/60"
	on:click={() => (searchBarVisible = false)}>
</div>
<div
	transition:fadeSlide={{ duration: 300 }}
	class=" bg-rounded-md fixed bottom-[5%] left-3 right-3 z-50 h-[4rem] w-[100%]">
	<div class="  z-5 flex h-full w-full rounded-md bg-white">
		<input
			bind:value={searchTerm}
			type="text"
			placeholder="search here"
			class="flex-[0.8] rounded-md px-3 text-black focus-visible:outline-none" />
		<button
			on:click={() => {
				if (searchTerm) {
					window.location.href = `${baseRoute}${searchTerm}`
				}
			}}
			class=" flex flex-[0.2] items-center justify-center rounded-md bg-black"
			><MagnifyingGlass color="white" size={25} /></button>
	</div>
</div>
