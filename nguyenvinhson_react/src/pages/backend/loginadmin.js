import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { FaUserAlt, FaLock } from "react-icons/fa";
const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      // Gọi login → token được lưu bên trong AuthService
      const loggedInUser = await AuthService.login({ email, password });
  
      // Check quyền
      if (!loggedInUser || !["admin", "ADMIN", "ROLE_ADMIN"].includes(loggedInUser.role)) {
        setError("Bạn không có quyền truy cập!");
        AuthService.logout();
        return;
      }
  
      // Chuyển trang
      navigate("/admin");
  
    } catch (err) {
      console.error("❌ Lỗi khi đăng nhập:", err);
      setError("Sai email hoặc mật khẩu!");
    }
  };
  
  
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-200">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm border-t-8 border-pink-400"
    >
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6 drop-shadow">
        ✨ Đăng nhập Admin ✨
      </h2>
  
      {error && (
        <div className="mb-4 text-red-500 text-center font-semibold bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
  
      <div className="mb-5">
        <label className="block font-semibold text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full border border-pink-300 bg-pink-50 focus:ring-2 focus:ring-pink-500 p-3 rounded-xl outline-none shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Nhập email của bạn"
        />
      </div>
  
      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-1">Mật khẩu</label>
        <input
          type="password"
          className="w-full border border-pink-300 bg-pink-50 focus:ring-2 focus:ring-pink-500 p-3 rounded-xl outline-none shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Nhập mật khẩu"
        />
      </div>
  
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
      >
        🚀 Đăng nhập
      </button>
    </form>
  </div>
  
  );
};

export default LoginAdmin;
