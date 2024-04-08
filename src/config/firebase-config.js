// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// import { getAuth } from 'firebase-admin/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB74Nd_QAsSi3HJF3nYY1ZHAr0yjYwkenw',
  authDomain: 'food-orderring-web.firebaseapp.com',
  projectId: 'food-orderring-web',
  storageBucket: 'food-orderring-web.appspot.com',
  messagingSenderId: '903020593508',
  appId: '1:903020593508:web:e7e26508af4023ddb7fa71',
  measurementId: 'G-N38SC9YQ6Z'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
//TODO:  TEST   TO SEE  IF  CUSOM cLAIMS  CAN  BE SET
// On sign up.
// const auth = getAuth()
//  auth.user().onCreate(async user => {
//   // Check if user meets role criteria.
//   if (
//     user.email &&
//     user.email.endsWith('@gmail.com')
//     // user.emailVerified
//   ) {
//     const customClaims = {
//       admin: true,
//       accessLevel: 9
//     }

//     try {
//       // Set custom user claims on this newly created user.
//       await getAuth().setCustomUserClaims(user.uid, customClaims)

//       // Update real-time database to notify client to force refresh.
//       // const metadataRef = getDatabase().ref('metadata/' + user.uid)

//       // Set the refresh time to the current UTC timestamp.
//       // This will be captured on the client to force a token refresh.
//       // await metadataRef.set({ refreshTime: new Date().getTime() })
//     } catch (error) {
//       console.log(error)
//     }
//   }
// })
