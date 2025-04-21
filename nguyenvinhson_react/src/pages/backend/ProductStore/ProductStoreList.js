import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import ProductStore from "../../../services/ProductStoreService";
import {
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Import các icon cần thiết

const ProductStoreList = () => {
  const [productstore, setProductStore] = useState([]);
  const urlImage =
    "http://localhost/website/nguyenvinhson_laravel/public/images/";
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductStore.index();
      console.log("ket qua", result);
      setProductStore(result.productstore);
    };
    fetchData();
  }, []);

  console.log(productstore);

  const handleStatusChange = async (id) => {
    try {
      const response = await ProductStore.status(id);

      if (response.status) {
        // Cập nhật trạng thái của banner trong danh sách mà không cần tải lại trang
        setProductStore((prevBanners) =>
          prevBanners.map((productstore) =>
            productstore.id === id
              ? { ...productstore, status: response.productstore.status }
              : productstore
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
              Quản lý kho
            </h1>
          </div>

          <div className="ml-auto">
            <button
              type="submit"
              className=" text-lg  ml-auto my-5 mr-5 bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
            >
              <Link
                className="flex items-center"
                to="/admin/productstore/create"
              >
                <IoMdAdd className="mr-1 up" />
                Nhập kho
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
              <th className="py-2 px-4 border-r border-gray-300">
                Tên sản phẩm
              </th>
              <th className="py-2 px-4 border-r border-gray-300">Số lượng</th>
              <th className="py-2 px-4 border-r border-gray-300">Giá gốc</th>
              <th className="py-2 px-4 border-r border-gray-300">
                Thương hiệu
              </th>
              <th className=" w-60 py-2 px-4 border-r border-gray-300">
                Chức năng
              </th>
              <th className="py-2 px-4 border-r border-gray-300">ID</th>
            </tr>
          </thead>
          <tbody>
            {productstore &&
              productstore.length > 0 &&
              productstore.map((product, index) => {
               

                return (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      <input type="checkbox" />
                    </td>
                    <td className="w-44 h-w-44 py-2 px-4 border-r border-gray-300">
                      {product.product &&
                      product.product.images &&
                      product.product.images.length > 0 ? (
                        product.product.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            className="w-full mb-2"
                            src={urlImage + "product/" + image.thumbnail}
                            alt={`${product.product.name} - ${imgIndex}`}
                          />
                        ))
                      ) : (
                        <p className="text-gray-500">Không có ảnh</p>
                      )}
                    </td>
                    <td className="py-2 px-4 border-r border-gray-300">
                      {product.product.name}
                    </td>
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      {product.qty}
                    </td>

                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      {new Intl.NumberFormat("vi-VN").format(
                        product.price_root
                      )}
                      đ
                    </td>

                    <td className="py-2 px-4 border-r border-gray-300">
                      {product.product.brand.name}
                    </td>

                    <td className="text-center py-2 px-4 border-r border-gray-300">
                    <button
                        onClick={() => handleStatusChange(product.id)}
                        className={`${
                          product.status === 1
                            ? "bg-green-500"
                            : "bg-red-500"
                        } py-1 px-2 mx-0.5 text-white rounded-md`}
                      >
                        {product.status === 1 ? (
                          <FaToggleOn />
                        ) : (
                          <FaToggleOff />
                        )}
                      </button>
                      <button className="bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md">
                      <Link to={`show/${product.id}`}>
                        <FaEye className="text-sm" />
                      </Link>
                      </button>
                      <button className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md">
                       
                      <Link to={`update/${product.id}`}>
                          <FaEdit className="text-sm" />
                        </Link>
                      </button>
                      <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </td>
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      {product.id}
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

export default ProductStoreList;
