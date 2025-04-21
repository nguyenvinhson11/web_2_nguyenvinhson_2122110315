import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import { RiArrowGoBackFill } from "react-icons/ri";

const CategoryShow = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await CategoryService.show(id);
        setCategory(res);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto mt-5 p-1 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 shadow">
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-indigo-700 uppercase tracking-wide">
            📂 Chi tiết danh mục
          </h1>
          <Link
            to="/admin/category"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2 shadow"
          >
            <RiArrowGoBackFill />
            <span>Quay lại</span>
          </Link>
        </div>

        {category ? (
          <table className="w-full table-auto border text-sm text-gray-800">
            <tbody>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3 w-1/3">ID</td>
                <td className="border p-3 text-indigo-600 font-bold">{category.id}</td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Tên danh mục</td>
                <td className="border p-3">{category.name}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3">Người tạo</td>
                <td className="border p-3">{category.createdByUser?.fullName ?? "Không rõ"}</td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Người cập nhật</td>
                <td className="border p-3">{category.updatedByUser?.fullName ?? "Chưa từng cập nhật"}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3">Người xóa</td>
                <td className="border p-3"> {category.deletedByUser?.fullName ?? "Chưa xóa"}</td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Ngày tạo</td>
                <td className="border p-3">
                  {category.createdAt &&
                    new Date(category.createdAt).toLocaleString("vi-VN")}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3">Ngày cập nhật</td>
                <td className="border p-3">
                  {category.updatedAt &&
                    new Date(category.updatedAt).toLocaleString("vi-VN")}
                </td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Ngày xóa</td>
                <td className="border p-3">
                  {category.deletedAt
                    ? new Date(category.deletedAt).toLocaleString("vi-VN")
                    : "Chưa bị xóa"}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 italic">Đang tải dữ liệu...</p>
        )}
      </div>
    </div>

  );
};

export default CategoryShow;
