import { LOGIN_INFO } from "../types";

const intialState = {
  loginInfo: JSON.parse(localStorage.getItem("eb-mums-lunch:loginInfo")),
};

export const userInfoReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOGIN_INFO:     
      return {
        ...state,
        loginInfo: action.data
      };
    default:
      return {...state}
  }
};
