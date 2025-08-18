import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import LoggedInView from "../components/LoggedInView";
import LoggedOutView from "../components/LoggedOutView";

const Me = () => {
    const { user } = useAuth();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const loginSuccess = query.get("login"); // "success"인지 확인

    console.log("Me page user:", user, "Login success:", loginSuccess);

    return (
        <>
            {user ? (
                <LoggedInView userId={user} loginSuccess={loginSuccess} />
            ) : (
                <LoggedOutView />
            )}
        </>
    );
};

export default Me;
