import {AxiosResponse} from "axios";
import {instance, ResponseType} from "./todolists-api";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: string }>>>('/auth/login', data);
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('/auth/me');
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login');
    }
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}