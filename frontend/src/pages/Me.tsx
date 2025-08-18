import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoggedInView from "../components/LoggedInView";
import LoggedOutView from "../components/LoggedOutView";

const Me = () => {
    const { user, login, logout } = useAuth();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const loginSuccess = query.get("login"); // "success"인지 확인

    console.log("Me page user:", user, "Login success:", loginSuccess);



    useEffect(() => {
        fetch("https://authlab-server2-production.up.railway.app/users/me", { credentials: "include" }) // 쿠키 전송
            .then(res => {
                if (!res.ok) throw new Error("Not authenticated");
                return res.json();
            })
            .then(data => {
                console.log("Me page fetch data:", data);
                login(data.id); // useAuth() 안 user 세팅
            })
            .catch(() => logout());
    }, []);
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
