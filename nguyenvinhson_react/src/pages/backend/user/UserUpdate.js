import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../services/UserService";
import { Link } from "react-router-dom";

import { MdOutlineArrowBack } from "react-icons/md";
const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await UserService.show(id);
        const user = res;
        setFullName(user.fullName);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
        setPassword(user.password);
        setRole(user.role);
        if (user.avatar) {
          setPreview(`http://localhost:8080/uploads/user/${user.avatar}`);
        }
      } catch (err) {
        console.error("Lỗi khi tải user:", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("address", address);
    if (avatar) formData.append("avatar", avatar);


    try {
      const res = await UserService.update(id, formData);
      console.log("✨ Cập nhật user thành công:", res);
      navigate("/admin/user");
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật user:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-purple-100 to-white rounded-xl shadow-lg border border-purple-300">
      <h1 className="text-3xl font-extrabold text-purple-700 mb-6 tracking-wide">
        ✏️ Cập nhật thành viên
      </h1>

      <div className="flex justify-end mb-6">
        <Link
          to="/admin/user"
          className="inline-flex items-center gap-2 bg-purple-200 text-purple-700 hover:bg-purple-300 font-semibold px-4 py-2 rounded-lg shadow"
        >
          <MdOutlineArrowBack className="text-lg" />
          Quay lại
        </Link>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="customer">Khách hàng</option>
            <option value="admin">Quản trị viên</option>
            <option value="staff">Nhân viên</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setAvatar(file);
              if (file) setPreview(URL.createObjectURL(file));
            }}
            className="w-full text-sm text-gray-600"
            accept="image/*"
          />
          {preview && (
            <img
              src={preview}
              className="mt-3 w-24 h-24 rounded-full border-4 border-purple-300 object-cover shadow-md"
              alt="avatar preview"
            />
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition"
          >
            ✅ Cập nhật thông tin
          </button>
        </div>
      </form>
    </div>

  );
};

export default UserUpdate;
