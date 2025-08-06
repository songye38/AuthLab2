import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>메인 페이지</h1>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/login")}
          style={{ marginRight: "10px", padding: "10px 20px", cursor: "pointer" }}
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/register")}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Home;
