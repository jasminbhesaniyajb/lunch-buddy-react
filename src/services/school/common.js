import { serviceMaker, methods } from "../index";

export const GET_SCHOOL_LIST = (payload) => serviceMaker(`/school-list?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&schoolName=${payload.schoolName}&provinceId=${payload.provinceId}&cityId=${payload.cityId}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_PARENT_LIST = (payload) => serviceMaker(`/parent-list?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&parentName=${payload.parentName}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_RESTAURANT_LIST = (payload) => serviceMaker(`/restaurants-list?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&restaurantName=${payload.restaurantName}&provinceId=${payload.provinceId}&cityId=${payload.cityId}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const PARENT_IS_ACTIVE = (payload) => serviceMaker(`/account-activate-deactivate`, methods.POST, payload);
export const PARENT_IS_APPROVED = (payload) => serviceMaker(`/account-appove-disappove`, methods.POST, payload);
export const PARENT_ACCOUNT_IS_VERIFIED = (payload) => serviceMaker(`/account-email-verify`, methods.POST, payload);
export const SCHOOL_IS_ACTIVE = (payload) => serviceMaker(`/account-activate-deactivate`, methods.POST, payload);
export const SCHOOL_IS_APPROVED = (payload) => serviceMaker(`/account-appove-disappove`, methods.POST, payload);
export const SCHOOL_ACCOUNT_IS_VERIFIED = (payload) => serviceMaker(`/account-email-verify`, methods.POST, payload);
export const RESTAURANT_IS_ACTIVE = (payload) => serviceMaker(`/account-activate-deactivate`, methods.POST, payload);
export const RESTAURANT_IS_APPROVED = (payload) => serviceMaker(`/account-appove-disappove`, methods.POST, payload);
export const RESTAURANT_ACCOUNT_IS_VERIFIED = (payload) => serviceMaker(`/account-email-verify`, methods.POST, payload);
export const GET_ADMIN_PROFILE = () => serviceMaker(`/get-profile`, methods.GET);
export const GET_ERROR_LIST = (payload) => serviceMaker(`/get-errors?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&errorFromDate=${payload.errorFromDate}&errorToDate=${payload.errorToDate}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_ERROR_DETAIL_BY_ID = (payload) => serviceMaker(`get-error/${payload}`, methods.GET);
export const UPDATE_SCHOOL_PROFILE = (payload) => serviceMaker(`/school-update-profile`, methods.POST, payload);
export const GET_SCHOOL_STUDENT_LIST = (payload) => serviceMaker(`/fetch-student-by-school?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const STUDENT_IS_APPROVED = (payload) => serviceMaker(`/student-appove-disappove`, methods.POST, payload);
export const GET_ALL_STUDENT = (payload) => serviceMaker(`/fetch-all-student?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&studentName=${payload.studentName}&schoolName=${payload.schoolName}&provinceId=${payload.provinceId}&cityId=${payload.cityId}&gradeDivisionId=${payload.gradeDivisionId}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const STUDENT_IS_ACTIVE = (payload) => serviceMaker(`/student-active-deactive`, methods.POST, payload);
export const GET_PARENT_BY_ID = (payload) => serviceMaker(`/parent/${payload}`, methods.GET);
export const GET_SCHOOL_BY_ID = (payload) => serviceMaker(`/school/${payload}`, methods.GET);
export const GET_RESTAURANT_BY_ID = (payload) => serviceMaker(`/restaurant/${payload}`, methods.GET);
export const GET_SCHOOL_RESTAURANT_LIST = (payload) => serviceMaker(`/restaurants-list?orderBy=${payload.orderBy}&sortBy=${payload.sortBy}&restaurantName=${payload.restaurantName}&provinceId=${payload.provinceId}&cityId=${payload.cityId}`, methods.GET);
export const GET_RESTAURANT_MENU_ID = (payload) => serviceMaker(`/restaurant-menu?id_vendor=${payload.id_vendor}&eventId=${payload.eventId}`, methods.GET);
export const GET_ALL_PAST_EVENTS = (payload) => serviceMaker(`/events?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&schoolId=${payload.schoolId}&scheduleEndDate=${payload.scheduleEndDate}&scheduleStartDate=${payload.scheduleStartDate}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_ALL_UPCOMING_EVENTS = (payload) => serviceMaker(`/events?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&schoolId=${payload.schoolId}&scheduleStartDate=${payload.scheduleStartDate}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const ADD_SCHOOL_EVENT = (payload) => serviceMaker(`/events`, methods.POST, payload);
export const GET_EVENT_BY_ID = (payload) => serviceMaker(`/events/${payload}`, methods.GET);
export const UPDATE_SCHOOL_EVENT = (payload) => serviceMaker(`/events`, methods.PUT, payload);
export const DELETE_SCHOOL_EVENT = (payload) => serviceMaker(`/delete-school-event`, methods.POST, payload);
export const SUBMIT_EVENT_FOR_RESTAURANT_APPROVAL = (payload) => serviceMaker(`/submit-for-acceptance`, methods.POST, payload);
export const GET_TEACHER_LIST = (payload) => serviceMaker(`/teachers?currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}&schoolId=${payload.schoolId}&teacherName=${payload.teacherName}&orderBy=${payload.orderBy}&sortBy=${payload.sortBy}`, methods.GET);
export const GET_TEACHER_BY_ID = (payload) => serviceMaker(`/teachers/${payload}`, methods.GET);
export const ADD_TEACHER = (payload) => serviceMaker(`/teachers`, methods.POST, payload);
export const UPDATE_TEACHER = (payload) => serviceMaker(`/teachers`, methods.PUT, payload);
export const DELETE_TEACHER = (payload) => serviceMaker(`/delete-teacher`, methods.POST, payload);
export const TEACHER_IS_ACTIVE = (payload) => serviceMaker(`/teacher-active-deactive`, methods.POST, payload);
export const GET_ALL_GRADES_LIST = () => serviceMaker(`/grades`, methods.GET);
export const GET_ALL_SCHOOL_GRADES = (payload) => serviceMaker(`/school-grades?schoolId=${payload.schoolId}`, methods.GET);
export const ADD_MANAGE_SCHOOL_GRADES = (payload) => serviceMaker(`/school-grades`, methods.POST, payload);
export const ADD_MANAGE_SCHOOL_GRADE_DIVISION = (payload) => serviceMaker(`/grade-divisions`, methods.POST, payload);
export const SCHOOL_GRADES_IS_ACTIVE = (payload) => serviceMaker(`/grade-division-active-deactive`, methods.POST, payload);
export const DELETE_SCHOOL_GRADE = (payload) => serviceMaker(`/grade-division-delete`, methods.POST, payload);
export const FETCH_TEACHERS_LIST = (payload) => serviceMaker(`/dropdown-teachers?id_school=${payload.schoolId}`, methods.GET);
export const FETCH_SCHOOL_GRADE_DIVISION_BY_GRADE_ID = (payload) => serviceMaker(`/grade-divisions?schoolId=${payload.schoolId}&gradeId=${payload.gradeId}`, methods.GET);
export const GET_ALL_STUDENT_GRADE_PROMOTION = (payload) => serviceMaker(`/student-grade-promotion?schoolId=${payload.schoolId}&gradeDivisonId=${payload.gradeDivisonId}`, methods.GET);
export const ADD_STUDENT_GRADE_PROMOTION = (payload) => serviceMaker(`/student-grade-promotion`, methods.POST, payload);
export const EVENT_FEEDBACK = (payload) => serviceMaker(`event-feedback`, methods.POST, payload);
export const SCHOOL_EVENT_DETAIL = (payload) => serviceMaker(`event-details?eventId=${payload}`, methods.GET);
export const GET_RESTAURANT_REVIEWS = (payload) => serviceMaker(`restaurant-review?vendorId=${payload.vendorId}&currentPage=${payload.currentPage}&perPageRows=${payload.perPageRows}`, methods.GET);
// export const GET_SHOOL_RESTAURANT_LIST = () => serviceMaker(`/restaurants-list?restaurantName=${payload.restaurantName}&provinceId=${payload.provinceId}&cityId=${payload.cityId}`, methods.GET);