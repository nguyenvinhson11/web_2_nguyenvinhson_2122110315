import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductStoreService from "../../../services/ProductStoreService"; // Import service to fetch product store data
import { RiArrowGoBackFill } from "react-icons/ri"; // Import back icon for navigation

const ProductStoreShow = () => {
  const { id } = useParams(); // Get the id from the URL
  const [productStore, setProductStore] = useState({
    product_id: "",
    price_root: "",
    qty: "",
    status: "",
    created_at: "",
    updated_at: "",
    created_by: "",
    updated_by: "",
  });

  // Fetch product store data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductStoreService.show(id); // Fetch the product store data from the service
        setProductStore(result.productstore); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching product store data:", error);
      }
    };
    if (id) {
      fetchData(); // Only fetch if id is present
    }
  }, [id]);

  return (
    <div className="p-3">
      <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
        <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
          Chi tiết sản phẩm trong kho
        </h1>
        <Link
          to="/admin/productstore"
          className="text-lg bg-admin hover:bg-slate-600 ml-auto py-1 px-2 text-white rounded-md flex items-center"
        >
          <RiArrowGoBackFill className="mr-1" />
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
              <td className="border px-4 py-2">{productStore.id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Sản phẩm ID</td>
              <td className="border px-4 py-2">{productStore.product_id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Giá gốc</td>
              <td className="border px-4 py-2">{productStore.price_root}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Số lượng</td>
              <td className="border px-4 py-2">{productStore.qty}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Trạng thái</td>
              <td className="border px-4 py-2">
                {productStore.status === 1 ? "Kích hoạt" : "Không kích hoạt"}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày tạo</td>
              <td className="border px-4 py-2">{productStore.created_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày cập nhật</td>
              <td className="border px-4 py-2">{productStore.updated_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người tạo</td>
              <td className="border px-4 py-2">{productStore.created_by}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người cập nhật</td>
              <td className="border px-4 py-2">{productStore.updated_by}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductStoreShow;
