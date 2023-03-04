import { ADD_TO_CART_INFO } from "../types";

const intialState = {
  cartInfo: localStorage.getItem("eb-mums-lunch:cartItemTotal"),
};

export const cartReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_INFO:     
      return {
        ...state,
        cartInfo: action.data
      };
    default:
      return {...state}
  }
};
