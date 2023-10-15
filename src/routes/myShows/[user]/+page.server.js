import { page } from '$app/stores'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc,doc ,query,where, getDoc, getDocs,deleteDoc} from 'firebase/firestore/lite';
import { getAuth,onAuthStateChanged } from "firebase/auth";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVlMTI1NWJjNTNjZmMzYmIwNjJmZGM3NTZmOWY3OCIsInN1YiI6IjY1MTUyYmU3Y2FkYjZiMDJiZGVjMjJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1-_rd7J5SMm7XFS9a032OiqzSo-qEoAHeJLheO8mCVw'
    }
  };
  const firebaseConfig = {
    apiKey: "AIzaSyCUsEzZeimXzvxmRkVewBfN5GvLZGfZn7Y",
    authDomain: "the-binger-5f1cd.firebaseapp.com",
    projectId: "the-binger-5f1cd",
    storageBucket: "the-binger-5f1cd.appspot.com",
    messagingSenderId: "3109177518",
    appId: "1:3109177518:web:cd7ee11725b90e6a42853f"
    };


export const load = async ({fetch,params}) => {
    let user = params.user
    const app = initializeApp(firebaseConfig);

    let onesarray=[]
    let new2=[]
    async function  myMovies(){
        const db = getFirestore(app);
        const myfetch = collection(db,"myshows")
        const q = query(myfetch,where("uid","==",user));
        const querySnapshot =await getDocs(q);
        querySnapshot.forEach((doc) =>{
        let myones =doc.data().sid
        onesarray.push(myones)});

         async function xo(digit)
         {        
           const temp = async() => {   
             const myres = await fetch('https://api.themoviedb.org/3/tv/' + digit+ '?language=en-US', options)
             return await myres.json()
           }
           new2.push(await temp())
         }
         for(let i=0 ; i < onesarray.length;i++)
         {
          await xo(onesarray[i]);
         }
        
     return {results: new2}
    
    
    }
    async function a()
    {
      const moretemp  = await myMovies()
      return moretemp
    }
    
    
    return {
      answer : await a()
    }
};