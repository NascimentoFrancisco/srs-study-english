import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks"
import { Navigate } from "react-router-dom";
import Loading from "../components/loading";

type Props = {
    children: ReactNode
}

export const AuthMiddleware = ({children}: Props) => {
    
    const { authStatus } = useAppSelector(state => state.auth);

    if( authStatus === 'authenticated' ){
        return children;
    }

    if (authStatus === 'not_verified'){
        return <Loading />
    }

    return <Navigate to="/login" replace/>;
}
