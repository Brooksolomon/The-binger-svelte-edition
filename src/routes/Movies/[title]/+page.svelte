<script>
    import { page } from '$app/stores'
    import GridDisplay from '../../grids/gridDisplay.svelte';
    import {authFunc,authStore} from '../../Authentication/Auth'
    import  {concatctinate,mergeGenres} from '../../helpers/helpers'
    export let data 
    
    const  {Details} = data
    const {Reccomendations} = data

    let watched = false
    function cropName(name)
    {
      let len = name.length
      if(len > 20)
      {
        let temp = name.slice(0,20) + "..."
        return temp;
      }
      return name
    }
 

    function addwatched()
    {
      authFunc.addWatchedMovie(Details.id,$authStore);
      watched = true;
    }
    function deleteWatched(){
      authFunc.deleteWatchedMovie(Details.id,$authStore);
      watched = false
    }
    
    async function temp()
    {
    watched = await authFunc.checkMovieFunction(Details.id,$authStore);
    }
    temp();
</script>
<div class="Thebody" style=" background-image: url({concatctinate(Details.backdrop_path)}); ">
    <div class="card card-side  bg-base-100 shadow-xl w-3/4   mt-5  TheCard text-center" style="opacity: 0.95; position:relative;">
        <!-- <figure style="height: 500px; width:600px " class="hidden"><img  class="hidden"  src="{concatctinate(Details.poster_path)}" alt="Movie" /></figure> -->
        <div class="card-body">
            <h1 class="card-title text-3xl text-center">{Details.original_title}</h1>
            
            {mergeGenres(Details.release_date,Details.genres,Details.runtime)}
            {#if $authStore}
            {#if watched}
            <button class="btn btn-outline btn-error w-60 hover:scale-105" style="position:absolute, top: 0; left: 0; " on:click={deleteWatched}>Unwatch</button>
            {:else}
            <button class="btn btn-outline btn-success w-60 hover:scale-105 " style="position:absolute, top: 0; left: 0; " on:click={addwatched}>Mark as watched</button>
            {/if}
            {:else}
            <a href="/Authentication">
            <button class="btn btn-outline btn-failed w-60 hover:scale-105 " style="position:absolute, top: 0; left: 0; " >Login to track</button>
            </a>
            {/if}
            <p >{Details.overview}</p>
            
        </div>
       
    </div>
</div>
<GridDisplay propValue = {Reccomendations} />

<style>
  .Thebody
  {
  padding-top:20px;
  height: 700px;
  width: 100%;  
   background-position: center;
background-repeat: no-repeat;
background-size: cover;
  }
  @media (min-width: 350px) {
      
      .TheCard {  }
    }
    @media (min-width: 475px) {
      
      .TheCard {margin-left: 65px;  }
    }
    @media (min-width: 555px) {
      
      .TheCard { grid-template-columns: repeat(1, 1fr);margin-left: 145px;  }
    }
    @media (min-width: 600px) {
      
      .TheCard { grid-template-columns: repeat(2, 1fr);margin-left: 10px;  }
    }
    @media (min-width: 900px) {
      .TheCard { grid-template-columns: repeat(3, 1fr);margin-left: 50px; }
    }
    @media (min-width: 1200px) {
      .TheCard { grid-template-columns: repeat(4, 1fr);margin-left: 50px; }
    }
    @media (min-width: 1500px) {
      .TheCard { margin-left: 280px; }
    }
</style>