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
