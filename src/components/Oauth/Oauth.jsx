import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { serverTimestamp, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase.config.js'
import { toast } from 'react-toastify'
import googleIcon from '../../assets/svg/googleIcon.svg'

const Oauth = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const onGoogleClick = async () => {
		try {
			const auth = getAuth()
			const provider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, provider)
			const user = result.user
			const docRef = doc(db, 'users', user.uid)
			const docSnap = await getDoc(docRef)
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				})
			}
			toast.success('Google')
			navigate('/')
		} catch (error) {
			toast.error('Error 404')
		}
	}

	return (
		<div className='socialLogin'>
			<p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
			<button className='socialIconDiv' onClick={onGoogleClick}>
				<img className='socialIconImg' src={googleIcon} alt='google' />
			</button>
		</div>
	)
}

export default Oauth
