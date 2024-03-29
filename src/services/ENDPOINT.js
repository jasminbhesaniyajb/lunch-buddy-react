import {
  PARENT_REGISTER,
  SCHOOL_REGISTER,
  RESTAURANT_REGISTER,
  CHECK_USERNAME_EMAIL,
  LOGIN,
  VERIFY_USER,
  GET_CITY,
  GET_PROVINCE,
  GET_RESTAURANT,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  RECOVER_PASSWORD,
  SAVE_INQUERY,
  SOCIAL_LOGIN
} from "./auth";
import { GET_USERS, GET_USERS_BY_BLOG, DELETE_USERS_BY_ID } from "./dashboard";
import {
  GET_PARENT_STUDENT_LIST,
  ADD_PARENT_STUDENT,
  UPDATE_PARENT_STUDENT,
  GET_PARENT_STUDENT_BY_ID,
  GET_SCHOOL_DROPDOWN_LIST,
  UPDATE_PARENT_PROFILE,
  GET_SCHOOL_GRADE_DROPDOWN_LIST,
  GET_PARENT_STUDENT_EVENT_LIST,
  DELETE_PARENT_STUDENT,
  GET_ALL_PAST_ORDERS,
  ADD_ORDER_NOW,
  CANCEL_ORDER_NOW,
  ADD_TO_CART,
  GET_CART_BY_ID,
  REMOVE_CART_ITEMS,
  UPDATE_CART_ITEM_QTY,
  UPDATE_CART_TOPPING_ITEM_QTY,
  GET_ORDER_BY_ID,
  GET_STUDENT_ALLERGENS,
  EVENT_DETAIL,
  STRIPE_CREATE_ORDER,
  CHECK_STRIPE_ORDER_STATUS
} from "./parent";
import {
  UPDATE_RESTAURANT_PROFILE,
  GET_MANAGAE_MENU_LIST,
  GET_ALLERGENS_LIST,
  GET_NUTRITIONAL_LIST,
  GET_TOPPING_LIST,
  GET_PRODUCT_CATEGORY_LIST,
  ADD_RESTAURANT_MENU_ITEM,
  GET_RESTAURANT_MENU_ITEM_BY_ID,
  UPDATE_RESTAURANT_MENU_ITEM,
  GET_MENU_APPROVE_LIST,
  RESTAURANT_MENU_IS_APPROVED,
  DELETE_MENU_ITEM,
  SUBMIT_MENU_APPROVAL,
  GET_PAYMENT_FREQUENCY,
  GET_ALL_RESTAURANT_PAST_EVENTS,
  GET_ALL_RESTAURANT_UPCOMING_EVENTS,
  GET_RESTAURANT_PREVIEW_MENU,
  SUBMIT_EVENT_FOR_APPROVAL,
  MENU_ITEM_IS_ACTIVE,
  REJECT_EVENT,
  SUBMIT_MENU_CHANGE_REQUEST,
  GET_EVENT_ORDERS,
  GET_EVENT_ORDERS_BY_GRADE,
  GET_EVENT_ORDER_LABELS,
  ADD_IMAGE,
  DELETE_IMAGE
} from "./restaurant";
import {
  GET_SCHOOL_LIST,
  GET_PARENT_LIST,
  GET_RESTAURANT_LIST,
  PARENT_IS_ACTIVE,
  PARENT_IS_APPROVED,
  PARENT_ACCOUNT_IS_VERIFIED,
  SCHOOL_IS_ACTIVE,
  SCHOOL_IS_APPROVED,
  SCHOOL_ACCOUNT_IS_VERIFIED,
  RESTAURANT_IS_ACTIVE,
  RESTAURANT_IS_APPROVED,
  RESTAURANT_ACCOUNT_IS_VERIFIED,
  GET_ADMIN_PROFILE,
  GET_ERROR_LIST,
  GET_ERROR_DETAIL_BY_ID,
  UPDATE_SCHOOL_PROFILE,
  GET_SCHOOL_STUDENT_LIST,
  STUDENT_IS_APPROVED,
  GET_ALL_STUDENT,
  STUDENT_IS_ACTIVE,
  GET_PARENT_BY_ID,
  GET_SCHOOL_BY_ID,
  GET_RESTAURANT_BY_ID,
  GET_SCHOOL_RESTAURANT_LIST,
  GET_RESTAURANT_MENU_ID,
  GET_ALL_PAST_EVENTS,
  GET_ALL_UPCOMING_EVENTS,
  ADD_SCHOOL_EVENT,
  GET_EVENT_BY_ID,
  UPDATE_SCHOOL_EVENT,
  DELETE_SCHOOL_EVENT,
  SUBMIT_EVENT_FOR_RESTAURANT_APPROVAL,
  GET_TEACHER_LIST,
  GET_TEACHER_BY_ID,
  ADD_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER,
  TEACHER_IS_ACTIVE,
  GET_ALL_GRADES_LIST,
  GET_ALL_SCHOOL_GRADES,
  ADD_MANAGE_SCHOOL_GRADES,
  ADD_MANAGE_SCHOOL_GRADE_DIVISION,
  SCHOOL_GRADES_IS_ACTIVE,
  DELETE_SCHOOL_GRADE,
  FETCH_TEACHERS_LIST,
  FETCH_SCHOOL_GRADE_DIVISION_BY_GRADE_ID,
  GET_ALL_STUDENT_GRADE_PROMOTION,
  ADD_STUDENT_GRADE_PROMOTION,
  EVENT_FEEDBACK,
  SCHOOL_EVENT_DETAIL,
  GET_RESTAURANT_REVIEWS
} from "./school";

import {
  FETCH_ALL_INQUERY,
  UPDATE_PARENT,
  UPDATE_SCHOOL,
  UPDATE_RESTAURANT,
  CLOSE_INQUIRY,
  GET_SETTING_LIST,
  UPDATE_SETTING,
  GET_ALL_MENU_CHANGE_REQUEST,
  ACKNOWLEDGE_CHANGE_REQUEST,
  GET_ALL_GRADES,
  GET_GRADE_BY_ID,
  ADD_GRADE,
  UPDATE_GRADE,
  GRADE_IS_ACTIVE,
  GET_ALL_MENU_TYPES,
  GET_MENU_TYPE_BY_ID,
  ADD_MENU_TYPE,
  UPDATE_MENU_TYPE,
  MENU_TYPE_IS_ACTIVE,
  GET_ALL_FRANCHISES,
  GET_FRANCHISE_BY_ID,
  ADD_FRANCHISE,
  UPDATE_FRANCHISE,
  FRANCHISE_IS_ACTIVE,
  GET_ALL_ALLERGENS,
  GET_ALLERGEN_BY_ID,
  ADD_ALLERGEN,
  UPDATE_ALLERGEN,
  ALLERGEN_IS_ACTIVE,
  GET_ALL_NUTRITIONAL_TERMS,
  GET_NUTRITIONAL_TERM_BY_ID,
  ADD_NUTRITIONAL_TERM,
  UPDATE_NUTRITIONAL_TERM,
  NUTRITIONAL_TERM_IS_ACTIVE,
  GET_ALL_PAYMENT_FREQUENCY,
  GET_PAYMENT_FREQUENCY_BY_ID,
  ADD_PAYMENT_FREQUENCY,
  UPDATE_PAYMENT_FREQUENCY,
  PAYMENT_FREQUENCY_IS_ACTIVE,
  GET_ALL_PAYMENT_METHODS,
  GET_PAYMENT_METHOD_BY_ID,
  ADD_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD,
  PAYMENT_METHOD_IS_ACTIVE,
  GET_ALL_PROVINCES,
  GET_PROVINCE_BY_ID,
  ADD_PROVINCE,
  UPDATE_PROVINCE,
  PROVINCE_IS_ACTIVE,
  GET_ALL_CITIES,
  GET_CITY_BY_ID,
  ADD_CITY,
  UPDATE_CITY,
  CITY_IS_ACTIVE,
  DELETE_GRADE,
  DELETE_MENU_TYPE,
  DELETE_FRANCHISE,
  DELETE_ALLERGEN,
  DELETE_NUTRITIONAL_TERM,
  DELETE_PAYMENT_FREQUENCY,
  DELETE_PAYMENT_METHOD,
  DELETE_PROVINCE,
  DELETE_CITY,
  GET_ALL_GRADE_DIVISIONS,
  GET_IMAGE,
  GET_ALL_RESTAURANT_PAYMENT_DUES,
  ADD_RESTAURANT_DUES,
  GET_ALL_RESTAURANT_PAYMENT_HISTORY,
  GET_ADMIN_EVENT_ORDERS,
  GET_ADMIN_EVENT_ORDERS_BY_GRADE,
  GET_ADMIN_EVENT_ORDER_LABELS
} from "./admin/index";
import{
  GET_TEACHER_EVENT_LIST,
  ADD_SCHOOL_GRADE_DIVISION
} from "./teacher/index";

export {
  GET_USERS,
  GET_USERS_BY_BLOG,
  DELETE_USERS_BY_ID,
  PARENT_REGISTER,
  SCHOOL_REGISTER,
  RESTAURANT_REGISTER,
  CHECK_USERNAME_EMAIL,
  LOGIN,
  VERIFY_USER,
  GET_CITY,
  GET_PROVINCE,
  GET_RESTAURANT,
  GET_SCHOOL_LIST,
  GET_PARENT_LIST,
  GET_RESTAURANT_LIST,
  PARENT_IS_ACTIVE,
  PARENT_IS_APPROVED,
  PARENT_ACCOUNT_IS_VERIFIED,
  SCHOOL_IS_ACTIVE,
  SCHOOL_IS_APPROVED,
  SCHOOL_ACCOUNT_IS_VERIFIED,
  RESTAURANT_IS_ACTIVE,
  RESTAURANT_IS_APPROVED,
  RESTAURANT_ACCOUNT_IS_VERIFIED,
  GET_ADMIN_PROFILE,
  GET_PARENT_STUDENT_LIST,
  ADD_PARENT_STUDENT,
  UPDATE_PARENT_STUDENT,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  RECOVER_PASSWORD,
  GET_SCHOOL_DROPDOWN_LIST,
  GET_PARENT_STUDENT_BY_ID,
  GET_ERROR_LIST,
  GET_ERROR_DETAIL_BY_ID,
  SAVE_INQUERY,
  FETCH_ALL_INQUERY,
  UPDATE_PARENT_PROFILE,
  UPDATE_SCHOOL_PROFILE,
  UPDATE_RESTAURANT_PROFILE,
  GET_SCHOOL_GRADE_DROPDOWN_LIST,
  GET_SCHOOL_STUDENT_LIST,
  STUDENT_IS_APPROVED,
  GET_ALL_STUDENT,
  STUDENT_IS_ACTIVE,
  GET_PARENT_BY_ID,
  GET_SCHOOL_BY_ID,
  GET_RESTAURANT_BY_ID,
  UPDATE_PARENT,
  UPDATE_SCHOOL,
  UPDATE_RESTAURANT,
  CLOSE_INQUIRY,
  GET_SETTING_LIST,
  UPDATE_SETTING,
  GET_MANAGAE_MENU_LIST,
  GET_ALLERGENS_LIST,
  GET_NUTRITIONAL_LIST,
  GET_TOPPING_LIST,
  GET_PRODUCT_CATEGORY_LIST,
  ADD_RESTAURANT_MENU_ITEM,
  GET_RESTAURANT_MENU_ITEM_BY_ID,
  UPDATE_RESTAURANT_MENU_ITEM,
  GET_MENU_APPROVE_LIST,
  RESTAURANT_MENU_IS_APPROVED,
  DELETE_MENU_ITEM,
  SUBMIT_MENU_APPROVAL,
  GET_SCHOOL_RESTAURANT_LIST,
  GET_RESTAURANT_MENU_ID,
  GET_ALL_PAST_EVENTS,
  GET_ALL_UPCOMING_EVENTS,
  GET_PAYMENT_FREQUENCY,
  ADD_SCHOOL_EVENT,
  GET_ALL_RESTAURANT_PAST_EVENTS,
  GET_ALL_RESTAURANT_UPCOMING_EVENTS,
  GET_EVENT_BY_ID,
  UPDATE_SCHOOL_EVENT,
  DELETE_SCHOOL_EVENT,
  SUBMIT_EVENT_FOR_RESTAURANT_APPROVAL,
  GET_RESTAURANT_PREVIEW_MENU,
  SUBMIT_EVENT_FOR_APPROVAL,
  GET_PARENT_STUDENT_EVENT_LIST,
  DELETE_PARENT_STUDENT,
  MENU_ITEM_IS_ACTIVE,
  REJECT_EVENT,
  GET_ALL_PAST_ORDERS,
  ADD_ORDER_NOW,
  CANCEL_ORDER_NOW,
  ADD_TO_CART,
  GET_CART_BY_ID,
  REMOVE_CART_ITEMS,
  UPDATE_CART_ITEM_QTY,
  UPDATE_CART_TOPPING_ITEM_QTY,
  GET_ORDER_BY_ID,
  GET_STUDENT_ALLERGENS,
  SUBMIT_MENU_CHANGE_REQUEST,
  GET_ALL_MENU_CHANGE_REQUEST,
  ACKNOWLEDGE_CHANGE_REQUEST,
  GET_EVENT_ORDERS,
  GET_EVENT_ORDERS_BY_GRADE,
  GET_EVENT_ORDER_LABELS,
  GET_TEACHER_LIST,
  GET_TEACHER_BY_ID,
  ADD_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER,
  TEACHER_IS_ACTIVE,
  GET_ALL_GRADES,
  GET_GRADE_BY_ID,
  ADD_GRADE,
  UPDATE_GRADE,
  GRADE_IS_ACTIVE,
  GET_ALL_MENU_TYPES,
  GET_MENU_TYPE_BY_ID,
  ADD_MENU_TYPE,
  UPDATE_MENU_TYPE,
  MENU_TYPE_IS_ACTIVE,
  GET_ALL_FRANCHISES,
  GET_FRANCHISE_BY_ID,
  ADD_FRANCHISE,
  UPDATE_FRANCHISE,
  FRANCHISE_IS_ACTIVE,
  GET_ALL_ALLERGENS,
  GET_ALLERGEN_BY_ID,
  ADD_ALLERGEN,
  UPDATE_ALLERGEN,
  ALLERGEN_IS_ACTIVE,
  GET_ALL_NUTRITIONAL_TERMS,
  GET_NUTRITIONAL_TERM_BY_ID,
  ADD_NUTRITIONAL_TERM,
  UPDATE_NUTRITIONAL_TERM,
  NUTRITIONAL_TERM_IS_ACTIVE,
  GET_ALL_PAYMENT_FREQUENCY,
  GET_PAYMENT_FREQUENCY_BY_ID,
  ADD_PAYMENT_FREQUENCY,
  UPDATE_PAYMENT_FREQUENCY,
  PAYMENT_FREQUENCY_IS_ACTIVE,
  GET_ALL_PAYMENT_METHODS,
  GET_PAYMENT_METHOD_BY_ID,
  ADD_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD,
  PAYMENT_METHOD_IS_ACTIVE,
  GET_ALL_PROVINCES,
  GET_PROVINCE_BY_ID,
  ADD_PROVINCE,
  UPDATE_PROVINCE,
  PROVINCE_IS_ACTIVE,
  GET_ALL_CITIES,
  GET_CITY_BY_ID,
  ADD_CITY,
  UPDATE_CITY,
  CITY_IS_ACTIVE,
  DELETE_GRADE,
  DELETE_MENU_TYPE,
  DELETE_FRANCHISE,
  DELETE_ALLERGEN,
  DELETE_NUTRITIONAL_TERM,
  DELETE_PAYMENT_FREQUENCY,
  DELETE_PAYMENT_METHOD,
  DELETE_PROVINCE,
  DELETE_CITY,
  GET_ALL_GRADES_LIST,
  GET_ALL_SCHOOL_GRADES,
  ADD_MANAGE_SCHOOL_GRADES,
  ADD_MANAGE_SCHOOL_GRADE_DIVISION,
  SCHOOL_GRADES_IS_ACTIVE,
  DELETE_SCHOOL_GRADE,
  FETCH_TEACHERS_LIST,
  GET_TEACHER_EVENT_LIST,
  GET_ALL_GRADE_DIVISIONS,
  FETCH_SCHOOL_GRADE_DIVISION_BY_GRADE_ID,
  GET_ALL_STUDENT_GRADE_PROMOTION,
  ADD_STUDENT_GRADE_PROMOTION,
  ADD_SCHOOL_GRADE_DIVISION,
  EVENT_FEEDBACK,
  SCHOOL_EVENT_DETAIL,
  EVENT_DETAIL,
  GET_RESTAURANT_REVIEWS,
  SOCIAL_LOGIN,
  ADD_IMAGE,
  GET_IMAGE,
  DELETE_IMAGE,
  GET_ALL_RESTAURANT_PAYMENT_DUES,
  ADD_RESTAURANT_DUES,
  GET_ALL_RESTAURANT_PAYMENT_HISTORY,
  GET_ADMIN_EVENT_ORDERS,
  GET_ADMIN_EVENT_ORDERS_BY_GRADE,
  GET_ADMIN_EVENT_ORDER_LABELS,
  STRIPE_CREATE_ORDER,
  CHECK_STRIPE_ORDER_STATUS
};
