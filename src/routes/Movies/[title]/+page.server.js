import { redirect } from '@sveltejs/kit';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVlMTI1NWJjNTNjZmMzYmIwNjJmZGM3NTZmOWY3OCIsInN1YiI6IjY1MTUyYmU3Y2FkYjZiMDJiZGVjMjJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1-_rd7J5SMm7XFS9a032OiqzSo-qEoAHeJLheO8mCVw'
    }
  };
  export const load = async ({fetch,params}) => {
    let req = 'https://api.themoviedb.org/3/movie/' + params.title+ '?language=en-US'

    const fetchDetails = async() => {   
    const myres = await fetch(req, options)
    return await myres.json()
    }

    let reqForSimilar = 'https://api.themoviedb.org/3/movie/'+params.title + '/similar?language=en-US&page=1'
    const fetchReccomendations = async() =>{
      const myres = await fetch(reqForSimilar, options)

      return await myres.json()
      }

    let reqForTrailer ='https://api.themoviedb.org/3/movie/'+ params.title +'/videos?language=en-US'
    const fetchTrailers = async() =>{
      const myres = await fetch(reqForTrailer,options)

      const data = await myres.json();

      const filteredTrailers = data.results.filter(trailer => {
        return trailer.site === "YouTube" && trailer.type === "Trailer";
      });
    
      return filteredTrailers;
    }
    return {
        Details:fetchDetails(),
        Reccomendations : fetchReccomendations(),
        Trailers : fetchTrailers()
    }
    
    
    

}