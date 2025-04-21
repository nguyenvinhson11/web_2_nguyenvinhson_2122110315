import React, { useEffect, useState } from "react";
import BrandService from "../../../services/BrandService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await BrandService.index();
        console.log("data nhận được", res);
        setBrands(res);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách brand:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thương hiệu này?")) {
      try {
        await BrandService.destroy(id);
        setBrands(brands.filter(b => b.id !== id));
        alert("Đã xóa thương hiệu!");
      } catch (error) {
        console.error("Lỗi khi xóa brand:", error);
      }
    }
  };

  return (
    <div className="p-5 bg-gradient-to-br from-cyan-100 via-indigo-100 to-purple-100 min-h-screen rounded">
      <div className="bg-white shadow-lg rounded-lg p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-700 uppercase tracking-wide">
            🏷️ Quản lý thương hiệu
          </h1>
          <Link
            to="/admin/brand/create"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded shadow"
          >
            <IoMdAdd className="text-xl" />
            Thêm
          </Link>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow border border-indigo-100">
          <table className="table-auto w-full text-sm text-gray-800">
            <thead>
              <tr className="bg-indigo-200 text-indigo-900 uppercase text-sm">
                <th className="px-4 py-3 border-b">Tên</th>
                <th className="px-4 py-3 border-b">Ngày tạo</th>
                <th className="px-4 py-3 border-b">Tạo bởi</th>
                <th className="px-4  py-3 border-b text-center">Chức năng</th>
                <th className="px-4 py-3 border-b text-center">ID</th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 ? (
                brands.map((brand, index) => (
                  <tr key={index} className="hover:bg-indigo-50 transition">
                    <td className="px-4 py-3 border-b">{brand.name}</td>
                    <td className="px-4 py-3 border-b">
                      {new Date(brand.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {brand.createdByUser?.fullName || "Không rõ"}
                    </td>
                    <td className="px-4 py-2 border-b text-center space-x-1">
                      <Link
                        to={`show/${brand.id}`}
                        className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded shadow"
                        title="Xem"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`update/${brand.id}`}
                        className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow"
                        title="Sửa"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow"
                        title="Xóa"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                    <td className="px-4 py-3 border-b text-center">{brand.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400 italic">
                    Không có thương hiệu nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default BrandList;
