import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import PrivateRouter from "../middlewares/PrivateRouter";
import PublicRouter from "../middlewares/PublicRouter";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import AppShell from "@/components/app-shell";
import LeaveRequest from "@/pages/leaveRequest/LeaveRequest";
import UserLeaveRequest from "@/pages/userLeaveRequest/UserLeaveRequest";
import User from "@/pages/user/User";
import RoleRouter from "../middlewares/RoleRouter";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRouter><AppShell /></PrivateRouter>,
        children: [
            {
                path: "",
                element: (
                    <RoleRouter role="admin">
                        <Dashboard />
                    </RoleRouter>
                ),
            },
            {
                path: "/leave-request",
                element: (
                    <RoleRouter role="admin">
                        <LeaveRequest />
                    </RoleRouter>
                ),
            },
            {
                path: "/user",
                element: (
                    <RoleRouter role="admin">
                        <User />
                    </RoleRouter>
                ),
            },
            {
                path: "/user-leave-request",
                element: (
                    <RoleRouter role="employee">
                        <UserLeaveRequest />
                    </RoleRouter>
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
    {
        path: 'not-found',
        element: <NotFound />,
    },

]);
