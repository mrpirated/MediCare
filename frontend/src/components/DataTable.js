import React from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import moment from "moment";
export default function DataTable(props) {
	var idx = 1;
	const history = useHistory();

	return (
		<div>
			{console.log(props.data)}
			<Table responsive='sm'>
				<thead>
					<tr>
						{/* <th>#</th> */}
						<th>Open</th>
						{props.columns.map((column) => (
							<th>{column.title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{props.data.map((d) => {
						console.log(d);
						return (
							<tr>
								{/* <td>{idx++}</td> */}
								<td>
									<Button
										block
										variant='dark'
										size='sm'
										type='submit'
										id={d.appointment_id}
										onClick={(e) => {
											history.push(props.onclicklink, { id: e.target.id });
										}}
									>
										+
									</Button>
								</td>
								{Object.keys(d).map(function (key, index) {
									//console.log(d);
									if (
										key === "start_time" ||
										key === "end_time" ||
										key === "preffered_date"
									) {
										return <td>{moment(d[key]).format("hh:mm A")}</td>;
									} else return <td>{d[key]}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
