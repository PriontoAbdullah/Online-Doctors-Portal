import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { DataContext } from '../../App';
import '../../App.css';
import Sidebar from '../../Components/Dashboard/Sidebar';

const AddReview = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const ContextData = useContext(DataContext);
	const patientPhoto = ContextData.loggedInUser.photoURL
		? ContextData.loggedInUser.photoURL
		: 'https://i.imgur.com/Kdo9X2a.jpg';

	const [ newReview, SetNewReview ] = useState({
		img: `${patientPhoto}`,
		name: `${ContextData.loggedInUser.name}`,
		from: '',
		quote: '',
		success: '',
		error: ''
	});

	const inputHandler = (e) => {
		e.preventDefault();
		const review = { ...newReview };
		review[e.target.name] = e.target.value;
		SetNewReview(review);
	};

	const formRef = useRef(null);

	const handleReviewSubmit = (event) => {
		event.preventDefault();
		fetch('https://online-doctors-portal.herokuapp.com/addReview', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newReview)
		})
			.then((result) => {
				const updateReview = { ...newReview };
				updateReview.success = 'Review Create Successfully';
				updateReview.error = '';
				SetNewReview(updateReview);
				result.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				const errUpdate = { ...newReview };
				errUpdate.success = '';
				errUpdate.error = 'something wrong happened';
				SetNewReview(errUpdate);
			});
		formRef.current.reset();
	};

	return (
		<section className="container-fluid row" style={{ backgroundColor: '#F4FDFB', height: '100vh' }}>
			<Sidebar />
			<div id="responsive-dashboard" className="col-md-10 p-4 " style={{ position: 'absolute', right: 0, backgroundColor: '#F4FDFB' }}>
				<h5 className="text-brand my-4 ">Add a Review</h5>
				<div className="reviewForm">
					{newReview.success && <p className="text-success">{newReview.success}</p>}
					{newReview.error && <p className="text-danger">{newReview.error}</p>}

					<Form onSubmit={handleReviewSubmit} ref={formRef} className="col-md-6">
						<Form.Group controlId="formBasicText">
							<Form.Control
								type="text"
								name="name"
								onBlur={inputHandler}
								placeholder="Your Name"
								defaultValue={newReview.name}
								required={true}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicText">
							<Form.Control
								type="text"
								onBlur={inputHandler}
								name="from"
								placeholder="District Name"
								required={true}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicText">
							<Form.Control
								as="textarea"
								onBlur={inputHandler}
								name="quote"
								placeholder="Your Review"
								rows="4"
								required={true}
							/>
						</Form.Group>
						<button className="btn btn-primary" type="submit">
							Send
						</button>
					</Form>
				</div>
			</div>
		</section>
	);
};

export default AddReview;
