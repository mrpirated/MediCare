import {
	CallEnd,
	ExpandLess,
	MicNone,
	MicOffOutlined,
	MoreVert,
	VideocamOffOutlined,
	VideocamOutlined,
} from "@material-ui/icons";
import React from "react";
import "./styles.css";

// import { useAppContext } from "../../context/appContext";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setVideo, setAudio, setSnackBar } from "../../../../store/video";

const Controls = ({ handleLogout, roomName, muteParticipant, enableVideo }) => {
	//const { videoON, setVideoON, audioON, setAudioON } = useRoomContext();
	const dispatch = useDispatch();
	const videoON = useSelector((state) => state.video.videoOn);
	const audioON = useSelector((state) => state.video.audioOn);

	const toogleVideoState = () => {
		dispatch(setVideo({ videoOn: !videoON }));
		enableVideo();
	};

	const toogleAudioState = () => {
		dispatch(setAudio({ audioOn: !audioON }));
		muteParticipant();
	};

	return (
		<>
			<div className='controls'>
				<div className='details_control'>
					<p>Meeting details</p>
					<ExpandLess />
				</div>

				<div className='video-audio_contorls'>
					<div
						className={`control_btnContainer ${!audioON && "red-bg"}`}
						onClick={toogleAudioState}
					>
						{audioON ? (
							<MicNone className='control-icon' />
						) : (
							<MicOffOutlined className='control-icon' />
						)}
					</div>

					<div className='control_btnContainer' onClick={handleLogout}>
						<CallEnd className='control-icon end-meet' />
					</div>

					<div
						className={`control_btnContainer ${!videoON && "red-bg"}`}
						onClick={toogleVideoState}
					>
						{videoON ? (
							<VideocamOutlined className='control-icon' />
						) : (
							<VideocamOffOutlined className='control-icon' />
						)}
					</div>
				</div>

				<MoreVert className='more-icon' />
			</div>
		</>
	);
};

export default Controls;
