import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//import App from "./App";
import App from "./App";
import store from "./store/configureStore";

store.subscribe(() => {
	console.log("Store changed!");
	console.log(store.getState());
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
