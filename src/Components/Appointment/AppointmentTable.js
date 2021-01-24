import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { CalenderContext, DataContext } from '../../App';
import Preloader from '../Preloader/Preloader';
import AppointmentCard from './AppointmentCard';

Modal.setAppElement('#root');

const AppointmentTable = () => {
	const contextData = useContext(CalenderContext);
	const contextAppointmentData = useContext(DataContext);
	const [ selectAppointment, setSelectAppointment ] = useState(null);
	const [ modalIsOpen, setModalIsOpen ] = useState(false);
	const [ isBooked, setIsBooked ] = useState(false);

	const date = `${contextData.date.getDate()}-${contextData.date.getMonth() + 1}-${contextData.date.getFullYear()}`;

	const makeBooking = (patientInfo) => {
		setIsBooked(true);
		const apId = selectAppointment.id;
		const time = '9:00 AM - 11:00 AM';
		const dataToStore = { apId, date, time, patientInfo, status: 'Pending' };
		fetch('https://online-doctors-portal.herokuapp.com/makeBooking', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(dataToStore)
		})
			.then((res) => res.json())
			.then((data) => {
				const newAllBooking = [ ...contextAppointmentData.allBookedAppointments ];
				newAllBooking.push(data);
				contextAppointmentData.setAllBookedAppointments(newAllBooking);
			})
			.catch((err) => console.log(err));
	};

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		makeBooking(data);
	};

	const modalController = (apId) => {
		setModalIsOpen(true);
		const selectedAp = contextAppointmentData.allAppointments.find((ap) => ap.id === apId);
		if (selectedAp) {
			setSelectAppointment(selectedAp);
		}
	};

	const successView = () => {
		setIsBooked(false);
		setModalIsOpen(false);
	};

	return (
		<div className="appointments container py-5 mt-5">
			<h3 className="text-primary text-center my-5">
				Available Appointments on {contextData.date.toLocaleString('default', { month: 'long' })}{' '}
				{contextData.date.getDate()}, {contextData.date.getFullYear()}
			</h3>
			<div className="row">
				{contextAppointmentData.preLoaderVisibility && <Preloader />}

				{contextAppointmentData.allAppointments.map((SingleAp) => (
					<AppointmentCard data={SingleAp} modalController={modalController} />
				))}
			</div>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				id="modal-responsive"
				style={{
					overlay: {
						backgroundColor: 'rgba(130,125,125,0.75)'
					},
					content: {
						top: '55%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						width: '45%',
						transform: 'translate(-50%, -50%)',
						
					}
				}}
			>
				{isBooked ? (
					<div className="text-center  py-5 my-5">
						<FontAwesomeIcon className="text-success" style={{ fontSize: '5em' }} icon={faCheckCircle} />
						<h4 className="mt-5 lead">Appointment Request Sent!</h4>
						<p className="mt-5 px-3">
							Please go to Dashboard and Login with your email which you provided into booking appointment to view details.
						</p>
						<span className="d-none">{setTimeout(successView, 10000)}</span>
					</div>
				) : (
					selectAppointment && (
						<div className="px-4">
							<h4 className="text-primary text-center">{selectAppointment.category}</h4>
							<h5 className="text-center style-color">{selectAppointment.name}</h5>
							<p className="text-center text-secondary  small mb-4">
								On {contextData.date.toLocaleString('default', { month: 'long' })}
								{contextData.date.getDate()}, {contextData.date.getFullYear()}
								<br /> Available Time: 9:00 AM - 11:00 AM
							</p>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="form-group">
									<input
										type="text"
										ref={register({ required: true })}
										name="name"
										placeholder="Your Name"
										className="form-control"
									/>
									{errors.name && <span className="text-danger">Name is required</span>}
								</div>
								<div className="form-group">
									<input
										type="text"
										ref={register({ required: true })}
										name="phone"
										placeholder="Phone Number"
										className="form-control"
									/>
									{errors.phone && <span className="text-danger">Phone Number is required</span>}
								</div>
								<div className="form-group">
									<input
										type="text"
										ref={register({ required: true })}
										name="email"
										placeholder="Email"
										className="form-control"
									/>
									{errors.email && <span className="text-danger">Email is required</span>}
								</div>
								<div className="form-group row">
									<div className="col-4">
										<select
											className="form-control"
											name="gender"
											ref={register({ required: true })}
										>
											<option disabled={true} value="Not set">
												Select Gender
											</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
											<option value="Not set">Other</option>
										</select>
										{errors.gender && <span className="text-danger">Gender is required</span>}
									</div>
									<div className="col-4">
										<input
											ref={register({ required: true })}
											className="form-control"
											name="age"
											placeholder="Your Age"
											type="number"
										/>
										{errors.age && <span className="text-danger">Age is required</span>}
									</div>
									<div className="col-4">
										<input
											ref={register({ required: true })}
											className="form-control"
											name="weight"
											placeholder="Weight"
											type="number"
										/>
										{errors.weight && <span className="text-danger">Weight is required</span>}
									</div>
								</div>
								<div className="form-group">
									<textarea
										ref={register({ required: true })}
										className="form-control"
										name="problem"
										placeholder="Describe Your Problem... (Ex: headache)"
										type="text"
									/>
									{errors.problem && <span className="text-danger">This field is required</span>}
								</div>

								<div className="form-group text-right">
									<button type="submit" className="btn btn-primary">
										Send
									</button>
								</div>
							</form>
						</div>
					)
				)}
			</Modal>
		</div>
	);
};

export default AppointmentTable;
