import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../hooks/useAuth"; // ✅ context에서 useAuth 훅 가져오기

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ 여기에서 context에서 login 꺼냄

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      console.log("로그인 성공:", data);
      alert("로그인 성공!");
      login(data.userId); // ✅ userId나 email 등 로그인된 사용자 정보
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h1 style={{ textAlign: "center" }}>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ display: "block", marginBottom: 8 }}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 16, borderRadius: 4, border: "1px solid #ccc" }}
        />

        <label htmlFor="password" style={{ display: "block", marginBottom: 8 }}>
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 24, borderRadius: 4, border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{ width: "100%", padding: 10, backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
        >
          로그인
        </button>
      </form>

      <button
        onClick={() => navigate("/register")}
        style={{ marginTop: 20, width: "100%", padding: 10, backgroundColor: "#e0e0e0", border: "none", borderRadius: 4, cursor: "pointer" }}
      >
        회원가입 페이지로 이동
      </button>
    </div>
  );
};

export default Login;
