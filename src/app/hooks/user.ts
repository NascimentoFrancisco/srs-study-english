
import { useAppDispatch } from "../../redux/hooks";
import { setAuthStatus, setAuthToken, setUser} from "../../redux/slice/authSlice";
import { ApiErrorResponse } from "../@types/errors/errorResponse";
import { ApiSuccessResponse } from "../@types/response/apiResponse";
import { User } from "../@types/user/user";
import { create, getUser, updateUser, deleteUser } from "../services/userRequests";


export const useHook = () => {

    const dispatch = useAppDispatch();

    const handleNotAuthenticated = () => {
        dispatch(setAuthStatus('not_authenticated'));
        dispatch(setAuthToken(null));
        dispatch(setUser(null));
        localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN);
    }

    const handleCreateUser = async (name: string, email: string, password: string) =>{
        const request = await create(name, email, password);
        if (request.status === 201){
            return true;
        }
        let response = request as ApiErrorResponse
        return response.detail
    }

    const handleGetUser = async () => {
        const request = await getUser();
        if (request.status === 200){
            let data = request as ApiSuccessResponse
            dispatch(setUser(data.data as User));
            return true;
        }

        if (request.status === 401){
            handleNotAuthenticated();
        }

        const response = request as ApiErrorResponse
        return response.detail
    }

    const handleUpdateUser = async (name: string, email: string) => {
        const request = await updateUser(name, email);
        if (request.status === 200){
            let data = request as ApiSuccessResponse;
            dispatch(setUser(data.data as User));
            return true;
        }

        if (request.status === 401){
            handleNotAuthenticated();
        }

        const response = request as ApiErrorResponse
        return response.detail
    }

    const handleDeleteUser = async () => {
        const request = await deleteUser();
        if (request.status === 204){
            handleNotAuthenticated()
            return true;
        }

        if (request.status === 401){
            handleNotAuthenticated();
        }

        const response = request as ApiErrorResponse
        return response.detail
    }

    return {
        handleGetUser,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser
    }
}
