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