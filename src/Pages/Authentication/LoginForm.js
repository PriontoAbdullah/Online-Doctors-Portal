import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Login.css';

const LoginForm = (props) => {
	const { toggleUser, validation, submit, errors, resetPassword } = props;
	const [ show, setShow ] = useState(false);

	const [ resetEmail, setResetEmail ] = useState({
		email: ''
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleBlur = (e) => {
		const newUserInfo = { ...resetEmail };
		newUserInfo[e.target.name] = e.target.value;
		setResetEmail(newUserInfo);
	};

	const handleResetPassword = () => {
		resetPassword(resetEmail.email);
		setShow(false);
	};

	return (
		<div className="tg-form login">
			<h3>Login</h3> 

			<form onSubmit={submit}>
				<div className="form-group">
					<input type="email" className="form-control" placeholder="Email" name="email" onBlur={validation} />
					{errors.email.length > 0 && <p className="error-msg">{errors.email}</p>}
				</div>

				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						name="password"
						onBlur={validation}
					/>
					{errors.password.length > 0 && <p className="error-msg">{errors.password}</p>}
				</div>

				<div className=" form-group forgot-pass mb-1">
					<div className="custom-control custom-checkbox mr-sm-2">
						<input type="checkbox" className="custom-control-input" id="rememberUser" />
						<label className="custom-control-label" htmlFor="rememberUser">
							Remember me
						</label>
					</div>
					<p className="forget-text text-right" onClick={handleShow}>
						Forgot your password?
					</p>
				</div>

				<button type="submit" className="btn btn-primary btn-block">
					Login
				</button>
			</form>

			<div className="register-login">
				Don’t have an account?
				<button className="btn btn-logintoggle ml-2" onClick={toggleUser}>
					Create an account
				</button>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Enter Your Email</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							placeholder="Email"
							name="email"
							onBlur={handleBlur}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						CLOSE
					</Button>
					<Button variant="primary" onClick={handleResetPassword}>
						Send
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default LoginForm;
