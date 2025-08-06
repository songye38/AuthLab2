import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ margin: 0, fontWeight: "bold", fontSize: "1.5rem", color: "#4f46e5" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          D1R
        </Link>
      </h1>
    </header>
  );
};

export default Header;
