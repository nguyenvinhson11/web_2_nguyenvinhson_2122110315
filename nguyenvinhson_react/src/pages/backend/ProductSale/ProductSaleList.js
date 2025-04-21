import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import ProductSaleService from "../../../services/ProductSaleService";
import {
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Import các icon cần thiết

const ProductList = () => {
  const urlImage =
    "http://localhost/website/nguyenvinhson_laravel/public/images/";
  const [productSale, setProductSale] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductSaleService.index();
      setProductSale(result.productsales); // Chỉnh đúng tên trả về từ API
    };
    fetchData();
  }, []);

  console.log("Sản phẩm khuyến mãi", productSale);

  const handleStatusChange = async (id) => {
    try {
      const response = await ProductSaleService.status(id);

      if (response.status) {
        // Cập nhật trạng thái của banner trong danh sách mà không cần tải lại trang
        setProductSale((prevBanners) =>
          prevBanners.map((product) =>
            product.id === id
              ? { ...product, status: response.product.status }
              : product
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
        <div className="flex">
          <div>
            <h1 className="uppercase text-2xl font-bold ml-4 my-5">
              sản phẩm khuyến mãi
            </h1>
          </div>

          <div className="ml-auto">
            <button
              type="submit"
              className="text-lg  ml-auto my-5 mr-5 bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
            >
              <Link
                className="flex items-center"
                to="/admin/productsale/create"
              >
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
              <th className="py-2 px-4 border-r border-gray-300">
                Tên sản phẩm
              </th>
              <th className="py-2 px-4 border-r border-gray-300">Giá sale</th>
              <th className="py-2 px-4 border-r border-gray-300">
                Ngày bắt đầu
              </th>
              <th className="py-2 px-4 border-r border-gray-300">
                Ngày kết thúc
              </th>
              <th className=" w-60 py-2 px-4 border-r border-gray-300">
                Chức năng
              </th>
              <th className="py-2 px-4 border-r border-gray-300">ID</th>
            </tr>
          </thead>
          <tbody>
            {productSale &&
              productSale.length > 0 &&
              productSale.map((productSale, index) => {
                return (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      <input key={index} type="checkbox" />
                    </td>
                    <td className="w-44 h-w-44 py-2 px-4 border-r border-gray-300">
                      {productSale.product &&
                      productSale.product.images &&
                      productSale.product.images.length > 0 ? (
                        <img
                          className="w-full mb-2"
                          src={
                            urlImage +
                            "product/" +
                            productSale.product.images[0].thumbnail
                          }
                          alt={`${productSale.product.name}`}
                        />
                      ) : (
                        <p>Không có hình ảnh</p> // Hoặc có thể hiển thị hình ảnh mặc định
                      )}
                    </td>

                    <td className="py-2 px-4 border-r border-gray-300">
                      {productSale.product.name}
                    </td>

                    <td className="py-2 px-4 border-r text-center border-gray-300">
                      {new Intl.NumberFormat("vi-VN").format(
                        productSale.price_sale
                      )}
                      đ
                    </td>

                    <td className="py-2 px-4 border-r text-center border-gray-300">
                      {productSale.date_begin}
                    </td>
                    <td className="py-2 px-4 border-r text-center border-gray-300">
                      {productSale.date_end}
                    </td>

                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      <button
                        onClick={() => handleStatusChange(productSale.id)}
                        className={`${
                          productSale.status === 1
                            ? "bg-green-500"
                            : "bg-red-500"
                        } py-1 px-2 mx-0.5 text-white rounded-md`}
                      >
                        {productSale.status === 1 ? (
                          <FaToggleOn />
                        ) : (
                          <FaToggleOff />
                        )}
                      </button>
                      <button className="bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <Link to={`show/${productSale.id}`}>
                          <FaEye className="text-sm" />
                        </Link>
                      </button>
                      <button className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <Link to={`update/${productSale.id}`}>
                          <FaEdit className="text-sm" />
                        </Link>
                      </button>
                      <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </td>
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      {productSale.id}
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

export default ProductList;
