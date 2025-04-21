import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthService.login(credentials); // login tự lưu token + user luôn
      navigate("/"); // ✅ sau đó App.jsx sẽ tự fetch user từ /auth/me nếu cần
      window.location.reload(); // hoặc force reload cho chắc
    } catch (err) {
      setLoginMessage("Đăng nhập thất bại");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 rounded-lg w-full max-w-md">
          <div className="bg-gray-800 rounded-lg shadow-lg p-5">
            {loginMessage && (
              <p
                className={`text-center mb-4 ${
                  loginMessage.includes("thành công")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {loginMessage}
              </p>
            )}
            <h2 className="text-3xl text-white text-center font-bold mb-6">
              Đăng Nhập
            </h2>

            <div className="mb-4">
              <label className="block text-white mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-400"
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-white mb-1">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-400"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-white text-gray-900 font-semibold py-3 rounded-lg mt-4 hover:bg-blue-100"
            >
              Đăng nhập
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-400">
                Chưa có tài khoản?{" "}
                <a href="/register" className="text-blue-500 hover:text-blue-700">
                  Đăng ký
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
