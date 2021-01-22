import { faNotesMedical, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { DataContext } from '../../App';

const PatientPrescriptionDataTable = () => {
	const ContextData = useContext(DataContext);
	const [ selectAppointment, setSelectAppointment ] = useState(null);
	const [ selectDoctor, setSelectDoctor ] = useState(null);
	const [ modalIsOpen, setModalIsOpen ] = useState(false);
	const [ diseaseModalIsOpen, setDiseaseModalIsOpen ] = useState(false);

	const openPrescriptionModal = (apId, docId) => {
		setModalIsOpen(true);
		const selectedAp = ContextData.allBookedAppointments.find((ap) => ap._id === apId);
		const selectedDoc = ContextData.allAppointments.find((ap) => ap.id === docId);
		setSelectAppointment(selectedAp);
		setSelectDoctor(selectedDoc);
	};

	const openDataDiseaseModal = (apId, docId) => {
		setDiseaseModalIsOpen(true);
		const selectedAp = ContextData.allBookedAppointments.find((ap) => ap._id === apId);
		const selectedDoc = ContextData.allAppointments.find((ap) => ap.id === docId);
		setSelectAppointment(selectedAp);
		setSelectDoctor(selectedDoc);
	};

	// Filter only login patients appointments
	const appointmentsOfThePatient = ContextData.allBookedAppointments.filter(
		(ap) => ap.patientInfo.email === ContextData.loggedInUser.email
	);

	let srNo = 1;

	return (
		<div>
			<table className="table table-borderless">
				<thead>
					<tr>
						<th className="text-secondary text-left" scope="col">
							Sr No
						</th>
						<th className="text-secondary" scope="col">
							Date
						</th>
						<th className="text-secondary" scope="col">
							Time
						</th>
						<th className="text-secondary" scope="col">
							Appointment ID
						</th>
						<th className="text-secondary" scope="col">
							Disease
						</th>
						<th className="text-secondary text-center" scope="col">
							Prescription
						</th>
					</tr>
				</thead>
				<tbody>
					{appointmentsOfThePatient.map((ap) => (
						<tr>
							<td>{srNo++}</td>
							<td>{ap.date}</td>
							<td>{ap.time}</td>
							<td>{`#${ap._id.substr(0, 9)}`}</td>
							<td>
								<button
									onClick={() => openDataDiseaseModal(ap._id, ap.apId)}
									className="btn ml-1 btn-success text-white"
								>
									<FontAwesomeIcon icon={faStethoscope} /> VIEW
								</button>
							</td>

							<td className="text-center">
								{ap.prescription ? (
									<button
										onClick={() => openPrescriptionModal(ap._id, ap.apId)}
										className="btn ml-1 btn-primary text-white"
									>
										<FontAwesomeIcon icon={faNotesMedical} /> View
									</button>
								) : (
									<span>
										<span>Not Added</span>
									</span>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Modal
				isOpen={diseaseModalIsOpen}
				onRequestClose={() => setDiseaseModalIsOpen(false)}
				id="modal-responsive"
				style={{
					overlay: {
						backgroundColor: 'rgba(130,125,125,0.75)'
					},
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						width: '50%',
						transform: 'translate(-50%, -50%)'
					}
				}}
			>
				{selectAppointment && (
					<form className="px-5 my-3">
						<h5 className="text-primary text-center">{selectAppointment.patientInfo.name}'s Disease</h5>
						<p className="text-center mb-2 mt-3">
							<small>Appointment To</small>
						</p>
						<h6 className="text-success text-center mb-2">{selectDoctor.name}</h6>
						<p className="text-secondary text-center mb-4">{selectDoctor.category}</p>

						<div className="form-group row">
							<textarea
								type="text"
								defaultValue={
									selectAppointment.disease ? (
										selectAppointment.disease
									) : (
										selectAppointment.patientInfo.problem
									)
								}
								name="problem"
								className="form-control col-12"
								rows="3"
								disabled={true}
							/>
						</div>
						<div className="form-group text-right">
							<button
								className="btn btn-danger mr-3 text-white"
								onClick={() => setDiseaseModalIsOpen(false)}
							>
								CLOSE
							</button>
						</div>
					</form>
				)}
			</Modal>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				id="modal-responsive"
				style={{
					overlay: {
						backgroundColor: 'rgba(130,125,125,0.75)'
					},
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						width: '50%',
						transform: 'translate(-50%, -50%)'
					}
				}}
			>
				<div className="px-5 py-3">
					{selectDoctor && (
						<div className="mb-4 text-center">
							<h5 className="text-success">{selectDoctor.name}</h5>
							<h6 className="text-secondary">{selectDoctor.category}</h6>
							<p className="my-0">
								<small>{selectDoctor.designation}</small>
							</p>
							<p className="my-0">
								<small>{selectDoctor.department}</small>
							</p>
							<p>
								<small>{selectDoctor.hospital}</small>
							</p>
						</div>
					)}

					{selectAppointment && (
						<div>
							<div className="mb-3 mb-4 d-flex justify-content-between">
								<span className="text-secondary">
									<strong>{selectAppointment.patientInfo.name}</strong>
								</span>
								<span>Gender : {selectAppointment.patientInfo.gender}</span>
								<span>Age : {selectAppointment.patientInfo.age}</span>
							</div>

							<div className="mt-5" style={{ height: '300px', overflow: 'auto' }}>
								{selectAppointment.prescription && (
									<table className="table table-borderless">
										{selectAppointment.prescription.length &&
											selectAppointment.prescription.map((prescript, index) => (
												<tr>
													<td>{index + 1}.</td>
													<td>{prescript.medicine}</td>
													<td>{prescript.doge}</td>
													<td>{prescript.days} Days</td>
												</tr>
											))}
									</table>
								)}
							</div>

							<div className=" d-flex justify-content-end">
								<button
									className="btn btn-danger mr-3 text-white"
									onClick={() => setModalIsOpen(false)}
								>
									CLOSE
								</button>
							</div>
						</div>
					)}
				</div>
			</Modal>
		</div>
	);
};

export default PatientPrescriptionDataTable;
