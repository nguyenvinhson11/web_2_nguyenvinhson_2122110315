import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import ProductStoreService from "../../../services/ProductStoreService"; // Service để xử lý ProductStore
import ProductService from "../../../services/ProductService";
import { RiArrowGoBackFill } from "react-icons/ri";

const ProductStoreCreate = () => {
  const navigate = useNavigate();

  // State cho danh sách sản phẩm và các giá trị của form
  const [products, setProducts] = useState([]);
  const [product_id, setProductId] = useState(null);
  const [qty, setQty] = useState(1);
  const [price_root, setPrice_root] = useState([]);
  

  // Lấy danh sách sản phẩm khi component được render lần đầu
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductService.index();
      setProducts(result.products);
    };
    fetchData();
  }, []);

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productstore = {
      product_id: product_id,
      price_root: price_root,
      qty: qty,
      
    };
    console.log( "dữ liệu trước khi gửi", productstore);
    try {
      const result = await ProductStoreService.create(productstore);
      console.log(result);
      navigate("/admin/productstore");
    } catch (error) {
      console.error("lỗi từ server",error.response); 
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
          <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
            Thêm sản phẩm vào kho
          </h1>
          <button
            type="submit"
            className="text-lg  ml-auto bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
          >
            <FaSave className="mr-1" />
            Lưu
          </button>

          <Link
            to="/admin/productstore"
            className="text-lg  bg-admin hover:bg-slate-600 ml-1 py-1 px-2 text-white rounded-md flex items-center"
          >
            <RiArrowGoBackFill className="mr-1 " />
            Quay lại
          </Link>
        </div>
      </div>

      {/* Form chọn sản phẩm */}
      <div className="m-3 p-3 bg-white rounded-lg px-3 py-5">
        <div className="mb-3">
          <label className="font-bold">Sản phẩm</label>
          <input
            list="product_list"
            className="border border-gray-400 p-1 px-2 w-full"
            onChange={(e) => setProductId(e.target.value)}
          />
          <datalist id="product_list">
            {products &&
              products.length > 0 &&
              products.map((product, index) => (
                <option key={index} value={product.id}>
                  {product.name}
                </option>
              ))}
          </datalist>
        </div>

        {/* Số lượng sản phẩm */}
        <div className="mb-3">
          <label className="font-bold">Số lượng</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border border-gray-400 p-1 px-2 w-full"
          />
        </div>

        {/* Ngày nhập kho */}
        <div className="mb-3">
          <label className="font-bold">Giá gốc</label>
          <input
            type="number"
            value={price_root}
            onChange={(e) => setPrice_root(e.target.value)}
            className="border border-gray-400 p-1 px-2 w-full"
          />
        </div>
      </div>
    </form>
  );
};

export default ProductStoreCreate;
