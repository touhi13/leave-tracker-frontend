import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import PrivateRouter from "../middlewares/PrivateRouter";
import PublicRouter from "../middlewares/PublicRouter";
import PermissionMiddleware from "../middlewares/PermissionMiddleware";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import AppShell from "@/components/app-shell";
import LeaveRequest from "@/pages/leaveRequest/LeaveRequest";
import User from "@/pages/user/User";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRouter><AppShell /></PrivateRouter>,
        children: [
            {
                path: "",
                element: (
                    <Dashboard />
                ),
            },
            {
                path: "/leave-request",
                element: (
                    <LeaveRequest />
                ),
            },
            {
                path: "/user",
                element: (
                    <User />
                ),
            },
        ]
    },
    {
        path: "register",
        element: <PublicRouter><Register /></PublicRouter>,
    },
    {
        path: "login",
        element: <PublicRouter><Login /></PublicRouter>,
    },
]);
