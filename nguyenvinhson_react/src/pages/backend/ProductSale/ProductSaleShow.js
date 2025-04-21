import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductSaleService from "../../../services/ProductSaleService"; // Import service for handling API requests

const ProductSaleShow = () => {
  const { id } = useParams(); // Get ID from URL
  
    const [productSale, setProductSale] = useState({
    product_id: 0,
    price_sale: 0,
    date_begin: "",
    date_end: "",
    created_at: "",
    created_by: 0,
    updated_at: "",
    updated_by: 0,
    status: 1,
});

  // Fetch the product sale data
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductSaleService.index();
      setProductSale(result.productsales); // Chỉnh đúng tên trả về từ API
    };
    fetchData();
  }, [id]);

  return (
    <div className="p-3">
      <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
        <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
          Chi tiết sản phẩm khuyến mãi
        </h1>
        <Link
          to="/admin/productsale"
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
              <td className="border px-4 py-2">{productSale.id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Product ID</td>
              <td className="border px-4 py-2">{productSale.product_id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Giá khuyến mãi</td>
              <td className="border px-4 py-2">{productSale.price_sale}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày bắt đầu</td>
              <td className="border px-4 py-2">{productSale.date_begin}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày kết thúc</td>
              <td className="border px-4 py-2">{productSale.date_end}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày tạo</td>
              <td className="border px-4 py-2">{productSale.created_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày cập nhật</td>
              <td className="border px-4 py-2">{productSale.updated_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người tạo</td>
              <td className="border px-4 py-2">{productSale.created_by}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người cập nhật</td>
              <td className="border px-4 py-2">{productSale.updated_by}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Trạng thái</td>
              <td className="border px-4 py-2">
                {productSale.status === 1 ? "Hoạt động" : "Không hoạt động"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSaleShow;
