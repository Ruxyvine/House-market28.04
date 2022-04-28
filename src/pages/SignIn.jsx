import { toast } from 'react-toastify'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Oauth from '../components/Oauth/Oauth'

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const { email, password } = formData
	const navigate = useNavigate()

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const onSubmit = async e => {
		e.preventDefault()
		try {
			const auth = getAuth()
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			if (userCredential.user) {
				navigate('/')
			}
		} catch (error) {
			toast.success('Message Error 404')
		}
	}

	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome Back!</p>
				</header>
				<main>
					<form onSubmit={onSubmit}>
						<input
							id='email'
							type='email'
							placeholder='Email'
							className='emailInput'
							value={email}
							onChange={onChange}
						/>
						<div className='passwordInputDiv'>
							<input
								id='password'
								type={showPassword ? 'text' : 'password'}
								placeholder='Password'
								className='passwordInput'
								value={password}
								onChange={onChange}
							/>
							<img
								src={visibilityIcon}
								alt='show password'
								className='showPassword'
								onClick={() => setShowPassword(prevState => !prevState)}
							/>
						</div>
						<Link to='/forgot-password' className='forgotPasswordLink'>
							Forgot Password
						</Link>
						<div className='signInBar'>
							<p className='signInText'>Sign In</p>
							<button className='signInButton'>
								<ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
							</button>
						</div>
					</form>
					<Oauth />
					<Link className='registerLink' to='/sign-up'>
						Sign Up Instead
					</Link>
				</main>
			</div>
		</>
	)
}

export default SignIn
