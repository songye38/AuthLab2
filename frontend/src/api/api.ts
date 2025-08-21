import axios from "axios";

const api = axios.create({
  baseURL: "https://api.songyeserver.info",
  withCredentials: true, // ✅ 쿠키 자동 전송
});

// 이제 요청 인터셉터에서 Authorization 헤더 삽입 필요 없음
// 왜냐면 서버가 쿠키에서 access_token 확인

// 👇 응답 인터셉터 (4단계)
api.interceptors.response.use(
  (response) => response, // 성공 시 그대로 리턴
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰 만료 (401 Unauthorized) + 재시도 안 했을 때
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // refresh_token은 httponly 쿠키에 있으므로 그대로 withCredentials 사용
        const res = await axios.post(
          "https://api.songyeserver.info/users/refresh",
          {},
          { withCredentials: true }
        );
        
        return api(originalRequest); // 원래 요청 재시도
      } catch (refreshError) {
        console.error("리프레시 토큰도 만료됨");
        // 로그아웃 처리
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
