import React, { useState, useEffect } from "react";
import BannerService from "../../../services/BannerService";
import { IoMdAdd } from "react-icons/io";
import {
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const BannerList = () => {
  const urlImage = "http://localhost/website/nguyenvinhson_laravel/public/images/";
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await BannerService.index();
      setBanners(result.banners);
    };
    fetchData();
  }, []);

 // Hàm để thay đổi trạng thái banner
const handleStatusChange = async (id) => {
  try {
    const response = await BannerService.status(id);

    if (response.status) {
      // Cập nhật trạng thái của banner trong danh sách mà không cần tải lại trang
      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner.id === id ? { ...banner, status: response.banner.status } : banner
        )
      );
    } else {
      alert("Không thể thay đổi trạng thái.");
    }
  } catch (error) {
    console.error("Lỗi khi thay đổi trạng thái:", error);
    alert("Có lỗi xảy ra.");
  }
};


  return (
    <>
      <div className="content">
        <div className=" flex ">
          <div>
            <h1 className="uppercase text-2xl font-bold ml-4 my-5">
              Quản lý banner
            </h1>
          </div>
          <div className="ml-auto">
            <button
              type="submit"
              className=" text-lg ml-auto my-5 mr-5 bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
            >
              <Link className="flex items-center" to="/admin/banner/create">
                <IoMdAdd className="mr-1 up" />
                Thêm
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-400 border-b border-gray-300">
              <th className=" w-20 py-2 px-4 border-r border-gray-300"></th>
              <th className="py-2 px-4 border-r border-gray-300">Hình</th>
              <th className="py-2 px-4 border-r border-gray-300">Tên</th>
              <th className="py-2 px-4 border-r border-gray-300">Vị trí</th>
              <th className=" w-60 py-2 px-4 border-r border-gray-300">
                Chức năng
              </th>
              <th className="py-2 px-4 border-r border-gray-300">ID</th>
            </tr>
          </thead>
          <tbody>
            {banners &&
              banners.length > 0 &&
              banners.map((banner, index) => {
                return (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      <input type="checkbox" />
                    </td>
                    <td className=" w-44 h-w-44 py-2 px-4 border-r border-gray-300">
                      <img
                        className="w-full"
                        src={urlImage + "banner/" + banner.image}
                        alt={banner.name}
                      />
                    </td>
                    <td className="py-2 px-4 border-r border-gray-300">
                      {banner.name}
                    </td>
                    <td className="py-2 px-4 border-r border-gray-300">
                      {banner.position}
                    </td>

                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      <button
                        onClick={() => handleStatusChange(banner.id)}
                        className={`${
                          banner.status === 1 ? "bg-green-500" : "bg-red-500"
                        } py-1 px-2 mx-0.5 text-white rounded-md`}
                      >
                        {banner.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                      </button>

                      <button className="bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <Link to={`show/${banner.id}`}>
                          <FaEye className="text-sm" />
                        </Link>
                      </button>
                      <button className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <Link to={`update/${banner.id}`}>
                          <FaEdit className="text-sm" />
                        </Link>
                      </button>
                      <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </td>
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      {banner.id}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BannerList;
