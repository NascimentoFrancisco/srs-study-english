import { api } from "./api"

export const login = async (email: string, password: string) => {
    return await api({
        endpoint: "/auth/obtain-token", method: 'POST', data: {email, password}, withAuth: false
    });
}

export const changePassword = async (password1: string, password2: string) => {
    return await api({
        endpoint: "/auth/change-password", method: 'PUT', withAuth: true, data: {password1, password2}
    });
}

export const requestResetPassword = async(email: string) => {
    return await api({
        endpoint: "/auth/request-password-reset", method: 'POST', withAuth: false, data: {email}
    });
}

export const resetPassword = async(token: string, password1: string, password2: string) => {
    return await api({
        endpoint: "/auth/reset-password", method: 'POST', withAuth: false,
        data: {token, password1, password2}
    });
}
