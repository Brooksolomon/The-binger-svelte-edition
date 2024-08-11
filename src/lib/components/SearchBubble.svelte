<script>
	import { MagnifyingGlass } from 'phosphor-svelte'
	export let searchBarVisible
</script>

<div
	on:click={() => (searchBarVisible = true)}
	class="  fixed bottom-[5%] right-0 mx-4 flex h-11 w-11 items-center justify-center rounded-full bg-black lg:invisible">
	<MagnifyingGlass color="white" size={25} />
</div>
