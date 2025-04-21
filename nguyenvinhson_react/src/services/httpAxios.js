import axios from "axios";

// ✅ Sửa baseURL thành địa chỉ Spring Boot
const httpAxios = axios.create({
  baseURL: "http://localhost:8080/api/", // API Spring Boot
  withCredentials: false, // Có thể để true nếu dùng cookie
});

// ✅ Gắn token từ localStorage vào header Authorization
httpAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Rút gọn response
httpAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("❌ Lỗi gọi API:", error);
    return Promise.reject(error);
  }
);

export default httpAxios;
