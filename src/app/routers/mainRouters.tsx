import { useRoutes } from "react-router-dom";
import Auth from "../pages/auth";
import Home from "../pages/home";
import Exercises from "../pages/exercises";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import Users from "../pages/user";
import ListExercises from "../pages/listExercises";
import NotFound from "../pages/notFound";
import About from "../pages/about";
import PasswordRecovery from "../pages/PasswordRecovery";

function MainRouters() {
    const routers = useRoutes([
        {
            index: true,
            element: <AuthMiddleware> <Home /> </AuthMiddleware> 
        },
        {
            path: "/password-recovery",
            element: <PasswordRecovery />
        },
        {
            path: '/login',
            element:  <Auth type="login"/>
        },
        {
            path: '/create',
            element: <Auth type="create" />
        },
           
        {
            path: "/user",
            element: <AuthMiddleware> <Users type="edit-user"/> </AuthMiddleware> 
        },   
        {
            path: "/change-password",
            element: <AuthMiddleware> <Users type="change-password" /> </AuthMiddleware>
        },
        {
            path:"/exercises-list",
            element: <AuthMiddleware> <ListExercises /> </AuthMiddleware>
        },
        {
            path: '/exercises',
            element: <AuthMiddleware><Exercises type="create" /> </AuthMiddleware>
        },
        {
            path: '/exercises-edit',
            element: <AuthMiddleware><Exercises type="edit" /> </AuthMiddleware>
        },
        {
            path: '/about',
            element: <About />
        },
        {
            path:"*",
            element: <NotFound />
        }
    ]);

    return routers;
}

export default MainRouters;
