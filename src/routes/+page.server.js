const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVlMTI1NWJjNTNjZmMzYmIwNjJmZGM3NTZmOWY3OCIsInN1YiI6IjY1MTUyYmU3Y2FkYjZiMDJiZGVjMjJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1-_rd7J5SMm7XFS9a032OiqzSo-qEoAHeJLheO8mCVw'
  }
};

export const load = async ({ fetch }) => {

  const fetchLatest = async () => {
    const myres = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    return await myres.json()
  }
  const fetchMovies = async () => {
    const myres = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    return await myres.json()
  }

  return {
    Latest: fetchLatest(),
    Movies: fetchMovies()
  }

}