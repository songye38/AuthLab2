import axios from "axios";

// axios 인스턴스 만들어서 baseURL 지정 (Railway 서버 주소로 바꿔줘)
const api = axios.create({
    baseURL: "https://api.songyeserver.info",
    withCredentials: true, // 쿠키 같은 것도 필요하면 true로
});

// 회원가입 API 함수
export async function registerUser(email: string, password: string, name: string) {
    try {
        const response = await api.post("/users/register", {
            email,
            password,
            name,
        });
        return response.data;
    } catch (error: any) {
        // 에러 핸들링, 원하는대로 가공 가능
        throw new Error(error.response?.data?.detail || "회원가입 실패");
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const response = await api.post("/users/login", { email, password });
        const { user } = response.data;
        console.log("로그인 성공:", user);
        localStorage.setItem("user_name", user.name);
        return { user };  // 객체 형태로 둘 다 반환
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "로그인 실패");
    }
}

// 로그아웃 함수
export async function logoutUser() {
    try {
        await api.post("/users/logout"); // 서버에서 쿠키 제거 처리
    } catch (error) {
        console.warn("서버 로그아웃 실패 (무시 가능)", error);
    } finally {
        window.location.href = "/login"; // 로그인 페이지로 이동
    }
}


