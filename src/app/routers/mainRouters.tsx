import { useRoutes } from "react-router-dom";
import Auth from "../pages/auth";

function MainRouters() {
    const routers = useRoutes([
        {
            path: '/login',
            element: <Auth type="login"/>
        },
        {
            path: '/create',
            element: <Auth type="create" />
        }
    ]);

    return routers;
}

export default MainRouters;
