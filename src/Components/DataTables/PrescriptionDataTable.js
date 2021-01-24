import { faNotesMedical, faPlusCircle, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { DataContext } from '../../App';
import PrescriptionModal from '../Dashboard/PrescriptionModal';

const PrescriptionDataTable = () => {
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

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		// Updating Data to DataContext
		const newDataArray = Array.from(ContextData.allBookedAppointments);
		const selectedIndex = newDataArray.indexOf(selectAppointment);

		const SelectedApForModify = { ...selectAppointment };

		SelectedApForModify.disease = data.problem;
		setSelectAppointment(SelectedApForModify);
		newDataArray.splice(selectedIndex, 1, SelectedApForModify);
		ContextData.setAllBookedAppointments(newDataArray);

		// Storing Data to Database

		fetch('https://online-doctors-portal.herokuapp.com/updateDisease', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then((data) => console.log(data));

		setDiseaseModalIsOpen(false);
	};

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
						<th className="text-secondary " scope="col">
							Name
						</th>
						<th className="text-secondary " scope="col">
							Appointment
						</th>
						<th className="text-secondary " scope="col">
							Status
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
					{ContextData.allBookedAppointments.map((ap) => (
						<tr>
							<td>{srNo++}</td>
							<td>{ap.date}</td>
							<td>{ap.time}</td>
							<td>{ap.patientInfo.name.substr(0, 16)}</td>
							<td>{`#${ap._id.substr(0, 7)}`}</td>
							<td>{ap.visitingStatus? ap.visitingStatus : 'Not Visited'}</td>

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
										<FontAwesomeIcon
											onClick={() => openPrescriptionModal(ap._id, ap.apId)}
											className="text-success ml-2"
											style={{ cursor: 'pointer' }}
											icon={faPlusCircle}
										/>
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
						width: '60%',
						transform: 'translate(-50%, -50%)'
					}
				}}
			>
				{selectAppointment && (
					<form className="px-5 my-3" onSubmit={handleSubmit(onSubmit)}>
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
								ref={register({ required: true })}
								name="problem"
								className="form-control col-12"
								rows="3"
							/>
							<div className="col-12">
								{errors.problem && (
									<span className="text-danger">
										Patient's Problem must not empty ! <br />
									</span>
								)}
							</div>
						</div>
						<div className="form-group text-right">
							<input
								type="hidden"
								value={selectAppointment._id}
								ref={register({ required: true })}
								name="id"
							/>
							<button
								type="submit"
								className="btn btn-danger mr-3 text-white"
								onClick={() => setDiseaseModalIsOpen(false)}
							>
								CLOSE
							</button>
							<button type="submit" className="btn btn-primary">
								Update
							</button>
						</div>
					</form>
				)}
			</Modal>

			<PrescriptionModal
				modalIsOpen={modalIsOpen}
				setModalIsOpen={setModalIsOpen}
				selectAppointment={selectAppointment}
				setSelectAppointment={setSelectAppointment}
				selectDoctor={selectDoctor}
			/>
		</div>
	);
};

export default PrescriptionDataTable;
