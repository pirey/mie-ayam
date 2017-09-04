import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBDRHYUTe-TeC_T2eo5g8h9L3UoupXnLxE",
  authDomain: "mie-ayam-1504084612978.firebaseapp.com",
  databaseURL: "https://mie-ayam-1504084612978.firebaseio.com",
  projectId: "mie-ayam-1504084612978",
  storageBucket: "mie-ayam-1504084612978.appspot.com",
  messagingSenderId: "736287885033"
}

firebase.initializeApp(config)

export default firebase

export const root = firebase.database().ref()
export const restaurantsRef = firebase.database().ref('restaurants')
