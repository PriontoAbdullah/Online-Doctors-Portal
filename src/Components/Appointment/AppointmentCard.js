import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import '../Doctors/Doctors.css';

const AppointmentCard = ({ data, modalController }) => {
	const { id, img, category, name, education, designation, department, hospital } = data;
	const [ descriptionCollapse, setDescriptionCollapse ] = useState(false);

	const showMore = () => {
		setDescriptionCollapse(true);
	};

	const showLess = () => {
		setDescriptionCollapse(false);
	};

	return (
		<div className="col-md-4 mb-5">
			<div className="single-doctor">
				<img className="img-fluid doctor-image" src={img} alt="doctor" />
				<div className="doctor-description">
					<p className="doctor-category">{category}</p>
					<h4 className="doctor-name">{name}</h4>
					<span className="doctor-education">
						{descriptionCollapse ? education : education.substr(0, 80)}
					</span>
					{education.length > 80 ? descriptionCollapse ? (
						<span onClick={showLess} className="collapse-btn">
							See Less
						</span>
					) : (
						<span onClick={showMore} className="collapse-btn">
							See More
						</span>
					) : (
						<span> </span>
					)}
					<h6 className="mt-4">{designation}</h6>
					<h6 className="department">{department}</h6>
					<h6 className="hospital">{hospital}</h6>
					<div className="text-center">
						<button className="btn btn-primary button-style mt-3" onClick={() => modalController(id)}>
							<FontAwesomeIcon icon={faCalendarCheck} className="mr-3" /> Book Appointment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppointmentCard;
