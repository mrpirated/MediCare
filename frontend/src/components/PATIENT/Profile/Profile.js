import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function Profile() {
	const [key, setKey] = useState("profile");
	return (
		<div>
			<div>
				<Nav
					className='col-md-12 d-none d-md-block sidebar'
					onSelect={(selectedKey) => {
						setKey(selectedKey);
						console.log(selectedKey);
					}}
				>
					<Nav.Item>
						<Nav.Link eventKey='profile'>Profile</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey='questions'>Previous Diseases</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey='update' disabled>
							Update Personal Information
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</div>
		</div>
	);
}

export default Profile;
