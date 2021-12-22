import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
function Popup(props) {
	const [openPopup, setopenPopup] = useState(props.openPopup);
	const handleClose = () => setopenPopup(false);
	const handleShow = () => setopenPopup(true);
	console.log(props);
	return (
		<>
			<Modal show={openPopup} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
			</Modal>
		</>
	);
}

export default Popup;
