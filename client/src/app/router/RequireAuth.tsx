import {useAccount} from "../../lib/hooks/useAccount.ts";
import {Navigate, Outlet, useLocation} from "react-router";
import {Typography} from "@mui/material";

export default function RequireAuth() {
    const {currentUser, loadingCurrentUser} = useAccount();
    const location = useLocation();

    if (loadingCurrentUser) return <Typography>Loading...</Typography>

    if (!currentUser) return <Navigate to='/login' state={{from: location}}/>

    return <Outlet/>
}