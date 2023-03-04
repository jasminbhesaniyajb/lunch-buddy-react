import { serviceMaker, methods } from "../index";

export const GET_USERS = () => serviceMaker(`/v1/users`, methods.GET);
export const GET_USERS_BY_BLOG = (id) => serviceMaker(`/v1/users/${id}/blogs`, methods.GET);
export const DELETE_USERS_BY_ID = (id) => serviceMaker(`/v1/users/${id}`, methods.DELETE);
