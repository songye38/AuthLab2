// 3단계까지 되어 있는 상태여야 해
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.songyeserver.info",
  withCredentials: true,
});

// 👉 요청 시 access token 자동 삽입
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👇 여기부터 4단계 코드 (응답 인터셉터)
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
        // 👉 refresh_token은 httponly 쿠키에 있으니 withCredentials 필수
        const res = await axios.post(
          "https://api.songyeserver.info/users/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.access_token;

        // 👉 새 토큰 저장
        localStorage.setItem("access_token", newAccessToken);

        // 👉 원래 요청에 토큰 새로 설정하고 재요청
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 토큰도 만료됨");
        // 리프레시 토큰도 만료 → 로그아웃 처리
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
