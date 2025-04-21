import httpAxios from "./httpAxios";

const AuthService = {
  // ✅ Gọi API login
  login: async (data) => {
    const res = await httpAxios.post("auth/login", data);
    const { token, email } = res;
  
    // Lưu token trước
    localStorage.setItem("token", token);
  
    // Gọi tiếp /auth/me để lấy user đầy đủ
    const user = await httpAxios.get("auth/me");
  
    // ✅ Lúc này mới dùng biến user → không lỗi nữa
    localStorage.setItem("user", JSON.stringify(user));
  
    return user;
  },
  

  // ✅ Lấy user đang đăng nhập
  getCurrentUser: async () => {
    try {
      const user = await httpAxios.get("auth/me");
      localStorage.setItem("user", JSON.stringify(user)); // cập nhật lại user
      return user;
    } catch (err) {
      console.error("❌ Lỗi khi lấy thông tin người dùng:", err);
      return null;
    }
  },

  // ✅ Xóa token và user khỏi localStorage
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // ✅ Trả token từ localStorage
  getToken: () => {
    return localStorage.getItem("token");
  },

  // ✅ Trả object user từ localStorage
  getUser: () => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw || raw === "undefined") return null;
      return JSON.parse(raw);
    } catch (error) {
      console.error("❌ Lỗi khi parse user từ localStorage:", error);
      return null;
    }
  },

  // ✅ Kiểm tra đã login chưa
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default AuthService;
