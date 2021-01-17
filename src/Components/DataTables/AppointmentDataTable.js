import { faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { DataContext } from '../../App';

const AppointmentDataTable = () => {
	const ContextData = useContext(DataContext);
	const [ selectAppointment, setSelectAppointment ] = useState(null);
	const [ modalIsOpen, setModalIsOpen ] = useState(false);
	const [ editModalIsOpen, setEditModalIsOpen ] = useState(false);

	const openPrescriptionModal = (apId) => {
		setModalIsOpen(true);
		const selectedAp = ContextData.allBookedAppointments.find((ap) => ap._id === apId);
		setSelectAppointment(selectedAp);
	};

	const openDataEditModal = (apId) => {
		setEditModalIsOpen(true);
		const selectedAp = ContextData.allBookedAppointments.find((ap) => ap._id === apId);
		setSelectAppointment(selectedAp);
	};

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		// Updating Data to DataContext
		const newDataArray = Array.from(ContextData.allBookedAppointments);
		const selectedIndex = newDataArray.indexOf(selectAppointment);

		const SelectedApForModify = { ...selectAppointment };

		SelectedApForModify.date = data.date;
		SelectedApForModify.time = data.time;
		setSelectAppointment(SelectedApForModify);
		newDataArray.splice(selectedIndex, 1, SelectedApForModify);
		ContextData.setAllBookedAppointments(newDataArray);

		// Storing Data to Database

		fetch('http://localhost:5000/updateAppointmentTime', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
		setEditModalIsOpen(false);
	};

	let srNo = 1;

	const handleStatusChange = (status) => {
		const data = { id: selectAppointment._id, status };

		// Updating Data to DataContext
		const newDataArray = Array.from(ContextData.allBookedAppointments);
		const modifiedData = { ...selectAppointment };
		modifiedData.status = status;
		const selectedIndex = newDataArray.indexOf(selectAppointment);

		newDataArray.splice(selectedIndex, 1, modifiedData);
		ContextData.setAllBookedAppointments(newDataArray);

		// Storing Data in database
		fetch('http://localhost:5000/updateBookingStatus', {
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
		<>
			<table className="table table-borderless">
				<thead>
					<tr className="text-center">
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
							Name
						</th>
						<th className="text-secondary" scope="col">
							Contact
						</th>
						<th className="text-secondary" scope="col">
							Prescription
						</th>
						<th className="text-secondary" scope="col">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{ContextData.allBookedAppointments.map((ap) => (
						<tr>
							<td>{srNo++}</td>
							<td>{ap.date}</td>
							<td>{ap.time}</td>
							<td>{ap.patientInfo.name}</td>
							<td>{ap.patientInfo.phone}</td>

							<td className="text-center">
								{ap.prescription ? (
									<button onClick={() => openPrescriptionModal(ap._id)} className="btn btn-primary">
										View
									</button>
								) : (
									<span>
										<span>Not Added</span>
										<FontAwesomeIcon
											onClick={() => openPrescriptionModal(ap._id)}
											className="text-success ml-2"
											style={{ cursor: 'pointer' }}
											icon={faPlusCircle}
										/>
									</span>
								)}
							</td>
							<td className="text-center">
								<select
									onClick={() => setSelectAppointment(ap)}
									onChange={(e) => handleStatusChange(e.target.value)}
									className={
										ap.status === 'Rejected' ? (
											'btn btn-danger'
										) : ap.status === 'Approved' ? (
											'btn btn-success'
										) : (
											'btn btn-info'
										)
									}
								>
									<option selected={ap.status === 'Pending'} className="bg-white text-secondary">
										Pending
									</option>
									<option selected={ap.status === 'Approved'} className="bg-white text-secondary">
										Approved
									</option>
									<option selected={ap.status === 'Rejected'} className="bg-white text-secondary">
										Rejected
									</option>
								</select>

								<button
									onClick={() => openDataEditModal(ap._id)}
									className="btn ml-1 btn-warning text-white"
								>
									<FontAwesomeIcon icon={faPencilAlt} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Modal
				isOpen={editModalIsOpen}
				onRequestClose={() => setEditModalIsOpen(false)}
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
						width: '40%',
						transform: 'translate(-50%, -50%)'
					}
				}}
			>
				{selectAppointment && (
					<form className="px-5 my-3" onSubmit={handleSubmit(onSubmit)}>
						<h5 className="text-primary text-center mb-5">
							{selectAppointment.patientInfo.name}'s Appointment
						</h5>
						<div className="form-group row">
							<label htmlFor="" className="col-4">
								Date
							</label>
							<input
								type="twxt"
								defaultValue={selectAppointment.date}
								ref={register({ required: true })}
								name="date"
								className="form-control col-8"
							/>
							<div className="col-12">
								{errors.date && (
									<span className="text-danger">
										Appointment date must not empty ! <br />
									</span>
								)}
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="" className="col-4">
								Time
							</label>
							<input
								type="text"
								defaultValue={selectAppointment.time}
								ref={register({ required: true })}
								name="time"
								className="form-control col-8"
							/>
							<div className="col-12">
								{errors.time && (
									<span className="text-danger">
										Appointment time must not empty ! <br />
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
							<button type="submit" className="btn btn-primary">
								Update
							</button>
						</div>
					</form>
				)}
			</Modal>
		</>
	);
};

export default AppointmentDataTable;
