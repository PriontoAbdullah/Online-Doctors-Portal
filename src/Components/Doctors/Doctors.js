import React, { useEffect, useState } from 'react';
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import doctors from '../../Data/doctors';
import Doctor from '../Doctor/Doctor';
import './Doctors.css';

SwiperCore.use([ Navigation, Pagination, Scrollbar, A11y, Autoplay, Virtual ]);

const Doctors = () => {

    const [ doctorsData, setDoctorsData ] = useState();

	useEffect(() => {
		setDoctorsData(doctors);
    }, []);
    
    return (
        <section className="doctors">
            <div className="container my-5">
                <h1 className="text-center text-primary my-5">Our Doctors</h1>
                <div className="doctors-view">
                    <Swiper
					spaceBetween={20}
                    slidesPerView={3}
                    centeredslide="true"
					navigation
					autoplay={true}
					key={doctorsData && doctorsData.length}
				>
					{doctorsData &&
						doctorsData.map((doctorsData, index) => (
							<SwiperSlide key={index}>
								<Doctor key={doctorsData.id} doctorsData={doctorsData} />
							</SwiperSlide>
						))}
				</Swiper>
                </div>
            </div>
        </section>
    );
};

export default Doctors;