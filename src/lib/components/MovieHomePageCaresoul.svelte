<script>
    import { concat, mergeGenresFromId } from '../../utils/utils'
    export let Movies
    export let type
    const filterItems = (i) => i.slice(0, 4);


    console.log(Movies)
    console.log("here")
    // {"#item"+(index - 1 + 4) % 4}
    // {"#item"+(index - 1 + 4) % 4}
    //style="filter: brightness(0.5);"
</script>
<div class="carousel w-full  top-0 z-[-1] background-container pointer-events-auto mt-[-10vh] lg:mt-[-20vh] ">
{#each filterItems(Movies.results) as Movie ,index}
<div id="{"item" + index}" class="carousel-item w-full items-center justify-center">
    {#if index>0}
    <a href="a" class="btn btn-circle bg-transparent border-transparent text-white text-2xl hidden lg:flex">❮❮❮</a> 
    {/if}
    
    <img
      src="{concat(Movie.poster_path)}"
      class="h-full w-full md:hidden "
      alt=""
       />
       <img
      src="{concat(Movie.backdrop_path)}"
      class="h-full w-full  hidden md:flex"
      alt=""
       />
      <div class=" flex -translate-y-1/2 transform ">
        
      </div>

      <div class="ml-[-30vw] w-[30vw]  -translate-x-[60vw]   translate-y-2 md:translate-y-2/4  z-20">
            <h1 class="text-2xl">{type=="Movie"?Movie.title:Movie.name}</h1>
            <p class=" "> {type=="Movie"?mergeGenresFromId(Movie.release_date,Movie.genre_ids,type):mergeGenresFromId(Movie.first_air_date,Movie.genre_ids,type)} </p>
            <p class="hidden lg:flex">{Movie.overview}</p>
            <a
            href={type === "Movie" ? `/Movies/${Movie.id}` : `/showHome/${Movie.id}`}><button class="btn   w-full hover:scale-105 hover:btn-outline mt-2">Watch Now</button>
        </a>
      </div>
      <a href="a" class="btn btn-circle bg-transparent border-transparent text-2xl text-white ">❯❯❯</a>
  </div>
{/each}
</div>

    

<style>
    .background-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 111.3%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)); 
    z-index: 0;
}
@media only screen and (max-width: 600px) {
    .background-container::before  {
        height: 75%;
  }
}
</style>

    
 