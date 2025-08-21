import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoggedInView from "../components/LoggedInView";
import LoggedOutView from "../components/LoggedOutView";
import api from "../api/api"; // api 인스턴스 가져오기

const Me = () => {
  const { user, login, logout } = useAuth();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const loginSuccess = query.get("login"); // "success"인지 확인

  console.log("Me page user:", user, "Login success:", loginSuccess);



  useEffect(() => {
    console.log("Fetching me page with cookie access_token...");

    api.get("/users/me") // withCredentials와 인터셉터 자동 적용
      .then(res => {
        console.log("Me page fetch data:", res.data);
        login(res.data.name);
        sessionStorage.setItem("userName", res.data.name); // 세션에도 저장
      })
      .catch(err => {
        console.error("Failed to fetch user info:", err);
        logout();
        sessionStorage.removeItem("userName");
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
