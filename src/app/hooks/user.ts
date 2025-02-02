
import { useAppDispatch } from "../../redux/hooks";
import { setAuthStatus, setAuthToken, setUser} from "../../redux/slice/authSlice";
import { create, getUser, updateUser } from "../services/userRequests";


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
        if (request.data){
            return true;
        }

        return request.messages
    }

    const handleGetUser = async () => {
        const request = await getUser();
        if (request.data){
            dispatch(setUser(request.data));
            return true;
        }

        if (request.status && request.status === 401){
            handleNotAuthenticated();
        }

        return request.messages;
    }

    const handleUpdateUser = async (name: string, email: string) => {
        const request = await updateUser(name, email);
        if (request.data){
            return true;
        }

        if (request.status && request.status === 401){
            handleNotAuthenticated();
        }

        return request.messages;
    }

    return {
        handleGetUser,
        handleCreateUser,
        handleUpdateUser
    }
}
