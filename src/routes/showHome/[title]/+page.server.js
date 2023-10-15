const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVlMTI1NWJjNTNjZmMzYmIwNjJmZGM3NTZmOWY3OCIsInN1YiI6IjY1MTUyYmU3Y2FkYjZiMDJiZGVjMjJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1-_rd7J5SMm7XFS9a032OiqzSo-qEoAHeJLheO8mCVw'
    }
  };

  export const load = async ({fetch,params}) => {
    let req = 'https://api.themoviedb.org/3/tv/' + params.title+ '?language=en-US'
    const fetchDetails = async() => {   
    const myres = await fetch(req, options)
    return await myres.json()
    }

    let reqForSimilar = 'https://api.themoviedb.org/3/tv/'+params.title + '/similar?language=en-US&page=1'
    const fetchReccomendations = async() =>{
    const myres = await fetch(reqForSimilar, options)
    return await myres.json()
  }
    let seasons=[]
    
    let x = await fetchDetails()
    console.log(x.seasons)
    let showid = params.title
    for(let i =1; i <= x.seasons.length;i++)
    {
      let vari = 'https://api.themoviedb.org/3/tv/'+params.title +'/season/' +i+'?language=en-US'
      const fetchc = async() =>{
      const myres = await fetch(vari, options)
      return await myres.json()
    }
    let y =await fetchc();
    seasons.push(y)
    
    console.log(seasons)
  }
  

    return {
        Details:fetchDetails(),
        Reccomendations : fetchReccomendations(),
        ShowSeasons : seasons,
        ShowId:showid
    }
    
    
    

}