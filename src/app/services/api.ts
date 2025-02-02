import axios, { AxiosError } from "axios";
import { ApiErrorResponse } from "../@types/errors/errorResponse";


type Props = {
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    data?: object,
    parms?: string,
    withAuth: boolean,
}

export const api = async <TypeResponse>({
    endpoint, method = 'GET', data, parms, withAuth = true
}: Props) => {
    
    const instace = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL
    });

    if(withAuth){
        instace.defaults.headers.common['Authorization'] = 
        `Bearer ${localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN)}`
    }

    try{
        const request = await instace<TypeResponse>(endpoint, {
            method,
            params: parms ?? parms,
            data: data ?? data,
        });

        if(request.status === 204){
            return {
                data: {"msg": "Dado excuíldo."}
            }
        }

        return {
            data: request.data
        }
    } catch (error){
        const err = error as AxiosError;
        if (err.status === 401){
            return {
                error: true,
                status: 401,
                messages: ["Não autorizado"]
            }
        }
    
        const e = error as AxiosError<ApiErrorResponse>;
        if (e.response?.data?.detail) {
            const messages = e.response.data.detail.map((item) => item.msg);
            return {
                error: true,
                messages,
            };
        }

        return {
            error: true,
            messages: ['Ocorreu um erro inesperado. Tente novamente mais tarde.'],
        };
    }
     
}