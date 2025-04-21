import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductStoreService from "../../../services/ProductStoreService"; // Import service for handling API requests
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProductStoreUpdate = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  // Initialize state with empty values to prevent undefined errors
  const [productStore, setProductStore] = useState({
    product_id: "",
    price_root: "",
    qty: "",
    status: "",
  });

  // Fetch existing product store data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductStoreService.show(id); // Call the service to get the product data
        if (result.productstore) {
          setProductStore(result.productstore); // Set product data to the state
        }
      } catch (error) {
        console.error("Error fetching product store data:", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle form submission to update product store data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productStoreData = new FormData();

    productStoreData.append("product_id", productStore.product_id);
    productStoreData.append("price_root", productStore.price_root);
    productStoreData.append("qty", productStore.qty);
    productStoreData.append("status", productStore.status);

    try {
      await ProductStoreService.update(id, productStoreData); // Call service to update product data
      navigate("/admin/productstore"); // Redirect back to the product store list
    } catch (error) {
      console.error("Error updating product store:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
          <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
            Cập nhật sản phẩm trong kho
          </h1>
          <button
            type="submit"
            className="text-lg ml-auto bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
          >
            <FaSave className="mr-1" />
            Lưu
          </button>

          <Link
            to="/admin/productstore"
            className="text-lg bg-admin hover:bg-slate-600 ml-1 py-1 px-2 text-white rounded-md flex items-center"
          >
            <RiArrowGoBackFill className="mr-1 " />
            Quay lại
          </Link>
        </div>
      </div>

      <div className="m-3 p-3 bg-white rounded-lg px-3 py-5">
        <div className="flex flex-row gap-8">
          <div className="basis-9/12">
            <div className="my-3">
              <label className="font-bold">Sản phẩm</label>
              <input
                type="text"
                className="border border-gray-400 p-1 px-2 w-full"
                value={productStore.product_id || ""}
                onChange={(e) =>
                  setProductStore({ ...productStore, product_id: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Giá gốc</label>
              <input
                type="number"
                className="border border-gray-400 p-1 px-2 w-full"
                value={productStore.price_root || ""}
                onChange={(e) =>
                  setProductStore({ ...productStore, price_root: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Số lượng</label>
              <input
                type="number"
                className="border border-gray-400 p-1 px-2 w-full"
                value={productStore.qty || ""}
                onChange={(e) =>
                  setProductStore({ ...productStore, qty: e.target.value })
                }
              />
            </div>
          </div>

          <div className="basis-3/12">
            <div className="mb-3">
              <label className="font-bold">Trạng thái</label>
              <select
                value={productStore.status || ""}
                onChange={(e) =>
                  setProductStore({ ...productStore, status: e.target.value })
                }
                className="border p-1 px-2 w-full"
              >
                <option value="0">Không kích hoạt</option>
                <option value="1">Kích hoạt</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductStoreUpdate;
