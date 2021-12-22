import { combineReducers } from "redux";
import authReducer from "./auth";
import videoReducer from "./video";
export default combineReducers({
	auth: authReducer,
	video: videoReducer,
});
