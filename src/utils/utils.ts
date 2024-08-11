export const concat = (path: string) => 'https://image.tmdb.org/t/p/original' + path
export const cropName = (name: string) => (name.length > 20 ? name.slice(0, 20) + '...' : name)


export function mergeGenres(date: string, genres: string | any[], runtime: string) {
  let s = date + " ‧ "
  for (let i = 0; i < genres.length; i++) {
    s += genres[i].name + " ‧ ";
  }
  s += runtime + "m";
  return s
}
export function mergeGenresFromId(date:string, genres: string | any[],type:string){
  const Allgenres = { "Movie":{
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
},
"Show":{
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western"
}

}
let s = date + " ‧ "
  for (let i = 0; i < genres.length; i++) {
    s += Allgenres[type][genres[i]] + " ‧ ";
  }
  return s
}

export function decideState(str: string) {
  if (str == "Returning Series")
    return "On going"
  else if (str == 'Ended')
    return str
  return "figure it out"
}
export function getRandomHex(length) {
  const characters = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}