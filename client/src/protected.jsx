import { Auth } from "./context/admin"
import { Navigate, Outlet } from "react-router-dom";

export function Protected (){
    const {loading, isAuth} = Auth();

    if(loading) return <h1>Loading...</h1>;

    if(!loading && !isAuth){ return <Navigate to='/login' replace />}

    return( <Outlet/>)
}