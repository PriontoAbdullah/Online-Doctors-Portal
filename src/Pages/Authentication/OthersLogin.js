import React from "react";
import fbLogo from '../../images/fb.png';
import googleLogo from '../../images/google.png';
import './Login.css';

const LoginWithOthers = (props) => {
	return (
		<div>
			<div className="form-divider text-center">
				<p>Or Sign in with social platforms </p>
			</div>

			<div className="tg-thirdparty-login mb-3">
				<button className="btn btn-secondary" onClick={props.google}>
					<span>
						<img src={googleLogo} style={{ maxWidth: "32px" }} alt="fb logo" />
					</span>
					<span>Continue with Google</span>
				</button>
				<button className="btn btn-secondary" onClick={props.facebook}>
					<span>
						<img src={fbLogo} style={{ maxWidth: "35px" }} alt="fb logo" />
					</span>
					<span>Continue with Facebook</span>
				</button>
			</div>
		</div>
	);
};

export default LoginWithOthers;