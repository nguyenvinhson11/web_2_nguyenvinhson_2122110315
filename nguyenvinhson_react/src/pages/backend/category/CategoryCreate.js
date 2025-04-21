import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import CategoryService from "../../../services/CategoryService";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };

    try {
      await CategoryService.create(data);
      alert("✅ Thêm danh mục thành công");
      navigate("/admin/category");
    } catch (error) {
      console.error("❌ Lỗi tạo danh mục:", error);
      alert("❌ Tạo thất bại");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 p-1 rounded-xl shadow-md mt-5">
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-indigo-700 uppercase tracking-wide">
          ➕ Thêm danh mục
        </h1>
        <Link
          to="/admin/category"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-700 shadow"
        >
          <RiArrowGoBackFill />
          <span>Quay lại</span>
        </Link>
      </div>
  
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tên danh mục */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tên danh mục <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition"
            placeholder="Nhập tên danh mục"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
  
        {/* Nút Lưu */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-md flex items-center gap-2 shadow transition"
          >
            <FaSave />
            <span>Lưu danh mục</span>
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default CategoryCreate;
