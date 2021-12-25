import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import doctorAppointmentsAPI from "../../../api/doctorAppointmentsAPI";

function Calendar() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [localData, setLocalData] = useState({});
  useEffect(() => {
    if (!(auth.isauth && auth.type === 1)) {
      history.push("/home");
    } else {
      doctorAppointmentsAPI({
        token: auth.token,
      }).then((res) => {
        if (res.reply) {
          var tmp1 = { dataSource: res.appointments };
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
      });
    }
  }, []);

  const onPopupOpen = (args) => {
    //console.log(args.data);
    //history.push("/home", {data: args.data});
  };

  return (
    <div id="calander">
      <div>
        <link
          href="//cdn.syncfusion.com/ej2/ej2-base/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-buttons/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-calendars/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-dropdowns/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-inputs/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-navigations/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-popups/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-schedule/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.js"></script>
        <script src="systemjs.config.js"></script>
      </div>
      {/* <ButtonComponent id='btn1' title='Click to open Editor' onClick={this.onClickButton1.bind(this)}>Click to open Editor</ButtonComponent> */}
      <ScheduleComponent
        width="100%"
        height="550px"
        currentView="Day"
        eventSettings={localData}
        readonly={true}
        popupOpen={onPopupOpen}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
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
