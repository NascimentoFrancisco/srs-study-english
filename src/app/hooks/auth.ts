import { useAppDispatch } from "../../redux/hooks";
import { setAuthStatus, setAuthToken, setUser} from "../../redux/slice/authSlice";
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

        if(request.data){
            const { data } = request
            authenticate(data.accessToken);
            return true;
        }

        dispatch(setAuthStatus('not_authenticated'));
        return request.messages
    }

    const handleAuthenticateUser = async() => {
        const authToken = handleGetToken();
        const request = await getUser();

        if (!authToken || !request.data){
            dispatch(setAuthStatus('not_authenticated'));
            dispatch(setAuthToken(null));
            return;
        }
        dispatch(setUser(request.data));
        authenticate(authToken);
    }

    const handleChangePassword = async (password1: string, password2: string) => {
        const request = await changePassword(password1, password2);
        if(request.data){
            return true;
        }
        return request.messages;
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
