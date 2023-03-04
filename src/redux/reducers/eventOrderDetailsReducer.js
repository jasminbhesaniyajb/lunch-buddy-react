import { EVENT_ORDER_DETAILS_INFO, EVENTID_GRADEID_INFO } from "../types";

const intialState = {
  eventOrderDetailsInfo: JSON.parse(localStorage.getItem("eb-mums-lunch:eventDetailsPassData")),
  eventIdgradeIdInfo: JSON.parse(localStorage.getItem("eb-mums-lunch:eventIdgradeIdPassData")),
};

export const eventOrderDetailsReducer = (state = intialState, action) => {
  switch (action.type) {
    case EVENT_ORDER_DETAILS_INFO:     
      return {
        ...state,
        eventOrderDetailsInfo: action.data
      };
      case EVENTID_GRADEID_INFO:
      return {
        ...state,
        eventIdgradeIdInfo: action.data 
      }
    default:
      return {...state}
  }
};
