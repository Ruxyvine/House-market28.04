import { getAuth, updateProfile } from 'firebase/auth'
import {
	doc,
	updateDoc,
	collection,
	getDocs,
	query,
	where,
	orderBy,
	deleteDoc,
} from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase.config.js'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import homeIcon from '../assets/svg/homeIcon.svg'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import Spinner from '../components/Spinner/Spinner.jsx'
import ListingItem from '../components/ListingItem/ListingItem.jsx'

const Profile = () => {
	const auth = getAuth()
	const navigate = useNavigate()
	const [listings, setListings] = useState(null)
	const [loading, setLoading] = useState(true)
	const [changeDetails, setChangeDetails] = useState(false)
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	})
	const { name, email } = formData
	//27.04 editting
	useEffect(() => {
		;(async () => {
			const listingsRef = collection(db, 'listings')
			const q = query(
				listingsRef,
				where('userRef', '==', auth.currentUser.uid),
				orderBy('timestamp', 'desc')
			)
			const querySnap = await getDocs(q)

			let listings = []

			querySnap.forEach(doc => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				})
			})

			setListings(listings)
			setLoading(false)
		})()
	}, [auth.currentUser.uid])
	const onDelete = async listingId => {
		if (window.confirm('Are you sure you want to delete?')) {
			await deleteDoc(doc(db, 'listings', listingId))
			const updateListings = listings.filter(
				listing => listing.id !== listingId
			)
			setListings(updateListings)
			toast.success('succesfully deleted')
		}
	}

	const onLogout = () => {
		auth.signOut()
		navigate('/')
	}

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				await updateProfile(auth.currentUser, {
					displayName: name,
				})
			}
			const userRef = doc(db, 'users', auth.currentUser.uid)
			await updateDoc(userRef, {
				name,
				email,
			})
		} catch (error) {
			toast.error('Error  profile submit404')
		}
		if (loading) {
			return <Spinner />
		}
	}

	return (
		<div className='profile'>
			<header className='profileHeader'>
				<p className='pageHeader'>My Profile</p>
				<button className='logOut' onClick={onLogout}>
					Logout
				</button>
			</header>
			<main>
				<div className='profileDetailsHeader'>
					<p className='profileDetailsText'>Personal Details</p>
					<p
						className='changePersonalDetails'
						onClick={() => {
							changeDetails && onSubmit()
							setChangeDetails(prevState => !prevState)
						}}
					>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>
				<div className='profileCard'>
					<form>
						<input
							onChange={onChange}
							value={name}
							disabled={!changeDetails}
							id='name'
							type='text'
							className={!changeDetails ? 'profileName' : 'profileNameActive'}
						/>
						<input
							onChange={onChange}
							value={email}
							disabled={!changeDetails}
							id='email'
							type='text'
							className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
						/>
					</form>
				</div>
				<Link to='/create-listing' className='createListing'>
					<img src={homeIcon} alt='homeIcon' />
					<p>Sell or rent your home</p>
					<img src={arrowRight} alt='arrowRight' />
				</Link>
				{!loading && listings?.length > 0 && (
					<>
						<p className='listingText'>Your Listings</p>
						<ul className='listingsList'>
							{listings.map(listing => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
									onDelete={() => onDelete(listing.id)}
								/>
							))}
						</ul>
					</>
				)}
			</main>
		</div>
	)
}

export default Profile
