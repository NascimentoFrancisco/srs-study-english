import { useAppDispatch } from "../../redux/hooks";
import { setAuthStatus, setAuthToken, setUser} from "../../redux/slice/authSlice";
import { ApiErrorResponse } from "../@types/errors/errorResponse";
import { ApiSuccessResponse } from "../@types/response/apiResponse";
import { ChangePassword, LoginResponse } from "../@types/user/auth";
import { User } from "../@types/user/user";
import { login, changePassword } from "../services/authRequests";
import { getUser } from "../services/userRequests";

const LOCAL_SOTORAGE_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const authenticate = (authToken: string) => {
        dispatch(setAuthToken(authToken));
        dispatch(setAuthStatus('authenticated'));

        localStorage.setItem(LOCAL_SOTORAGE_ACCESS_TOKEN, authToken);
    }

    // Get token from local storage
    const handleGetToken = () => localStorage.getItem(LOCAL_SOTORAGE_ACCESS_TOKEN);

    // Function to login
    const handleLogin = async (email: string, password: string) => {
        const request = await login(email, password);
        console.log(request)

        if(request.status === 200){
            const data = request as ApiSuccessResponse
            const login_response = data.data as LoginResponse
            authenticate(login_response.accessToken);
            return true;

        } else if(request.status === 401){
            const response = request as ApiErrorResponse
            dispatch(setAuthStatus('not_authenticated'));
            return response.detail;

        } else if (request.status === 500){
            const response = request as ApiErrorResponse
            dispatch(setAuthStatus('not_authenticated'));
            return response.detail;
        }

        return ["Ocorreu um erro inesperado."]
        
    }

    const handleAuthenticateUser = async() => {
        const authToken = handleGetToken();
        
        if(!authToken){
            handleLogout();
            return;
        }
    
        const request = await getUser();

        if (request.status === 401){
            handleLogout();
            return;
        }

        if (request.status === 401){
            dispatch(setAuthStatus('not_authenticated'));
            dispatch(setAuthToken(null));
            return;
        }

        if (request.status === 200 && authToken){
            let response = request as ApiSuccessResponse;
            dispatch(setUser(response.data as User));
            authenticate(authToken);
        }
    }

    const handleChangePassword = async (password1: string, password2: string) => {
        const request = await changePassword(password1, password2);
        if(request.status === 200){
            return true;
        }

        if (request.status === 401){
            handleLogout();
        }
        
        if (request.status === 400){
            let response = request as ApiErrorResponse;
            const data = response as ChangePassword
            return data.detail
        }
    }

    const handleLogout = () => {
        dispatch(setAuthToken(null));
        dispatch(setAuthStatus('not_authenticated'));

        localStorage.removeItem(LOCAL_SOTORAGE_ACCESS_TOKEN);
    }

    return {
        handleLogin,
        handleGetToken,
        handleAuthenticateUser,
        handleChangePassword,
        handleLogout
    }
}
