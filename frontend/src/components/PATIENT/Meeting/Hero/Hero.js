import { Button, Divider, InputAdornment, TextField } from "@material-ui/core";
import { Keyboard, VideoCallOutlined } from "@material-ui/icons";
import React from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

const Hero = ({ setRoomName, handleSubmit }) => {
	const newMeeting = () => {
		setRoomName(uuidv4());
		handleSubmit();
	};

	const handleRoomNameChange = (event) => {
		setRoomName(event.target.value);
	};
	return (
		<div className='hero'>
			<div className='hero__left'>
				<div className='hero__buttons'>
					<Button
						onClick={handleSubmit}
						color='primary'
						variant='contained'
						className='hero__createBTN'
					>
						<VideoCallOutlined />
						<p>New Meeting</p>
					</Button>

					<TextField
						className='hero__input'
						variant='outlined'
						onChange={handleRoomNameChange}
						placeholder='Enter a code or link '
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Keyboard className='icon' />
								</InputAdornment>
							),
						}}
					/>

					<Button className='hero__joinBTN' onClick={handleSubmit}>
						Join
					</Button>
				</div>

				<Divider />
			</div>
		</div>
	);
};

export default Hero;
