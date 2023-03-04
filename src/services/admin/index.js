import { serviceMaker, methods } from "../index";

export const FETCH_ALL_INQUERY = (payload) => serviceMaker(`/inquiries?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&onlyOpenInquiries=${payload.onlyOpenInquiries}&inquiryFromDate=${payload.inquiryFromDate}&inquiryToDate=${payload.inquiryToDate}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const UPDATE_SCHOOL = (payload) => serviceMaker(`/school-update`, methods.POST, payload);
export const UPDATE_PARENT = (payload) => serviceMaker(`/parent-update`, methods.POST, payload);
export const UPDATE_RESTAURANT = (payload) => serviceMaker(`/restaurant-update`, methods.POST, payload);
export const CLOSE_INQUIRY = (payload) => serviceMaker(`/close-inquiry`, methods.POST, payload);
export const GET_SETTING_LIST = () => serviceMaker(`/app-settings`, methods.GET);
export const UPDATE_SETTING = (payload) => serviceMaker(`/app-settings`, methods.POST, payload);
export const GET_ALL_MENU_CHANGE_REQUEST = (payload) => serviceMaker(`/fetch-menu-change-requests?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&requestFromDate=${payload.requestFromDate}&requestToDate=${payload.requestToDate}&showAllRequests=${payload.showAllRequests}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const ACKNOWLEDGE_CHANGE_REQUEST = (payload) => serviceMaker(`/acknowledge-change-request`, methods.POST, payload);

//Grades
export const GET_ALL_GRADES = (payload) => serviceMaker(`/fetch-grades?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_GRADE_BY_ID = (payload) => serviceMaker(`/grades/${payload}`, methods.GET);
export const ADD_GRADE = (payload) => serviceMaker(`/grade`, methods.POST, payload);
export const UPDATE_GRADE = (payload) => serviceMaker(`/grade`, methods.PUT, payload);
export const GRADE_IS_ACTIVE = (payload) => serviceMaker(`/grade-active-deactive`, methods.POST, payload);
export const DELETE_GRADE = (payload) => serviceMaker(`/grade-delete`, methods.POST, payload);
//Menu Type
export const GET_ALL_MENU_TYPES = (payload) => serviceMaker(`/fetch-menu-types?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_MENU_TYPE_BY_ID = (payload) => serviceMaker(`/menu-types/${payload}`, methods.GET);
export const ADD_MENU_TYPE = (payload) => serviceMaker(`/menu-type`, methods.POST, payload);
export const UPDATE_MENU_TYPE = (payload) => serviceMaker(`/menu-type`, methods.PUT, payload);
export const MENU_TYPE_IS_ACTIVE = (payload) => serviceMaker(`/menu-type-active-deactive`, methods.POST, payload);
export const DELETE_MENU_TYPE = (payload) => serviceMaker(`/menu-type-delete`, methods.POST, payload);
//Franchises
export const GET_ALL_FRANCHISES = (payload) => serviceMaker(`/fetch-franchises?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_FRANCHISE_BY_ID = (payload) => serviceMaker(`/franchises/${payload}`, methods.GET);
export const ADD_FRANCHISE = (payload) => serviceMaker(`/franchise`, methods.POST, payload);
export const UPDATE_FRANCHISE = (payload) => serviceMaker(`/franchise`, methods.PUT, payload);
export const FRANCHISE_IS_ACTIVE = (payload) => serviceMaker(`/franchise-active-deactive`, methods.POST, payload);
export const DELETE_FRANCHISE = (payload) => serviceMaker(`/franchise-delete`, methods.POST, payload);
//Allergens
export const GET_ALL_ALLERGENS = (payload) => serviceMaker(`/fetch-allergens?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_ALLERGEN_BY_ID = (payload) => serviceMaker(`/allergens/${payload}`, methods.GET);
export const ADD_ALLERGEN = (payload) => serviceMaker(`/allergen`, methods.POST, payload);
export const UPDATE_ALLERGEN = (payload) => serviceMaker(`/allergen`, methods.PUT, payload);
export const ALLERGEN_IS_ACTIVE = (payload) => serviceMaker(`/allergen-active-deactive`, methods.POST, payload);
export const DELETE_ALLERGEN = (payload) => serviceMaker(`/allergen-delete`, methods.POST, payload);
//Nutritional terms
export const GET_ALL_NUTRITIONAL_TERMS = (payload) => serviceMaker(`/fetch-nutritional-terms?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_NUTRITIONAL_TERM_BY_ID = (payload) => serviceMaker(`/nutritional-terms/${payload}`, methods.GET);
export const ADD_NUTRITIONAL_TERM = (payload) => serviceMaker(`/nutritional-term`, methods.POST, payload);
export const UPDATE_NUTRITIONAL_TERM = (payload) => serviceMaker(`/nutritional-term`, methods.PUT, payload);
export const NUTRITIONAL_TERM_IS_ACTIVE = (payload) => serviceMaker(`/nutritional-term-active-deactive`, methods.POST, payload);
export const DELETE_NUTRITIONAL_TERM = (payload) => serviceMaker(`/nutritional-term-delete`, methods.POST, payload);
//Payment Frequency
export const GET_ALL_PAYMENT_FREQUENCY = (payload) => serviceMaker(`/fetch-payment-frequencies?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_PAYMENT_FREQUENCY_BY_ID = (payload) => serviceMaker(`/payment-frequencies/${payload}`, methods.GET);
export const ADD_PAYMENT_FREQUENCY = (payload) => serviceMaker(`/payment-frequency`, methods.POST, payload);
export const UPDATE_PAYMENT_FREQUENCY = (payload) => serviceMaker(`/payment-frequency`, methods.PUT, payload);
export const PAYMENT_FREQUENCY_IS_ACTIVE = (payload) => serviceMaker(`/payment-frequency-active-deactive`, methods.POST, payload);
export const DELETE_PAYMENT_FREQUENCY = (payload) => serviceMaker(`/payment-frequency-delete`, methods.POST, payload);
//Payment Methods
export const GET_ALL_PAYMENT_METHODS = (payload) => serviceMaker(`/fetch-payment-methods?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_PAYMENT_METHOD_BY_ID = (payload) => serviceMaker(`/payment-methods/${payload}`, methods.GET);
export const ADD_PAYMENT_METHOD = (payload) => serviceMaker(`/payment-method`, methods.POST, payload);
export const UPDATE_PAYMENT_METHOD = (payload) => serviceMaker(`/payment-method`, methods.PUT, payload);
export const PAYMENT_METHOD_IS_ACTIVE = (payload) => serviceMaker(`/payment-method-active-deactive`, methods.POST, payload);
export const DELETE_PAYMENT_METHOD = (payload) => serviceMaker(`/payment-method-delete`, methods.POST, payload);
//Provinces
export const GET_ALL_PROVINCES = (payload) => serviceMaker(`/fetch-provinces?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_PROVINCE_BY_ID = (payload) => serviceMaker(`/provinces/${payload}`, methods.GET);
export const ADD_PROVINCE = (payload) => serviceMaker(`/province`, methods.POST, payload);
export const UPDATE_PROVINCE = (payload) => serviceMaker(`/province`, methods.PUT, payload);
export const PROVINCE_IS_ACTIVE = (payload) => serviceMaker(`/province-active-deactive`, methods.POST, payload);
export const DELETE_PROVINCE = (payload) => serviceMaker(`/province-delete`, methods.POST, payload);
//Cities
export const GET_ALL_CITIES = (payload) => serviceMaker(`/fetch-cities?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_CITY_BY_ID = (payload) => serviceMaker(`/cities/${payload}`, methods.GET);
export const ADD_CITY = (payload) => serviceMaker(`/city`, methods.POST, payload);
export const UPDATE_CITY = (payload) => serviceMaker(`/city`, methods.PUT, payload);
export const CITY_IS_ACTIVE = (payload) => serviceMaker(`/city-active-deactive`, methods.POST, payload);
export const DELETE_CITY = (payload) => serviceMaker(`/city-delete`, methods.POST, payload);

export const GET_ALL_GRADE_DIVISIONS = (payload) => serviceMaker(`/fetch-grade-divisions?schoolName=${payload.schoolName}`, methods.GET);

export const GET_IMAGE = (payload) => serviceMaker(`${payload}`, methods.GET_IMAGE);
export const GET_ALL_RESTAURANT_PAYMENT_DUES = (payload) => serviceMaker(`/restaurant-payment-dues?restaurant_name=${payload.restaurant_name}`, methods.GET);
export const ADD_RESTAURANT_DUES = (payload) => serviceMaker(`/clear-restaurant-dues`, methods.POST, payload);
export const GET_ALL_RESTAURANT_PAYMENT_HISTORY = (payload) => serviceMaker(`/restaurant-payment-histroy?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&restaurant_name=${payload.restaurant_name}&payment_from=${payload.payment_from}&payment_to=${payload.payment_to}`, methods.GET);
export const GET_ADMIN_EVENT_ORDERS = (payload) => serviceMaker(`/event-orders/${payload.eventId}?id_vendor=${payload.vendorId}`, methods.GET);
export const GET_ADMIN_EVENT_ORDERS_BY_GRADE = (payload) => serviceMaker(`/event-orders-by-grade?eventId=${payload.eventId}&gradeId=${payload.gradeId}&id_vendor=${payload.id_vendor}`, methods.GET, payload);
export const GET_ADMIN_EVENT_ORDER_LABELS = (payload) => serviceMaker(`/event-order-labels?eventId=${payload.eventId}&gradeId=${payload.gradeId}&id_vendor=${payload.id_vendor}`, methods.GET, payload);
