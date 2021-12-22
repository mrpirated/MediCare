import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective} from "@syncfusion/ej2-react-schedule";
import doctorAppointmentsAPI from "../../../api/doctorAppointmentsAPI";

function Calendar() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [localData, setLocalData] = useState({});
	useEffect(() => {
		if (!(auth.isauth && auth.type === 1)) {
			history.push("/home");
		}
		else{
			doctorAppointmentsAPI({
				token: auth.token
			}).then((res) => {
				if (res.reply) {
					var tmp1 = {dataSource: res.appointments};
					// var tmp = [];
					// console.log(res.appointments);
					// for(let i = 0; i < res.appointments.length; i++){
					// 	console.log(res.appointments[i].id, res.appointments[i].Subject);
					// 	tmp.push({
					// 		Id: res.appointments[i].id,
					// 		Subject: res.appointments[i].Subject,
					// 		StartTime: res.appointments[i].StartTime,
					// 		EndTime: res.appointments[i].EndTime
					// 		// StartTime: new Date(2021, 8, 21, 0,0),
					// 		// EndTime: new Date(2021, 8, 21, 1,0),
					// 	})
					// }
					// var tmp1 = {dataSource: tmp};
					setLocalData(tmp1);
				} else {
					alert(res.data.msg + "\nYou will be redirected to Home.");
					setTimeout(history.push("/home"), 4000);
				}
			})
		}
		
	}, []);

	const onPopupOpen = (args) => {
        //console.log(args.data);
		//history.push("/home", {data: args.data});	
    }

	return (
		<div>
			{/* <ButtonComponent id='btn1' title='Click to open Editor' onClick={this.onClickButton1.bind(this)}>Click to open Editor</ButtonComponent> */}
			<ScheduleComponent currentView='Day' eventSettings={localData} 
			readonly={true} popupOpen={onPopupOpen}>
				<ViewsDirective>
					<ViewDirective option='Day'/>
					<ViewDirective option='Week'/>
					<ViewDirective option='Month'/>
				</ViewsDirective>
				{/* <ViewsDirective>
				</ViewsDirective>
				<ViewsDirective>
				</ViewsDirective> */}
				<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
			</ScheduleComponent>
		</div>
	);
}

export default Calendar;
