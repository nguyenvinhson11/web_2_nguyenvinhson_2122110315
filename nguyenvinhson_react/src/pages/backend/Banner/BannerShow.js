import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BannerService from "../../../services/BannerService"; // Import service for handling API requests

const BannerShow = () => {
  const { id } = useParams(); // Get ID from URL
  const [banner, setBanner] = useState({
    name: "",
    slug: "",
    parent_id: "",
    sort_order: 0,
    image: "",
    description: "",
    created_at: "",
    updated_at: "",
    created_by: 0,
    updated_by: 0,
    status: 1,
  });

  // Fetch the banner data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BannerService.show(id);
        setBanner(result.banner); // Set the banner data to state
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="p-3">
      <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
        <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
          Chi tiết banner
        </h1>
        <Link
          to="/admin/banner"
          className="text-lg bg-admin hover:bg-slate-600 ml-auto py-1 px-2 text-white rounded-md flex items-center"
        >
          Quay lại
        </Link>
      </div>

      <div className="m-3 p-3 bg-white rounded-lg px-3 py-5">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Tên trường</th>
              <th className="px-4 py-2">Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-bold">ID</td>
              <td className="border px-4 py-2">{banner.id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Tên</td>
              <td className="border px-4 py-2">{banner.name}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Slug</td>
              <td className="border px-4 py-2">{banner.slug}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Parent ID</td>
              <td className="border px-4 py-2">{banner.parent_id || "N/A"}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Sắp xếp</td>
              <td className="border px-4 py-2">{banner.sort_order}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Hình ảnh</td>
              <td className="border px-4 py-2">
                {banner.image && (
                  <img
                    src={`http://localhost/website/nguyenvinhson_laravel/public/images/banner/${banner.image}`}
                    alt={banner.name}
                    className="w-48"
                  />
                )}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Mô tả</td>
              <td className="border px-4 py-2">{banner.description}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày tạo</td>
              <td className="border px-4 py-2">{banner.created_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày cập nhật</td>
              <td className="border px-4 py-2">{banner.updated_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người tạo</td>
              <td className="border px-4 py-2">{banner.created_by}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người cập nhật</td>
              <td className="border px-4 py-2">{banner.updated_by}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Trạng thái</td>
              <td className="border px-4 py-2">
                {banner.status === 1 ? "Hoạt động" : "Không hoạt động"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerShow;
