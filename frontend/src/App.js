import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./store/auth";
import { IonLoading } from "@ionic/react";
import "./App.css";
function App() {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.isloading);
	dispatch(setLoading({ loading: true }));

	return (
		<div className='App'>
			<IonLoading
				cssClass='my-custom-class'
				isOpen={loading}
				message={"Please wait..."}
				spinner={"circles"}
			/>
		</div>
	);
}

export default App;
