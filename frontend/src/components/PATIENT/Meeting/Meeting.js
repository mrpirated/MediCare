import React, { useEffect } from "react";
import Header from "./Header/Header";
import { useSelector } from "react-redux";
import VideoChat from "./VideoChat";
import "./styles.css";
function Meeting() {
	//const auth = useSelector((state) => state.auth);

	return (
		<div>
			<VideoChat />
		</div>
	);
}

export default Meeting;
