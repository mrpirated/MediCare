import React from "react";
import { useSelector } from "react-redux";

function Home() {
	const auth = useSelector((state) => state.auth);
	console.log(auth);
	return <div></div>;
}

export default Home;
