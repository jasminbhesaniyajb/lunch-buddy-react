import { serviceMaker, methods } from "./index";

export const PARENT_REGISTER = (payload) => serviceMaker(`/parent-register`, methods.POST, payload);
export const SCHOOL_REGISTER = (payload) => serviceMaker(`/school-register`, methods.POST, payload);
export const RESTAURANT_REGISTER = (payload) => serviceMaker(`/restaurant-register`, methods.POST, payload);
export const CHECK_USERNAME_EMAIL = (payload) => serviceMaker(`/checkUser`, methods.POST, payload);
export const LOGIN = (payload) => serviceMaker(`/login`, methods.POST, payload);
export const VERIFY_USER = (payload) => serviceMaker(`/verify-account`, methods.POST, payload);
export const GET_CITY = (payload) => serviceMaker(`/cities?id_province=${payload}`, methods.GET);
export const GET_PROVINCE = () => serviceMaker(`/provinces`, methods.GET);
export const GET_RESTAURANT = () => serviceMaker(`/dropdown-restaurant`, methods.GET);
export const FORGOT_PASSWORD = (payload) => serviceMaker(`/forgot-password`, methods.POST, payload);
export const CHANGE_PASSWORD = (payload) => serviceMaker(`/change-password`, methods.POST, payload);
export const RECOVER_PASSWORD = (payload) => serviceMaker(`/recover-password`, methods.POST, payload);
export const SOCIAL_LOGIN = (payload) => serviceMaker(`/authenticate-social-signin`, methods.POST, payload);
export const SAVE_INQUERY = (payload) => serviceMaker(`/inquiry`, methods.POST, payload);