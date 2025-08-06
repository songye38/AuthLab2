import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";


const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await registerUser(email, password, name);
            console.log("회원가입 성공:", data);
            navigate("/login");
            // 성공하면 로그인 페이지 이동 등 추가 작업
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
            <h1 style={{ textAlign: "center" }}>회원가입 페이지</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" style={{ display: "block", marginBottom: 8 }}>
                    이름
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{ width: "100%", padding: 8, marginBottom: 16, borderRadius: 4, border: "1px solid #ccc" }}
                />

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
                    회원가입
                </button>
            </form>

            <button
                onClick={() => navigate("/login")}
                style={{ marginTop: 20, width: "100%", padding: 10, backgroundColor: "#e0e0e0", border: "none", borderRadius: 4, cursor: "pointer" }}
            >
                로그인 페이지로 이동
            </button>
        </div>
    );
};

export default Register;
