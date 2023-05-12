import { post } from './api'
import { ApiConstants } from './ApiConstants';

export interface SignupFormPayload {
    firstname: string;
    lastname: string;
    department: string;
    email: string;
    password: string;
    role: string;
    semester?: string;
}

export type LoginFormPayload = {
    email: string;
    password: string;
};

export const login = (payload:LoginFormPayload) => {
    return post(ApiConstants.LOGIN, payload)
}

export const signup = (payload:SignupFormPayload) => {
    return post(ApiConstants.REGISTER, payload)
}
