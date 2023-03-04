import { serviceMaker, methods } from "../index";

export const GET_TEACHER_EVENT_LIST = () => serviceMaker(`/teacher-events`, methods.GET);
export const ADD_SCHOOL_GRADE_DIVISION = (payload) => serviceMaker(`/school-grade-division`, methods.POST, payload);