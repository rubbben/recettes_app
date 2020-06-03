import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "YOUR-API-KEY",
  authDomain: "recettes-app-68926.firebaseapp.com",
  databaseURL: "https://recettes-app-68926.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
