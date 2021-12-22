import React from 'react'
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";

export default function Type(props) {
    const history = useHistory();
	
    const openPatient = () => {
        history.push("/patient-dashboard");
    }

    const openDoctor = () => {
        history.push("/doctor-dashboard");
    }

    return (
        <div>
            <Button block size='lg' type='submit' onClick={openPatient}>
                PATIENT
            </Button>
            <Button block size='lg' type='submit' onClick={openDoctor}>
                DOCTOR
            </Button>
        </div>
    )
}
