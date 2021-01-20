import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../App';
import SingleStatistic from './SingleStatistic';

const Statistics = () => {
	const contextData = useContext(DataContext);

	// Load all Appointments and Patients Information
	useEffect(
		() => {
			const uniquePatients = [];
			const map = new Map();
			if (contextData.allBookedAppointments.length) {
				for (const ap of contextData.allBookedAppointments) {
					if (!map.has(ap.patientInfo.email)) {
						map.set(ap.patientInfo.email, true); // set any value to Map
						uniquePatients.push({
							name: ap.patientInfo.name,
							phone: ap.patientInfo.phone,
							email: ap.patientInfo.email,
							gender: ap.patientInfo.gender,
							age: ap.patientInfo.age,
							weight: ap.patientInfo.weight
						});
					}
				}
			}

            contextData.setAllPatients(uniquePatients);
        },
        
		[  contextData.allBookedAppointments ]
	);

 
    
	const ContextData = useContext(DataContext);
	const total = ContextData.allBookedAppointments.length;

	const pending = ContextData.allBookedAppointments.reduce((accu, curr) => {
		if (curr.status === 'Pending') {
			accu += 1;
		}
		return accu;
	}, 0);

	const date = new Date();
	const formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

	const todays = ContextData.allBookedAppointments.reduce((accu, curr) => {
		if (curr.date === formatedDate) {
			accu += 1;
		}
		return accu;
	}, 0);

	return (
		<div className="row my-5">
			<SingleStatistic classToAdd="bg-danger" data={{ title: 'Pending Appointments', count: pending }} />
			<SingleStatistic classToAdd="bg-warning" data={{ title: 'Today’s Appointments', count: todays }} />
			<SingleStatistic classToAdd="bg-success" data={{ title: 'Total Appointments', count: total }} />
			<SingleStatistic
				classToAdd="bg-info"
				data={{ title: 'Total  Patients', count: ContextData.allPatients.length }}
			/>
		</div>
	);
};

export default Statistics;
