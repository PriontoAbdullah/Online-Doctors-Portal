import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { DataContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
	const {loggedInUser} = useContext(DataContext);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				loggedInUser.email ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/dashboard",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;