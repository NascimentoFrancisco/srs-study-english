import { api } from "./api"

export const create = async (name: string, email: string, password: string) => {
    return await api({
        endpoint: "/user/", method: 'POST', data: {name, email, password}, withAuth: false
    });
}

export const getUser = async () => {
    return await api({
        endpoint: "/user/", method: 'GET', withAuth: true
    });
}

export const updateUser = async (name: string, email: string) => {
    return await api({
        endpoint: "/user/", method: 'PUT', withAuth: true, data: {name, email}
    });
}

export const deleteUser = async () => {
    return await api({
        endpoint: "/user/", method: 'DELETE', withAuth: true
    });
}
