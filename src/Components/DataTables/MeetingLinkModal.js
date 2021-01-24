import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { DataContext } from '../../App';

const MeetingLinkModal = (props) => {
	const ContextData = useContext(DataContext);

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (newLink, e) => {
		// Updating Data to DataContext
		const newDataArray = Array.from(ContextData.allBookedAppointments);
		const selectedIndex = newDataArray.indexOf(props.selectAppointment);

		//Generating New prescription appending to previous
		const SelectedApForModify = { ...props.selectAppointment };
		console.log('old', SelectedApForModify);

		SelectedApForModify.meeting = newLink.meeting;
		props.setSelectAppointment(SelectedApForModify);
		newDataArray.splice(selectedIndex, 1, SelectedApForModify);
		ContextData.setAllBookedAppointments(newDataArray);

		// Storing Data To Database
		e.target.reset();
		console.log(newLink);

		fetch('https://online-doctors-portal.herokuapp.com/addedMeetingLink', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(newLink)
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));

		props.setModalIsOpen(false);
	};

	return (
		<Modal
			isOpen={props.modalIsOpen}
			onRequestClose={() => props.setModalIsOpen(false)}
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
			<div className="px-5 py-3">
				{props.selectAppointment && (
					<div>
						<div className="mb-3 mb-4 d-flex justify-content-between">
							<span className="text-primary">{props.selectAppointment.patientInfo.name}</span>
							<span>Date : {props.selectAppointment.date}</span>
							<span>Time : {props.selectAppointment.time}</span>
						</div>
						{props.selectAppointment.meeting ? (
							<div>
								<p>
									Meeting Link:
									<a href={props.selectAppointment.meeting} target="_blank" rel="noopener noreferrer" className="ml-2">

										{props.selectAppointment.meeting}
									</a>
								</p>
							</div>
						) : (
							<form className="row add-prescription" onSubmit={handleSubmit(onSubmit)}>
								<div className="col-12">
									{errors.meeting && (
										<span className="text-danger">
											Meeting Link must not empty ! <br />
										</span>
									)}
								</div>
								<input
									className="form-control col-10"
									ref={register({ required: true })}
									name="meeting"
									placeholder="Meeting Link"
									type="text"
								/>

								<input
									type="hidden"
									value={props.selectAppointment._id}
									ref={register({ required: true })}
									name="id"
								/>
								<button type="submit" className="btn btn-primary col-1 ml-3">
									<FontAwesomeIcon icon={faPlus} />
								</button>
							</form>
						)}
					</div>
				)}
			</div>
		</Modal>
	);
};

export default MeetingLinkModal;
