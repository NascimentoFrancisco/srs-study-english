import { useRoutes } from "react-router-dom";
import Auth from "../pages/auth";
import Home from "../pages/home";

function MainRouters() {
    const routers = useRoutes([
        {
            index: true,
            element:  <Home />
        },
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
