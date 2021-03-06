import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Participant = ({ participant, totalParticipant }) => {
	const [videoTracks, setVideoTracks] = useState([]);
	const [audioTracks, setAudioTracks] = useState([]);

	//const { videoON } = useRoomContext();
	//const { currentUser } = useAppContext();
	const auth = useSelector((state) => state.auth);
	const videoRef = useRef();
	const audioRef = useRef();

	const trackpubsToTracks = (trackMap) =>
		Array.from(trackMap.values())
			.map((publication) => publication.track)
			.filter((track) => track !== null);

	useEffect(() => {
		setVideoTracks(trackpubsToTracks(participant.videoTracks));
		setAudioTracks(trackpubsToTracks(participant.audioTracks));

		const trackSubscribed = (track) => {
			if (track.kind === "video") {
				setVideoTracks((videoTracks) => [...videoTracks, track]);
			} else if (track.kind === "audio") {
				setAudioTracks((audioTracks) => [...audioTracks, track]);
			}
		};

		const trackUnsubscribed = (track) => {
			if (track.kind === "video") {
				setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
			} else if (track.kind === "audio") {
				setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
			}
		};

		participant.on("trackSubscribed", trackSubscribed);
		participant.on("trackUnsubscribed", trackUnsubscribed);

		return () => {
			setVideoTracks([]);
			setAudioTracks([]);
			participant.removeAllListeners();
		};
	}, [participant]);

	useEffect(() => {
		const videoTrack = videoTracks[0];
		if (videoTrack) {
			videoTrack.attach(videoRef.current);
			return () => {
				videoTrack.detach();
			};
		}
	}, [videoTracks]);

	useEffect(() => {
		const audioTrack = audioTracks[0];
		if (audioTrack) {
			audioTrack.attach(audioRef.current);
			return () => {
				audioTrack.detach();
			};
		}
	}, [audioTracks]);

	return (
		// <div className='participant'>
		// 	<h3>{participant.identity}</h3>
		// 	<video ref={videoRef} autoPlay />
		// 	<audio ref={audioRef} autoPlay muted />
		// </div>
		<div
			className={`participant ${
				totalParticipant?.length === 0 && "one_participant"
			}`}
		>
			<p className='participant-name'>
				{participant.identity === auth.user.first_name
					? "You"
					: participant.identity}
			</p>
			<video ref={videoRef} autoPlay={true} />
			<audio ref={audioRef} autoPlay={true} muted={true} />
		</div>
	);
};

export default Participant;
