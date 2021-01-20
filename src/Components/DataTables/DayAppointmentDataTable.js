import React, { useContext, useState } from 'react';
import { CalenderContext, DataContext } from '../../App';

const DayAppointmentDataTable = () => {
	const CalenderData = useContext(CalenderContext);
	const ContextData = useContext(DataContext);

	const formatedDate = `${CalenderData.date.getDate()}-${CalenderData.date.getMonth() +
		1}-${CalenderData.date.getFullYear()}`;

	const [ selectAppointment, setSelectAppointment ] = useState(null);

	// Filter only approved appointments forData to DataContext
	const appointmentsOfTheDay = ContextData.allBookedAppointments.filter(
		(ap) => ap.date === formatedDate && ap.status === 'Approved'
	);

	const handleVisitingStatusChange = (visitingStatus) => {
		const data = { id: selectAppointment._id, visitingStatus };

		//Replacing Modified data to Data Context
		const newDataArray = Array.from(ContextData.allBookedAppointments);
		const modifiedData = { ...selectAppointment };
		modifiedData.visitingStatus = visitingStatus;
		const selectedIndex = newDataArray.indexOf(selectAppointment);

		newDataArray.splice(selectedIndex, 1, modifiedData);
		ContextData.setAllBookedAppointments(newDataArray);

		// Storing Data To Database
		fetch('https://online-doctors-portal.herokuapp.com/updateVisitingStatus', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};
	return (
		<div
			className="bg-white rounded shadow-sm p-3"
			style={{
				height: '442px',
				overflow: 'auto'
			}}
		>
			<div className="py-3 d-flex align-items-center justify-content-between">
				<h6 className="text-primary"> Appointments </h6>
				<div className="selector">
					{CalenderData.date.getDate()} {CalenderData.date.toLocaleString('default', { month: 'short' })} ,{' '}
					{CalenderData.date.getFullYear()}
				</div>
			</div>
			{appointmentsOfTheDay.length === 0 ? (
				<div className="p-5">
					<h4 className="lead text-center">No Appointments for this Date</h4>
				</div>
			) : (
				<table className="table table-borderless">
					<thead>
						<tr>
							<th className="text-secondary" scope="col">
								Name
							</th>
							<th className="text-secondary" scope="col">
								Schedule
							</th>
							<th className="text-secondary text-center" scope="col">
								Action
							</th>
						</tr>
					</thead>

					<tbody>
						{appointmentsOfTheDay.map((ap) => (
							<tr>
								<td>{ap.patientInfo.name}</td>
								<td>{ap.date}</td>
								<td className="text-center">
									<select
										onClick={() => setSelectAppointment(ap)}
										onChange={(e) => handleVisitingStatusChange(e.target.value)}
										className={
											ap.visitingStatus === 'Visited' ? (
												'btn btn-primary text-capitalize'
											) : (
												'btn btn-danger text-capitalize'
											)
										}
									>
										<option
											selected={ap.visitingStatus === 'Not Visited'}
											className="bg-white text-secondary"
										>
											Not Visited
										</option>
										<option
											selected={ap.visitingStatus === 'Visited'}
											className="bg-white text-secondary"
										>
											Visited
										</option>
									</select>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default DayAppointmentDataTable;
