import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.jsx'
import Explore from './pages/Explore.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Offers from './pages/Offers.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import Category from './pages/Category.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import CreateListing from './pages/CreateListing.jsx'
import 'react-toastify/dist/ReactToastify.css'
import Listing from './pages/Listing.jsx'
import Contact from './pages/Contact.jsx'

const App = () => {
	return (
		<>
			{/* Header */}
			<Router>
				<Routes>
					<Route path='/' element={<Explore />} />
					<Route path='/offers' element={<Offers />} />
					<Route path='/category/:categoryName' element={<Category />} />
					<Route path='/profile' element={<PrivateRoute />}>
						<Route path='/profile' element={<Profile />} />
					</Route>
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='/sign-up' element={<SignUp />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/create-listing' element={<CreateListing />} />
					<Route
						path='/category/:categoryName/:listingId'
						element={<Listing />}
					/>
					<Route path='/contact/:landlordId' element={<Contact />} />
				</Routes>
				<NavBar />
			</Router>
			<ToastContainer />
		</>
	)
}

export default App
