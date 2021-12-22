import { Avatar, Badge, Button, makeStyles, Popover } from "@material-ui/core";
import {
	Apps,
	CameraAltOutlined,
	FeedbackOutlined,
	HelpOutline,
	PersonAddOutlined,
	Settings,
} from "@material-ui/icons";
import React from "react";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));

const Header = () => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<div className='header'>
			<div className='header__logoContainer'>
				<p>Meet</p>
			</div>

			<div className='header__icons'>
				<HelpOutline />
				<FeedbackOutlined />
				<Settings />

				<div className='header__iconDivider' />

				<Apps />
				<Avatar className='header__avatar' onClick={handleClick} />
			</div>
		</div>
	);
};

export default Header;
