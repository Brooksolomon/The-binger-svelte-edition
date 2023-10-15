<script>

import GridDisplay from '../../grids/gridDisplayForShows.svelte';
import { concatctinate,mergeGenres,decideState, cropName  } from '../../helpers/helpers';
import {authStore,authFunc} from '../../Authentication/Auth'
    import GridDisplayForShows from '../../grids/gridDisplayForShows.svelte';

    export let data 
    let tracking =false;
    const  {Details} = data
    const {ShowSeasons} = data
    const {ShowId} = data
    const {Reccomendations} = data
    console.log(ShowSeasons)

    let reload=false;
    async function checkIftracking()
    {
        tracking = await authFunc.showExists(ShowId,$authStore);
    }
    async function addToTracking()
    {
        await authFunc.AddShowToTracking(ShowId,$authStore);
        checkIftracking();
    }
    let trackin;
    async function deleteTracking()
    {
        trackin.innerHTML = 'loading...'
        await authFunc.deleteCollection(ShowId,$authStore);
        checkIftracking();
    }
    async function addEpisode(epid)
    {
        await authFunc.AddEpisode(ShowId,$authStore,epid);
        checkEpisode(epid);

    }
    async function checkEpisode(epid)
    {
         let x = await authFunc.checkEpisode(ShowId,$authStore,epid);
            return x
    }
    async function deleteWatchedEpisode(epid)
    {
        await authFunc.unwatchEpisode(ShowId,$authStore,epid);
    }
    $: markseason='Mark season as watched';
    let reset=false;
    async function markSeasonAsWatched(sid)
    { 
        for(let i=0; i < ShowSeasons[sid].episodes.length ; i++)
        {
        await addEpisode(ShowSeasons[sid].episodes[i].id)
        }
        reset =!reset;
    }
    checkIftracking();
    
</script>

<div style="
background-image: url({concatctinate(Details.backdrop_path)}); 
padding-top:20px;height: 700px;
width: 100%;   background-position: center;
background-repeat: no-repeat;
background-size: cover;"
>
    <div class="card   bg-base-100 shadow-xl    mt-5  mycard" style="opacity: 0.92; position:relative;">
        <div class="card-body">
            <h1 class="card-title text-3xl ">{Details.name}</h1>
            {#if $authStore}
            {#if tracking}
            <button bind:this={trackin} class="btn btn-outline btn-error w-60 hover:scale-105" style="position:absolute, top: 0; left: 0; " on:click={deleteTracking} >Stop Tracking</button>
            {:else}
            <button class="btn btn-outline btn-success w-60 hover:scale-105 " style="position:absolute, top: 0; left: 0; " on:click={addToTracking}>Start tracking</button>
            {/if}
            {:else}
            <a href="/Authentication">
            <button class="btn btn-outline btn-failed w-60 hover:scale-105 " style="position:absolute, top: 0; left: 0; " >Login to track</button>
            </a>
            {/if}
            {mergeGenres(decideState(Details.status),Details.genres,Details.number_of_seasons + " Seasons").slice(0,-1)} 
            <p >{Details.overview}</p>
            {#each Details.seasons as s }
            
            {#if s.season_number > 0}
            <div class="collapse collapse-arrow  bg-base-200 ">
                <input type="checkbox" />   
                <div class="collapse-title text-xl font-medium">
                  {s.name}
                  
                </div>
                
                <div class="collapse-content ">
                    {#if markseason=='Loading...'}
                    <span class="loading loading-ball loading-lg"></span>
                    {/if}
                    {#if $authStore && tracking}
                    <button class="btn btn-outline rounded-full btn-warning hover:scale-105   " on:click={
                    async ()=>{
                        markseason = 'Loading...';
                        await markSeasonAsWatched(s.season_number-1)
                        markseason = 'mark season as watched';}} >{markseason}</button>
                    {/if}
                    {#if markseason=='Loading...'}
                    <span class="loading loading-ball loading-lg"></span>
                    {/if}
                    <div class="gridbox">
                    {#each ShowSeasons[s.season_number-1].episodes as e }
                    
                    <div class="card glass myeps mx-0" >
                        <div class="card-body">
                            {#key reset}
                          <h2 class="card-title">{e.episode_number +"."+cropName(e.name,13)}
                            </h2>
                            <div class="join">
                                <a href="/showHome/{ShowId}/{s.season_number}/{e.episode_number}">
                                    <button class="btn btn-outline rounded-full btn-warning hover:scale-105 join-item">watch</button>
                                </a>
                            {#if $authStore && tracking}        
                            {#await checkEpisode(e.id)}
                            &nbsp;
                            {:then value}
                            {#if !reload}
                            {#if !value}
                            
                            <button class="btn btn-outline rounded-full btn-success hover:scale-105 join-item" on:click={async() => { 
                            await addEpisode(e.id)
                            value=!value
                            }}>+</button>
                            
                            {:else}
                            <button class="btn  rounded-full btn-success hover:scale-105 join-item" on:click={() => {deleteWatchedEpisode(e.id);value=!value}}>✓</button>
                            {/if}
                            {/if}
                            {/await}
                            {/if}
                            
                            
                        </div>
                        {/key}
                          
            
                          
                        </div>
                      </div>
                    {/each}
                </div>
                    

                </div>
            </div>
            {/if}
            {/each}
            
        </div>
       
    </div>
</div>
<!-- <GridDisplayForShows propValue = {Reccomendations}/> -->
<style>
        
        @media (min-width: 475px) {
        /* .gridbox{
        display:grid; 
        max-width: 1200px;
        grid-template-columns: auto auto auto;
        } */
        .myeps{
            width: 18rem;
            margin-bottom: 10px;
            margin-left: 30px;
        }
        .mycard{
            margin-left: 20px;
            width: 450px;
            margin-top: 100px;
        }

        } 
    @media (min-width: 800px) {
        .gridbox{
        display:grid; 
        max-width: 1200px;
        grid-template-columns: auto auto auto auto auto;
        }
        .myeps{
            margin-left: 40px;
            margin-top: 10px;
            width:16rem;
        }
        .mycard{
            margin-left: 170px;
            width: 1600px;
        } 
        } 
</style>