import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import { useHistory } from "react-router";
function Home() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();

	useEffect(() => {
		if (auth.isauth) {
			if (auth.type === 0) {
				history.push("/patient");
			} else if (auth.type === 1) {
				history.push("/doctor");
			} else if (auth.type === 2) {
				history.push("/admin");
			}
		}
	});

	return (
		<div>
			<Navigation />
			Welcome Home
		</div>
	);
}

export default Home;
