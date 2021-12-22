import React, {useState, useEffect} from "react";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {Form, Button} from "react-bootstrap";
import "./NewCase.css";
import newCaseAPI from "../../../api/newCaseAPI";

export default function NewCase() {
    const auth = useSelector((state) => state.auth);
	const history = useHistory();

    function validateForm() {
		return true;
        //return email.length > 0 && password.length > 0;
	}

    function handleSubmit(event) {   
        event.preventDefault();
        newCaseAPI({
            token: auth.token
        }).then((res) => {
            if(res.reply){
                const case_id = res.data.case_id;
                history.push("/patient/new-appointment", {case_details: {case_id}});
            }
            else{
                alert(res.data.msg);
            }
        })
    }

    return (
        <div>
            <div className="NewCase">
                <h3 className="FormHeading">Enter Details For New Case</h3>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <div className="text-center" style={{paddingTop: "2rem"}}>
                        <Button variant="outline-dark" block size="sm" className="NewCaseButton"  type='submit' disabled={!validateForm()}>
                            Create Case And Book An Appointment
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
