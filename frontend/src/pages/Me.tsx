import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoggedInView from "../components/LoggedInView";
import LoggedOutView from "../components/LoggedOutView";
import api from "../api/api"; // axios 인스턴스 가져오기

const Me = () => {
  const { user, login, logout } = useAuth();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const loginSuccess = query.get("login"); // "success"인지 확인

  useEffect(() => {
    let cancelled = false; // unmount 시 상태 업데이트 방지

    const fetchMe = async () => {
      try {
        const res = await api.get("/users/me"); // 인터셉터 적용
        if (!cancelled) {
          login(res.data.name); // 상태 업데이트
          sessionStorage.setItem("userName", res.data.name); // 세션 저장
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        if (!cancelled) {
          logout(); // 로그아웃 처리
          sessionStorage.removeItem("userName");
        }
      }
    };

    fetchMe();

    return () => {
      cancelled = true; // 컴포넌트 언마운트 시 요청 취소 플래그
    };
  }, [login, logout]);

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

