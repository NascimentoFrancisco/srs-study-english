
import { create, getUser } from "../services/userRequests";


export const useHook = () => {

    const handleCreateUser = async (name: string, email: string, password: string) =>{
        const request = await create(name, email, password);
        console.log(request);
        if (request.data){
            return true;
        }
        return request.messages
    }

    const handleGetUser = async () => {
        const request = await getUser();
        if (request.data){
            return request.data
        }
        return request.messages;
    }

    return {
        handleGetUser,
        handleCreateUser
    }
}
