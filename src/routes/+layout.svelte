<script>
    let check = false
    import Mynavbar from "./navBars/mynavbar.svelte"
	import "../app.css";
    import Mynavbarloggedout from "./navBars/Mynavbarloggedout.svelte";
    import {authStore} from '../routes/Authentication/Auth' 

    if (typeof window !== 'undefined') {
  // Perform localStorage action
   authStore.set(localStorage.getItem('curr'))
}
</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

{#if $authStore}
<Mynavbar/>
{:else}
<Mynavbarloggedout/>
{/if}

<slot></slot>

<style>



</style>