import { serviceMaker, methods } from "../index";

export const GET_PARENT_STUDENT_LIST = (payload) =>
  serviceMaker(
    `/fetch-student-by-parent?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`,
    methods.GET
  );
export const ADD_PARENT_STUDENT = (payload) =>
  serviceMaker(`/add-student`, methods.POST, payload);
export const UPDATE_PARENT_STUDENT = (payload) =>
  serviceMaker(`/update-student`, methods.POST, payload);
export const GET_SCHOOL_DROPDOWN_LIST = () =>
  serviceMaker(`/fetch-schools-dropdown`, methods.GET);
export const GET_PARENT_STUDENT_BY_ID = (payload) =>
  serviceMaker(`/fetch-student/${payload}`, methods.GET);
export const UPDATE_PARENT_PROFILE = (payload) =>
  serviceMaker(`/parent-update-profile`, methods.POST, payload);
export const GET_SCHOOL_GRADE_DROPDOWN_LIST = (payload) =>
  serviceMaker(`fetch-grades-by-school-id?id_school=${payload}`, methods.GET);
export const GET_PARENT_STUDENT_EVENT_LIST = (payload) =>
  serviceMaker(`/student-events?parentId=${payload}`, methods.GET);
export const DELETE_PARENT_STUDENT = (payload) =>
  serviceMaker(`/delete-student`, methods.POST, payload);
export const GET_ALL_PAST_ORDERS = (payload) =>
  serviceMaker(
    `/orders?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&parentId=${payload.parentId}&eventId=${payload.eventId}&vendorId=${payload.vendorId}&orderStartDate=${payload.orderStartDate}&orderEndDate=${payload.orderEndDate}&cancelledOrder=${payload.cancelledOrder}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`,
    methods.GET
  );
export const ADD_ORDER_NOW = (payload) =>
  serviceMaker(`/orders`, methods.POST, payload);
export const CANCEL_ORDER_NOW = (payload) =>
  serviceMaker(`/cancel-order`, methods.POST, payload);
export const ADD_TO_CART = (payload) =>
  serviceMaker(`/add-to-cart`, methods.POST, payload);
export const GET_CART_BY_ID = (payload) =>
  serviceMaker(`/get-cart-items?parentId=${payload}`, methods.GET);
export const REMOVE_CART_ITEMS = (payload) =>
  serviceMaker(`/remove-cart-items`, methods.POST, payload);
export const UPDATE_CART_ITEM_QTY = (payload) =>
  serviceMaker(`/update-cart-item-qty`, methods.POST, payload);
export const UPDATE_CART_TOPPING_ITEM_QTY = (payload) =>
  serviceMaker(`/update-cart-topping-item-qty`, methods.POST, payload);
export const GET_ORDER_BY_ID = (payload) => 
  serviceMaker(`/orders/${payload}`, methods.GET);
export const GET_STUDENT_ALLERGENS = (payload) =>
  serviceMaker(`/fetch-student-allergens?studentId=${payload}`, methods.GET);
export const EVENT_DETAIL = (payload) => 
  serviceMaker(`event-details?orderId=${payload}`, methods.GET);
  
export const STRIPE_CREATE_ORDER = (payload) => 
  serviceMaker(`/stripe-create-order`, methods.POST, payload);

export const CHECK_STRIPE_ORDER_STATUS = (payload) => 
  serviceMaker(`/check-stripe-order-status`, methods.POST, payload);