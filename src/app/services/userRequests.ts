import { User } from "../@types/user/user";
import { api } from "./api"

export const create = async (name: string, email: string, password: string) => {
    return await api<User>({
        endpoint: "/users/", method: 'POST', data: {name, email, password}, withAuth: false
    });
}

export const getUser = async () => {
    return await api<User>({
        endpoint: "/users/", method: 'GET', withAuth: true
    });
}