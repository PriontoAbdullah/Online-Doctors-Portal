import React, { useContext } from 'react';
import { DataContext } from '../../App';
import SingleStatistic from './SingleStatistic';

const PatientStatistics = () => {
	const ContextData = useContext(DataContext);

		// Filter only login patients appointments
		const appointmentsOfThePatient = ContextData.allBookedAppointments.filter(
			(ap) => ap.patientInfo.email === ContextData.loggedInUser.email
		);
	

	const total = appointmentsOfThePatient.length;

	const pending = appointmentsOfThePatient.reduce((accu, curr) => {
		if (curr.status === 'Pending') {
			accu += 1;
		}
		return accu;
	}, 0);

	const complete = appointmentsOfThePatient.reduce((accu, curr) => {
		if (curr.visitingStatus === 'Visited') {
			accu += 1;
		}
		return accu;
	}, 0);

	const date = new Date();
	const formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

	const todays = appointmentsOfThePatient.reduce((accu, curr) => {
		if (curr.date === formatedDate) {
			accu += 1;
		}
		return accu;
	}, 0);

	return (
		<div className="row my-5">
			<SingleStatistic classToAdd="bg-danger" data={{ title: 'Pending Appointments', count: pending }} />
			<SingleStatistic classToAdd="bg-warning" data={{ title: 'Today’s Appointments', count: todays }} />
			<SingleStatistic classToAdd="bg-info" data={{ title: 'Total Appointments', count: total }} />
			<SingleStatistic classToAdd="bg-success" data={{ title: 'Complete Appointments', count: complete }} />
		</div>
	);
};

export default PatientStatistics;
