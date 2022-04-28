import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCsQ6mzvukW9VCPpT03BUG4U6I1GY_K3Fg',
	authDomain: 'house-market-8d665.firebaseapp.com',
	projectId: 'house-market-8d665',
	storageBucket: 'house-market-8d665.appspot.com',
	messagingSenderId: '556853764012',
	appId: '1:556853764012:web:10f3f6aa5c1e6e4505e409',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore()
