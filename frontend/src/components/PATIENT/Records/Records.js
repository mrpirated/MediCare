import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { TabNav } from "./TabNav";
import TabComponent from "./TabComponent";
import patientAllAppointmentsAPI from "../../../api/patientAllAppointmentsAPI";

export default function Records() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [past, setPast] = useState([]);
	const [all, setAll] = useState([]);
	const [future, setFuture] = useState([]);

	useEffect(() => {
		sessionStorage.setItem("lastPage", "/patient/records");

		if (!(auth.isauth && auth.type === 0)) {
			history.push("/home");
		} else {
			patientAllAppointmentsAPI({
				token: auth.token,
			}).then((res) => {
				var now = new Date();
				//console.log(new Date(res.appointments[0].start_time));
				//console.log(now);
				if (res.reply) {
					var tmp1 = res.appointments.filter(
						(item) =>
							item.start_time === null || new Date(item.start_time) >= now
					);
					console.log(tmp1);
					var tmp2 = res.appointments.filter(
						(item) =>
							item.start_time !== null && new Date(item.start_time) < now
					);
					console.log(tmp2);
					setPast(tmp2);
					setFuture(tmp1);
					setAll(res.appointments);
				} else {
					alert(res.data.msg + "\nYou will be redirected to Home.");
					setTimeout(history.push("/home"), 4000);
				}
			});
		}
	}, []);

	return (
		<div>
			<TabComponent
				tabList={TabNav}
				selectedKey='future'
				all={all}
				past={past}
				future={future}
			/>
		</div>
	);
}
