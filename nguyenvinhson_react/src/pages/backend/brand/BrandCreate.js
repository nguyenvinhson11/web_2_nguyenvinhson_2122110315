import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import BrandService from "../../../services/BrandService";

const BrandCreate = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };
    try {
      await BrandService.create( data );
      alert("✅ Thêm brand thành công!");
      navigate("/admin/brand");
    } catch (error) {
      console.error("❌ Lỗi khi thêm brand:", error);
      alert("Thêm thất bại!");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-cyan-100 to-blue-100 p-1 rounded-xl shadow-md mt-5">
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-cyan-700 uppercase tracking-wide">
            ➕ Thêm thương hiệu
          </h1>
          <Link
            to="/admin/brand"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
          >
            <RiArrowGoBackFill />
            <span>Quay lại</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tên Brand */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên thương hiệu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition"
              placeholder="Nhập tên thương hiệu..."
              required
            />
          </div>

          {/* Nút lưu */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md flex items-center gap-2 shadow transition"
            >
              <FaSave />
              <span>Lưu thương hiệu</span>
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default BrandCreate;
