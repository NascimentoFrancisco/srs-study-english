import axios, { AxiosError } from "axios";
import { ApiErrorResponse } from "../@types/errors/errorResponse";
import { ApiSuccessResponse } from "../@types/response/apiResponse";
import { User } from "../@types/user/user";
import { ExerciseResponse } from "../@types/exercise/exercise";
import { LoginResponse } from "../@types/user/auth";
import { ChangePassword } from "../@types/user/auth";


type Props = {
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    data?: object,
    parms?: string,
    withAuth: boolean,
}

export const api = async ({
    endpoint, method = 'GET', data, parms, withAuth = true
}: Props): Promise<ApiSuccessResponse | ApiErrorResponse> => {
    
    const instace = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL
    });

    if(withAuth){
        instace.defaults.headers.common['Authorization'] = 
        `Bearer ${localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN)}`
    }
    try{
        const response = await instace(endpoint, {
            method,
            params: parms ?? parms,
            data: data ?? data,
        });

        return {
            data: response.data as User | ExerciseResponse | LoginResponse | ChangePassword | Array<ExerciseResponse> | {},
            status: response.status,
            endpoint
        }

    } catch (error){
        const err = error as AxiosError;
        let detail = err.response?.data as {detail: string} || {detail: "Erro desconhecido"};
        return {
            detail: detail.detail,
            status: err.response?.status || 500,
            endpoint,
        };
    }
}