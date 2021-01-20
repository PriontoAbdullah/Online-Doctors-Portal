import React, { useEffect, useState } from 'react';
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Testimonial from '../Testimonial/Testimonial';
import './Testimonials.css';

SwiperCore.use([ Navigation, Pagination, Scrollbar, A11y, Autoplay, Virtual ]);

const Testimonials = () => {

    const [reviews, SetReviews] = useState([]);

    useEffect(() => {
      fetch("https://online-doctors-portal.herokuapp.com/allReviews")
        .then(res => res.json())
        .then(data => {
          SetReviews(data);
        });
    }, []);
    
	return (
		<section className="testimonials my-5 py-4">
			<div className="container">
				<div className="section-header">
					<h5 className="text-primary text-uppercase">Testimonial</h5>
					<h1 className="style-color ">
						What Our Patients <br /> Says
					</h1>
				</div>

				<Swiper
					spaceBetween={30}
					slidesPerView="auto"
					centeredslide="false"
					navigation
					autoplay={true}
					key={reviews.length}
				>
					{reviews.map((reviews, index) => (
						<SwiperSlide key={index}>
							<Testimonial reviews={reviews} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Testimonials;
