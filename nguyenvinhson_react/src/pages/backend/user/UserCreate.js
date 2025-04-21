import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import UserService from "../../../services/UserService";

const UserCreate = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("role", role);
    if (avatar) formData.append("avatar", avatar); // đúng tên backend


    try {
      const res = await UserService.create(formData);
      console.log("✅ Tạo user thành công:", res);
      navigate("/admin/user");
    } catch (err) {
      console.error("❌ Lỗi khi tạo user:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-100 to-white rounded-xl shadow-lg border border-green-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-green-700 uppercase tracking-wide">
          ➕ Thêm người dùng
        </h1>
        <Link
          to="/admin/user"
          className="inline-flex items-center gap-2 bg-green-200 text-green-700 hover:bg-green-300 font-semibold px-4 py-2 rounded-lg shadow"
        >
          <RiArrowGoBackFill className="text-base" />
          Quay lại
        </Link>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <InputField label="Họ tên" value={fullName} onChange={setFullName} required />
        <InputField label="Email" type="email" value={email} onChange={setEmail} required />
        <InputField label="Số điện thoại" value={phone} onChange={setPhone} />
        <InputField label="Địa chỉ" value={address} onChange={setAddress} />
        <InputField label="Mật khẩu" type="password" value={password} onChange={setPassword} required />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
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
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setAvatar(file);
              if (file) setPreview(URL.createObjectURL(file));
            }}
            className="w-full text-sm text-gray-600"
          />
          {preview && (
            <img
              src={preview}
              alt="Avatar Preview"
              className="mt-3 w-24 h-24 rounded-full border-4 border-green-300 object-cover shadow-md"
            />
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            <FaSave className="text-base" />
            Thêm mới
          </button>
        </div>
      </form>
    </div>

  );
};

const InputField = ({ label, type = "text", value, onChange, required = false }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 rounded"
      required={required}
    />
  </div>
);

export default UserCreate;
