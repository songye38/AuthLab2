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
  console.log("Fetching me page with cookie access_token...");

  fetch("https://api.songyeserver.info/users/me", {
    method: "GET",
    credentials: "include", // access_token 쿠키 자동 포함
  })
    .then(res => {
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    })
    .then(data => {
      console.log("Me page fetch data:", data);
      console.log("user",user);
      login(data.id);
    })
    .catch(err => {
      console.error(err);
      logout();
    });
}, []);


    return (
        <>
            {user ? (
                <LoggedInView userName={user} loginSuccess={loginSuccess} />
            ) : (
                <LoggedOutView />
            )}
        </>
    );
};

export default Me;
