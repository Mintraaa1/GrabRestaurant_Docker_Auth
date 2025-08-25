import { Navigate } from "react-router";    
import { useAuthContext } from "../context/AuthContext";
import { Children } from "react";

const AdminPage = ({Children}) => {
    const { user } = useAuthContext();
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    if(user?.authorites.includes("ROLE_ADMIN")) {
        return Children;
    }
    return <Navigate to="/notallowed" />;
    }

export default AdminPage;