import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc, query, where, getDoc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, setPersistence, inMemoryPersistence } from "firebase/auth";
import { writable } from 'svelte/store';
const firebaseConfig = {
  apiKey: "AIzaSyCUsEzZeimXzvxmRkVewBfN5GvLZGfZn7Y",
  authDomain: "the-binger-5f1cd.firebaseapp.com",
  projectId: "the-binger-5f1cd",
  storageBucket: "the-binger-5f1cd.appspot.com",
  messagingSenderId: "3109177518",
  appId: "1:3109177518:web:cd7ee11725b90e6a42853f"
};
const app = initializeApp(firebaseConfig);
export const authStore = writable(null);

async function addWatched(Cmid, uid) {
  if (!uid) {
    console.log("open modal")
  } else {
    console.log("in", uid)
    try {
      const db = getFirestore(app);
      const movieref = collection(db, "relation")
      await setDoc(doc(movieref, Cmid + uid),
        {
          uid: uid,
          mid: Cmid,
        });
      console.log("Document written with ID: ", movieref.id);
    } catch (e) {
      console.error("err", e)
    }
  }
}
async function unwatchEpisode(showid, uid, eid) {
  const db = getFirestore(app);
  await deleteDoc(doc(db, showid + uid, showid + eid));
}
async function AddEpisode(showid, uid, eid) {
  try {
    const db = getFirestore(app);
    const movieref = collection(db, showid + uid)
    await setDoc(doc(movieref, showid + eid),
      {
        eid: eid,
      });
  } catch (e) {
    console.error(e)
  }
}
async function AddShowToTracking(showid, uid) {
  try {
    const db = getFirestore(app);
    const movieref = collection(db, showid + uid)
    await setDoc(doc(movieref, 'init'),
      {
        uid: 'Started'
      });
  } catch (e) {
    console.error("err", e)
  }
  try {
    const db = getFirestore(app);
    const movieref = collection(db, "myshows")
    await setDoc(doc(movieref, showid + uid),
      {
        uid: uid,
        sid: showid,
      });
  } catch (e) {
    console.error("err", e)
  }
}




async function getWatched(Cmid, uid) {
  if (!authStore) {
  } else {
    const db = getFirestore(app);
    const myfetch = collection(db, "relation")
    const q = query(myfetch, where("mid", "==", Cmid), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      return true
    }
    else {
      return false
    }

  }
}

async function checkEpisode(showid, uid, eid) {
  const db = getFirestore(app);
  const myfetch = collection(db, showid + uid)
  const q = query(myfetch, where("eid", "==", eid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    return true
  }
  else {
    return false
  }
}
async function checkIfShowExists(showid, uid) {
  const db = getFirestore(app);
  try {
    const myfetch = collection(db, showid + uid);
    const q = query(myfetch);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch {
    console.log('collection doesnt exist')
  }
}

async function unwatch(Cmid, uid) {
  const db = getFirestore(app);
  await deleteDoc(doc(db, "relation", Cmid + uid));
}

async function deleteMyCollection(showid, uid) {
  const db = getFirestore(app);
  try {
    const myfetch = collection(db, showid + uid);
    const q = query(myfetch);
    const querySnapshot = await getDocs(q);
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, showid + uid, document.id));
    }
    await deleteDoc(doc(db, "myshows", showid + uid));
  } catch (e) {
    console.log(e)
  }


}


const auth = getAuth();
const provider = new GoogleAuthProvider();

function loginfunction() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      authStore.set(user.uid)
      localStorage.setItem('curr', user.uid);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function signoutfunction() {
  signOut(auth).then(() => {
    authStore.set(null)
    localStorage.clear();
  }).catch((error) => {
    console.log(error)
  });
}

export const authFunc = {
  loginFunciton: loginfunction,
  signoutFunction: signoutfunction,
  checkMovieFunction: getWatched,
  addWatchedMovie: addWatched,
  deleteWatchedMovie: unwatch,
  showExists: checkIfShowExists,
  AddShowToTracking: AddShowToTracking,
  deleteCollection: deleteMyCollection,
  AddEpisode: AddEpisode,
  checkEpisode: checkEpisode,
  unwatchEpisode: unwatchEpisode
}