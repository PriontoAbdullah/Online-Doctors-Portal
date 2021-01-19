import React, { useContext } from 'react';
import { CalenderContext, DataContext } from '../../App';

const PatientAppointmentDataTable = () => {
	const CalenderData = useContext(CalenderContext);
	const ContextData = useContext(DataContext);

	const formatedDate = `${CalenderData.date.getDate()}-${CalenderData.date.getMonth() +
		1}-${CalenderData.date.getFullYear()}`;

	// Filter only login patients appointments
	const appointmentsOfThePatient = ContextData.allBookedAppointments.filter(
		(ap) => ap.date === formatedDate && ap.patientInfo.email === ContextData.loggedInUser.email
	);

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
			{appointmentsOfThePatient.length === 0 ? (
				<div className="p-5">
					<h4 className="lead text-center">No Appointments for this Date</h4>
				</div>
			) : (
				<table className="table table-borderless">
					<thead>
						<tr>
							<th className="text-secondary" scope="col">
								Date
							</th>
							<th className="text-secondary" scope="col">
								Schedule
							</th>
							<th className="text-secondary text-center" scope="col">
								Meeting Link
							</th>
						</tr>
					</thead>

					<tbody>
						{appointmentsOfThePatient.map((ap) => (
							<tr>
								<td>{ap.date}</td>
								<td>{ap.time}</td>
								<td className="text-center">
									{ap.meeting ? (
										<button className="btn btn-primary">
											<a
												href={ap.meeting}
												target="_blank"
												rel="noopener noreferrer"
												className="text-white"
											>
												Open Google Meet
											</a>
										</button>
									) : (
										<p>No Meeting Link Added</p>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default PatientAppointmentDataTable;
