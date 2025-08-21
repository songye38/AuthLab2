import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../api/api"; // api 인스턴스 가져오기
interface AuthContextType {
  user: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (userName: string) => {
    setUser(userName);
    sessionStorage.setItem("userName", userName); // 세션 스토리지에 저장
  };
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("userName"); // 얘도 같이 지워줘야지
  };

  useEffect(() => {
    api.get("/users/me")
      .then((res) => {
        setUser(res.data.name);
        sessionStorage.setItem("userName", res.data.name); // 세션에도 저장
      })
      .catch(() => {
        setUser(null);
        sessionStorage.removeItem("userName"); // 실패 시 세션 제거
      });
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
