const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVlMTI1NWJjNTNjZmMzYmIwNjJmZGM3NTZmOWY3OCIsInN1YiI6IjY1MTUyYmU3Y2FkYjZiMDJiZGVjMjJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1-_rd7J5SMm7XFS9a032OiqzSo-qEoAHeJLheO8mCVw'
    }
  };
  export const load = async ({fetch,params}) => {

    let req = 'https://api.themoviedb.org/3/tv/' + params.title+ '/season/'+ +params.season+'/episode/' + params.episode+ '?language=en-US'
    const fetchDetails = async() => {   
    const myres = await fetch(req, options)
    return await myres.json()
    }
    let Showid = params.title



    return {
        Details:fetchDetails(),
        Showid:Showid
    }
    
    
    

}