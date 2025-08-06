import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 로그인 API 호출 예정
    console.log("로그인 시도", { email, password });
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
