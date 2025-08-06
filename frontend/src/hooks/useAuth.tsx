import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (userId: string) => setUser(userId);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token"); // 얘도 같이 지워줘야지
  };

  // ✅ 마운트 시 로그인 상태 복원
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user_name = localStorage.getItem("user_name");
    if (token) {
      // 예시로 그냥 토큰이 있으면 로그인된 걸로 치는 경우
      // 실제로는 토큰 decode하거나 사용자 정보 요청해서 setUser 해주는 게 더 안전
      //서버에서 값을 리턴해줄 때 사용자 정보를 받고 그 값을 로컬스토리지에 저장해준 다음에 불러오면 된다
      setUser(user_name);
    }
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
