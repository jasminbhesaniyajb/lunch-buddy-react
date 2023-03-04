import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { contactReducer } from "./contactReducer";
import { userInfoReducer } from "./userInfoReducer";
import { homeOrderNowReducer } from "./homeOrderNowReducer";
import { eventOrderDetailsReducer } from "./eventOrderDetailsReducer";

export default combineReducers({
  contact: contactReducer,
  loginInfo: userInfoReducer,
  cartInfo: cartReducer,
  homeOrderNowInfo: homeOrderNowReducer,
  eventOrderDetailsInfo: eventOrderDetailsReducer,
});
