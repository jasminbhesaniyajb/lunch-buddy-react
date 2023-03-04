import { HOME_ORDER_NOW_INFO, HOME_ORDER_NOW_EVENT_INFO } from "../types";

const intialState = {
  homeOrderNowInfo: JSON.parse(localStorage.getItem("eb-mums-lunch:orderNowPassData")),
  homeOrderNowEventInfo: JSON.parse(localStorage.getItem("eb-mums-lunch:orderNowEventPassData")),
};

export const homeOrderNowReducer = (state = intialState, action) => {
  switch (action.type) {
    case HOME_ORDER_NOW_INFO:     
      return {
        ...state,
        homeOrderNowInfo: action.data
      };
    case HOME_ORDER_NOW_EVENT_INFO:
      return {
        ...state,
        homeOrderNowEventInfo: action.data 
      }
    default:
      return {...state}
  }
};
