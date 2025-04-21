import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import MenuService from "../../../services/MenuService";
import {
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Import các icon cần thiết

const MenuList = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await MenuService.index();
      setMenus(result.menus);
    };
    fetchData();
  }, []);

  console.log("ket qua",menus);

  const handleStatusChange = async (id) => {
    try {
      const response = await MenuService.status(id);

      if (response.status) {
        // Cập nhật trạng thái của banner trong danh sách mà không cần tải lại trang
        setMenus((prevBanners) =>
          prevBanners.map((menu) =>
            menu.id === id
              ? { ...menu, status: response.menu.status }
              : menu
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
      <div className="content ">
        <div className=" flex ">
          <div>
            <h1 className="uppercase text-2xl font-bold ml-4 my-5">
              Quản lý menu
            </h1>
          </div>

          <div className="ml-auto">
            <button
              type="submit"
              className=" text-lg  ml-auto my-5 mr-5 bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
            >
              <Link className="flex items-center" to="/admin/menu/create">
                <IoMdAdd className="mr-1 up" />
                Thêm
              </Link>
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-400 border-b border-gray-300">
              <th className=" w-20 py-2 px-4 border-r border-gray-300"></th>
              <th className="py-2 px-4 border-r border-gray-300">Tên menu</th>
              <th className="py-2 px-4 border-r border-gray-300">Liên kết</th>
              <th className="py-2 px-4 border-r border-gray-300">Kiểu</th>
              <th className=" w-60 py-2 px-4 border-r border-gray-300">Chức năng</th>
              <th className="py-2 px-4 border-r border-gray-300">ID</th>
            </tr>
          </thead>
          <tbody>
            {menus &&
              menus.length > 0 &&
              menus.map((menu, index) => {
               

                return (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      <input type="checkbox" />
                    </td>
                    <td className="py-2 px-4 border-r border-gray-300">{menu.name}</td>
                    <td className="py-2 px-4 border-r border-gray-300">{menu.link}</td>
                    <td className="py-2 px-4 border-r text-center border-gray-300">{menu.type}</td>

                   
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                    <button
                        onClick={() => handleStatusChange(menu.id)}
                        className={`${
                          menu.status === 1 ? "bg-green-500" : "bg-red-500"
                        } py-1 px-2 mx-0.5 text-white rounded-md`}
                      >
                        {menu.status === 1 ? (
                          <FaToggleOn />
                        ) : (
                          <FaToggleOff />
                        )}
                      </button>
                      <button className="bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaEye className="text-sm" />
                      </button>
                      <button className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaEdit className="text-sm" />
                      </button>
                      <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </td>
                    <td className="text-center py-2 px-4 border-r border-gray-300">{menu.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MenuList;
