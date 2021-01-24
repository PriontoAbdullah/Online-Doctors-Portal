import { faCheckCircle, faPlusCircle, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { DataContext } from '../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const PatientAppointmentPaymentTable = () => {
	const ContextData = useContext(DataContext);
	const [ selectAppointment, setSelectAppointment ] = useState(null);
	const [ modalIsOpen, setModalIsOpen ] = useState(false);
	const [ selectDoctor, setSelectDoctor ] = useState(null);
	const [ doctorModalIsOpen, setDoctorModalIsOpen ] = useState(false);

	// Filter only login patients appointments
	const appointmentsOfThePatient = ContextData.allBookedAppointments.filter(
		(ap) => ap.patientInfo.email === ContextData.loggedInUser.email
	);

	const openPaymentModal = (apId) => {
		setModalIsOpen(true);
		const selectedAp = ContextData.allBookedAppointments.find((ap) => ap._id === apId);
		setSelectAppointment(selectedAp);
	};

	const openDataDoctorModal = (apId, docId) => {
		setDoctorModalIsOpen(true);
		const selectedAp = ContextData.allBookedAppointments.find((ap) => ap._id === apId);
		const selectedDoc = ContextData.allAppointments.find((ap) => ap.id === docId);
		setSelectAppointment(selectedAp);
		setSelectDoctor(selectedDoc);
	};

	let srNo = 1;

	const handlePaymentSuccess = (paymentID) => {
		// Updating Data to DataContext
		const newDataArray = Array.from(ContextData.allBookedAppointments);
		const selectedIndex = newDataArray.indexOf(selectAppointment);

		//Generating New prescription appending to previous
		const SelectedApForModify = { ...selectAppointment };

		SelectedApForModify.paymentID = paymentID;
		setSelectAppointment(SelectedApForModify);
		newDataArray.splice(selectedIndex, 1, SelectedApForModify);
		ContextData.setAllBookedAppointments(newDataArray);

		// Storing Data To Database
		const paymentData = { id: SelectedApForModify._id, paymentID };

		fetch('https://online-doctors-portal.herokuapp.com/addedPayment', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(paymentData)
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
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
						<th className="text-secondary text-left" scope="col">
							Appointment ID
						</th>
						<th className="text-secondary text-left" scope="col">
							Doctor Info
						</th>
						<th className="text-secondary" scope="col">
							Payment Status
						</th>
					</tr>
				</thead>
				<tbody>
					{appointmentsOfThePatient.map((ap) => (
						<tr>
							<td>{srNo++}</td>
							<td>{ap.date}</td>
							<td>{ap.time}</td>
							<td>{`#${ap._id.substr(0, 7)}`}</td>
							<td>
								<button
									onClick={() => openDataDoctorModal(ap._id, ap.apId)}
									className="btn ml-1 btn-success text-white"
								>
									<FontAwesomeIcon icon={faUserMd} /> VIEW
								</button>
							</td>

							<td className="text-center">
								{ap.paymentID ? (
									<button onClick={() => openPaymentModal(ap._id)} className="btn btn-primary">
										Paid
									</button>
								) : (
									<span>
										<span>Not Pay</span>
										<FontAwesomeIcon
											onClick={() => openPaymentModal(ap._id)}
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
				isOpen={doctorModalIsOpen}
				onRequestClose={() => setDoctorModalIsOpen(false)}
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
				{selectAppointment &&
				selectDoctor && (
					<form className="px-5 my-3 text-center">
						<p className="text-center mb-2 mt-3">
							<small>Appointment To</small>
						</p>
						<h5 className="text-success  mb-3">{selectDoctor.name}</h5>
						<h6 className="text-secondary mb-1">{selectDoctor.category}</h6>
						<p className="my-0">
							<small>{selectDoctor.designation}</small>
						</p>
						<p className="my-0">
							<small>{selectDoctor.department}</small>
						</p>
						<p>
							<small>{selectDoctor.hospital}</small>
						</p>
						<p className="my-2">
							Fees: <span className="text-success">৳ 700</span>
						</p>

						<div className="form-group text-right">
							<button
								className="btn btn-danger mr-3 text-white"
								onClick={() => setDoctorModalIsOpen(false)}
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
						width: '40%',
						transform: 'translate(-50%, -50%)'
					}
				}}
			>
				<div className="px-5 py-3">
					{selectAppointment && (
						<div>
							{selectAppointment.paymentID ? (
								<div className="text-center  my-5">
									<FontAwesomeIcon
										className="text-success"
										style={{ fontSize: '5em' }}
										icon={faCheckCircle}
									/>
									<h4 className="mt-4 lead text-success">Your payment successful</h4>
									<p className="mt-4 px-3">Payment Amount: 700 ৳</p>
									<p>Payment ID: {selectAppointment.paymentID}</p>
								</div>
							) : (
								<div>
									<div className="mb-3 mb-4 text-center">
										<h5 className="text-primary mb-1">{selectAppointment.patientInfo.name}</h5>
										<p className="text-secondary mb-0">Date : {selectAppointment.date}</p>
										<p className="text-secondary mb-0">Time : {selectAppointment.time}</p>
										<p className="text-success">Pay 700 ৳ </p>
										<p className="text-warning">
											For testing purpose type 424242424242..... continually!{' '}
										</p>
									</div>

									<ProcessPayment handlePaymentSuccess={handlePaymentSuccess} />
								</div>
							)}
						</div>
					)}
				</div>
			</Modal>
		</>
	);
};

export default PatientAppointmentPaymentTable;
