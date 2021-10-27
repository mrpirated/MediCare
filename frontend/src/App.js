import "./App.css";
import { useDispatch } from "react-redux";
import { setLoading } from "./store/auth";
function App() {
	const dispatch = useDispatch();
	dispatch(setLoading({ loading: true }));
	return <div className='App'>Hello</div>;
}

export default App;
