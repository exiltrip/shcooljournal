import {Navigate} from "react-router-dom";

const AccessProtected = ({children}) => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
        return <Navigate to="/denied" replace />;
    }
    else
        return children;
};

export default AccessProtected;
