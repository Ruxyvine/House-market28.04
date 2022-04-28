import { Link } from 'react-router-dom'
import rentCategoryImg from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImg from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider/Slider'

const Explore = () => {
	return (
		<div className='explore'>
			<header>
				<p className='pageHeader'>Explore</p>
			</header>
			<main>
				<Slider />
				<p className='exploreCategoryHeading'>Categories</p>
				<div className='exploreCategories'>
					<Link to='/category/rent'>
						<img
							src={rentCategoryImg}
							alt='rent'
							className='exploreCategoryImg'
						/>
						<p className='exploreCategoryName'>Places for rent</p>
					</Link>
					<Link to='/category/sell'>
						<img
							src={sellCategoryImg}
							alt='sell'
							className='exploreCategoryImg'
						/>
						<p className='exploreCategoryName'>Places for sell</p>
					</Link>
				</div>
			</main>
		</div>
	)
}

export default Explore
