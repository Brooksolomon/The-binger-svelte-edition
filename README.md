# The binger 

### Video link : https://www.youtube.com/watch?v=57LLVKWRHWs

### Live link : https://the-binger.vercel.app/

### Technologies Used : Html, CSS, JavaScript, SvelteKit , Firebase , TMDB API, Vercel.

### Description : A movie and tv show searching and tracking platform that lets you stay upto date with your current shows and movies ,This is a simple movie tracking application.
## Code Structure :
### All of the code is found in src / routes:
    Authentication: where all the user login functions and read and write functions reside
    
    Movies:The homepage code
    
    SearchResultForShows,SearchResult : The results of the search button
    
    grids : Grid component for the movie displays
    
    myMovies, myShows : Their respective pages for the user information
    
    navBar : The navbar components for logged in and logged out user
    
    Showhome : The home page for a tv show
## Design decsions :
#### For UI components i used the DaisyUI component library and tried to give it the kind of glassy modern look thats not just too dark or too white,and i belive the colors i chose for the buttons and the text perfectly copliments the look i was going for
## Database Structural :
The movies watched by every user is all stored within the same colletion by using the userid and movieid pair to query it.

The tv show , every new show u start initializes a new collection with the showid and the user id.

then for every episode watched , it creates a new document within said collection and will remove the entire collection when u press stop tracking.
  


### Screenshots : 

![Screenshot (687)](https://github.com/Brooksolomon/The-binger-svelte-edition/assets/86517756/1aa35409-4bbe-41a5-8041-b03cf9418d8f)

![Screenshot (688)](https://github.com/Brooksolomon/The-binger-svelte-edition/assets/86517756/4b7712dc-1861-4b01-a699-a59ff09d62f3)

![Screenshot (689)](https://github.com/Brooksolomon/The-binger-svelte-edition/assets/86517756/50b3fec9-07f2-4d8a-a081-d0a98dfbd17d)
