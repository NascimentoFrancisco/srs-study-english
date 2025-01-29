import { Login } from "../@types/user/auth";
import { api } from "./api"

export const login = async (email: string, password: string) => {
    return await api<Login>({
        endpoint: "/auth/", method: 'POST', data: {email, password}, withAuth: false
    });
}
