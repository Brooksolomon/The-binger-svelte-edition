export function concatctinate(path)
{
  return 'https://image.tmdb.org/t/p/original/' + path;
}

export function mergeGenres(date,genres,runtime)
{
   let s=date +" ‧ " 
    for (let i=0;i<genres.length;i++){
        s+=genres[i].name + " ‧ ";
    }
    s+=runtime+"m";
    return s
}

export function decideState(str)
{
  if (str == "Returning Series")
    return "On going"
  else if(str =='Ended')
    return str
  return "figure it out"
}
export  function cropName(name,d)
{
  let len = name.length
  if(len > d)
  {
    let temp = name.slice(0,d) + "..."
    return temp;
  }
  return name
}