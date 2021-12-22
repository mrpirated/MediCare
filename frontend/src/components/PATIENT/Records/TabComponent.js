import React, { useState } from "react";
import { Tabs, Tab, Card, Modal } from "react-bootstrap";
import moment from "moment";
export default function TabComponent(props) {
	const [key, setKey] = useState(props.selectedKey);
	const [openPopup, setopenPopup] = useState(false);
	const [selectedAP, setselectedAP] = useState({});
	//console.log(props.all);
	const onSelectAppointment = async (app) => {
		setselectedAP(app);
		//console.log(app);
		setopenPopup(true);
	};
	return (
		<div>
			<Tabs
				id='tab'
				activeKey={key}
				onSelect={(k) => setKey(k)}
				className='mb-3'
			>
				{props.tabList.map((item) => (
					<Tab eventKey={item.eventKey} title={item.title}>
						{(item.eventKey === "all"
							? props.all
							: item.eventKey === "future"
							? props.future
							: props.past
						).map((c) => (
							<div id='card'>
								<Card
									className='records'
									onClick={() => onSelectAppointment(c)}
								>
									<Card.Header>
										<h5>Doctor: {c.doctor_name}</h5>
										<h6>
											Date:{" "}
											{c.start_time !== null
												? new Date(c.start_time).toString().slice(0, 15)
												: "NA"}
										</h6>
									</Card.Header>
									<Card.Body>
										<span style={{ fontSize: "18px" }}>
											From:{" "}
											{c.start_time !== null
												? moment(c.start_time).format("hh:mm A")
												: "NA"}
										</span>
										<span style={{ fontSize: "18px", float: "right" }}>
											To:{" "}
											{c.end_time !== null
												? moment(c.end_time).format("hh:mm A")
												: "NA"}
										</span>

										<div>Description: {c.case_description}</div>
									</Card.Body>
								</Card>
							</div>
						))}
					</Tab>
				))}

				{/* <Tab eventKey="home" title="Home">
            </Tab>
            <Tab eventKey="profile" title="Profile">
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
            </Tab> */}
			</Tabs>
			<Modal
				aria-labelledby='example-custom-modal-styling-title'
				show={openPopup}
				onHide={() => setopenPopup(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='example-custom-modal-styling-title'>
						Appointment Details
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<span style={{ fontSize: "20px", color: "grey" }}>Doctor: </span>
						<span style={{ fontSize: "22px" }}>{selectedAP.doctor_name}</span>
					</div>
					<div>
						<span style={{ fontSize: "20px", color: "grey" }}>
							Descrption:{" "}
						</span>
						<span style={{ fontSize: "18px" }}>
							{selectedAP.case_description}
						</span>
					</div>
					<div>
						<span style={{ fontSize: "20px", color: "grey" }}>Date: </span>
						<span style={{ fontSize: "18px" }}>
							{selectedAP.start_time !== null
								? new Date(selectedAP.start_time).toString().slice(0, 15)
								: "NA"}
						</span>
					</div>

					<div>
						<span style={{ fontSize: "20px" }}>
							From:{" "}
							{selectedAP.start_time !== null
								? moment(selectedAP.start_time).format("hh:mm A")
								: "NA"}
						</span>

						<span style={{ fontSize: "20px", float: "right" }}>
							To:{" "}
							{selectedAP.end_time !== null
								? moment(selectedAP.end_time).format("hh:mm A")
								: "NA"}
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
