import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase.config.js'
import Spinner from '../Spinner/Spinner'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Slider = () => {
	const [listings, setListings] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		;(async () => {
			const listingsRef = collection(db, 'listings')
			const q = query(listingsRef, orderBy('timestamp', 'desc', limit(5)))
			const querySnap = await getDocs(q)

			const listings = []
			querySnap.forEach(doc => {
				console.log(doc.data())
				return listings.push({
					id: doc.id,
					data: doc.data(),
				})
			})
			setListings(listings)
			setLoading(false)
		})()
	}, [])

	if (loading) {
		return <Spinner />
	}
	return (
		listings && (
			<>
				<p className='exploreHeading'>Recommended</p>
				<Swiper slidesPerView={1} pagination={{ clickable: true }}>
					{listings.map(({ data, id }) => (
						<SwiperSlide
							key={id}
							onClick={() => navigate(`/category/${data.type}/${id}`)}
						>
							<div
								className='swiperSlideDiv'
								style={{
									background: `url(${data.imgUrls[0]}) center no-repeat`,
									backgroundSize: 'cover',
								}}
							>
								<p className='swiperSlideText'>{data.name}</p>
								<p className='swiperSlidePrice'>
									${data.discountedPrice ?? data.regularPrice}
									{data.type === 'rent' && '/ month'}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	)
}

export default Slider
