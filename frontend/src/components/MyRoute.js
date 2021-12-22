import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function MyRoute({ component: Component, ...rest }) {
	const isauth = useSelector((state) => state.auth.isauth);

	return (
		<Route
			{...rest}
			render={(props) => {
				return !isauth ? <Component {...props} /> : <Redirect to='/home' />;
			}}
		></Route>
	);
}
