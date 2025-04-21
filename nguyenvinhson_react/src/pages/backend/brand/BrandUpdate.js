import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import BrandService from "../../../services/BrandService";

const BrandUpdate
 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await BrandService.show(id);
        setName(res.name);
      } catch (error) {
        console.error("❌ Lỗi lấy dữ liệu danh mục:", error);
      }
    };

    fetchBrand();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };

    try {
      await BrandService.update(id, data);
      alert("✅ Cập nhật thành công!");
      navigate("/admin/brand");
    } catch (error) {
      console.error("❌ Cập nhật thất bại:", error);
      alert("❌ Cập nhật thất bại!");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-gray-100 to-purple-100 p-1 rounded-xl shadow-md mt-5">
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-purple-700 uppercase tracking-wide">
            ✏️ Cập nhật thương hiệu
          </h1>
          <Link
            to="/admin/brand"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-700 shadow"
          >
            <RiArrowGoBackFill />
            <span>Quay lại</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tên thương hiệu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên thương hiệu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition"
              placeholder="Nhập tên thương hiệu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Nút Cập nhật */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-md flex items-center gap-2 shadow transition"
            >
              <FaSave />
              <span>Cập nhật</span>
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default BrandUpdate
;
