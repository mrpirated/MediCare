import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../store/auth";
import { CircularProgress } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import Video from "twilio-video";
import config from "../../../config/config";
import Room from "./Room";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
function VideoChat() {
	const [roomName, setRoomName] = useState(uuidv4());
	const [room, setRoom] = useState(null);
	const [username, setUsername] = useState("");
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		setUsername(auth.user.first_name);
	}, [auth]);
	const handleSubmit = useCallback(async () => {
		dispatch(setLoading({ loading: true }));
		const data = await axios
			.post(config.baseUrl + config.video_token, {
				identity: username,
				room: roomName,
			})
			.then((res) => {
				console.log(res.data);
				Video.connect(res.data.token, {
					name: roomName,
				})
					.then((room) => {
						dispatch(setLoading({ loading: false }));
						setRoom(room);
					})
					.catch((err) => {
						console.log("Error: " + err);
						dispatch(setLoading({ loading: false }));
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}, [roomName, username]);
	const handleLogout = useCallback(() => {
		setRoom((prevRoom) => {
			if (prevRoom) {
				prevRoom.localParticipant.tracks.forEach((trackPub) => {
					trackPub.track.stop();
				});
				prevRoom.disconnect();
			}
			return null;
		});
	}, []);
	useEffect(() => {
		const tidyUp = (event) => {
			if (event.persisted) return;

			if (room) {
				handleLogout();
			}
		};
		window.addEventListener("pagehide", tidyUp);
		window.addEventListener("beforeunload", tidyUp);
		return () => {
			window.addEventListener("pagehide", tidyUp);
			window.addEventListener("beforeunload", tidyUp);
		};
	}, [room, handleLogout]);
	let render;
	if (room) {
		render = (
			<Room roomName={roomName} room={room} handleLogout={handleLogout} />
		);
	} else {
		render = (
			<>
				{auth.loading ? (
					<div className='loading'>
						<CircularProgress />
						<h1 className='loading_text'>Loading...</h1>
					</div>
				) : (
					<>
						<Header />
						<Hero
							username={username}
							roomName={roomName}
							handleSubmit={handleSubmit}
							connecting={auth.loading}
							setRoomName={setRoomName}
						/>
					</>
				)}
			</>
		);
	}
	return render;
}

export default VideoChat;
