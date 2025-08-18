import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../hooks/useAuth"; // ✅ context에서 useAuth 훅 가져오기

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // ✅ 여기에서 context에서 login 꺼냄

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token, user } = await loginUser(email, password);
      console.log("로그인 성공 전체:", { access_token, user });
      login(user.name); // userId 저장
    } catch (error: any) {
      alert(error.message);
    }
  };

  // 🔗 소셜 로그인 함수
  const handleGoogleLogin = () => {
    window.location.href =
      "https://songyeserver.info/users/login/google";
  };

  const handleKakaoLogin = () => {
    window.location.href =
      "https://songyeserver.info/users/login/kakao";
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h1 style={{ textAlign: "center" }}>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ display: "block", marginBottom: 8 }}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 16,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />

        <label htmlFor="password" style={{ display: "block", marginBottom: 8 }}>
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 8,
            marginBottom: 24,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          로그인
        </button>
      </form>

      {/* 🔥 소셜 로그인 버튼 추가 */}
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            backgroundColor: "#DB4437", // Google 빨강
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          구글 로그인
        </button>

        <button
          onClick={handleKakaoLogin}
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#FEE500", // 카카오 노랑
            color: "#3A1D1D",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          카카오 로그인
        </button>
      </div>
      <button
        onClick={() => navigate("/register")}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 10,
          backgroundColor: "#e0e0e0",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        회원가입 페이지로 이동
      </button>
    </div>
  );
};

export default Login;
