<script>
    import {mergeGenres , concat as concatctinate} from '../../../../../utils/utils'
    export let data
    const {Details} = data
    const {Showid} =data
    const {season} =data
    const {episode} =data
    import { authFunc,authStore } from '../../../../../lib/Auth/Auth';
    let reload=false;
    async function checkEpisode(epid)
    {
         let x = await authFunc.checkEpisode(Showid,$authStore,epid);
            return x
    }
    async function addEpisode(epid)
    {
        await authFunc.AddEpisode(Showid,$authStore,epid);
        checkEpisode(epid);

    }
    async function deleteWatchedEpisode(epid)
    {
        await authFunc.unwatchEpisode(Showid,$authStore,epid);
    }
    
</script>

<div style="
background-image: url({concatctinate(Details.still_path)}); 
padding-top:20px;height: 700px;
width: 100%;   background-position: center;
background-repeat: no-repeat;
background-size: cover;"
>
    <iframe src='https://vidsrc.to/embed/tv/{Showid}/{season}/{episode}'class='theFrame' title="The movie" allowfullscreen></iframe>
    <div class="card   bg-base-100 shadow-xl mycard text-center " style="opacity: 0.95; position:relative;">
        <div class="card-body">
            
            <h1 class="card-title text-3xl text-left ">Season {Details.season_number} episode {Details.episode_number} : {Details.name}</h1>
            
            <p class="text-left">{mergeGenres(Details.air_date,'',Details.runtime)}</p>
            <p class="text-center">{Details.overview}</p>
            {#if $authStore}
            {#await checkEpisode(Details.id)}
            &nbsp;
            {:then value}
            {#if !reload}
            {#if !value}
            <button class="btn btn-outline rounded-full btn-success hover:scale-105 join-item" style="align-items:center" on:click={async() => { 
            await addEpisode(Details.id)
            value=!value
            }}>+</button>
            {:else}
            <button class="btn  rounded-full btn-success hover:scale-105 join-item" on:click={() => {deleteWatchedEpisode(Details.id);value=!value}}>✓</button>
            {/if}
            {/if}
            {/await}






            {:else}
            <a href="/Authentication">
            <button class="btn btn-outline btn-failed w-60 hover:scale-105 " style="position:absolute, top: 0; left: 0; " >Login to track</button>
            </a>
            {/if}

            
            
        </div>
       
    </div>
</div>

<style>
        @media (min-width: 475px) {
        .mycard{
            margin-left: 20px;
            width: 450px;
            margin-top: 100px;
        }

        } 
    @media (min-width: 800px) {
        .mycard{
            margin-left: 170px;
            width: 1600px;
        } 
        .theFrame{width: 70%;height: 90%; margin-left: 300px;}
        } 
</style>

