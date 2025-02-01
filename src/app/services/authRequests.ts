import { ChangePassword, Login } from "../@types/user/auth";
import { api } from "./api"

export const login = async (email: string, password: string) => {
    return await api<Login>({
        endpoint: "/auth/", method: 'POST', data: {email, password}, withAuth: false
    });
}

export const changePassword = async (password1: string, password2: string) => {
    return await api<ChangePassword>({
        endpoint: "/change-password/", method: 'PUT', withAuth: true, data: {password1, password2}
    });
}
