import { useRoutes } from "react-router-dom";
import Auth from "../pages/auth";
import Home from "../pages/home";
import User from "../pages/user";
import Exercises from "../pages/exercises";

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
        },
           
        {
            path: "/user",
            element: <User type="edit-user"/>
        },   
        {
            path: "/change-password",
            element: <User type="change-password" />
        },
        {
            path: '/exercises',
            element: <Exercises type="create" />
        },
        {
            path: '/exercises-edit',
            element: <Exercises type="edit" />
        }
    ]);

    return routers;
}

export default MainRouters;
