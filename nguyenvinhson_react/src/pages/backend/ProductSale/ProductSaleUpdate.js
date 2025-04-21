import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductSaleService from "../../../services/ProductSaleService"; // Import service for product sale
import ProductService from "../../../services/ProductService"; // Service to get products
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProductSaleUpdate = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  const [products, setProducts] = useState([]); // List of products
  const [product_id, setProductId] = useState(null);
  const [price_sale, setPriceSale] = useState(0);
  const [date_begin, setDateBegin] = useState("");
  const [date_end, setDateEnd] = useState("");
  const [status, setStatus] = useState(1);

  // Fetch the data for the selected product sale
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get product sale data
        const saleData = await ProductSaleService.show(id);
        setProductId(saleData.productSale.product_id);
        setPriceSale(saleData.productSale.price_sale);
        setDateBegin(saleData.productSale.date_begin);
        setDateEnd(saleData.productSale.date_end);
        setStatus(saleData.productSale.status);

        // Get list of products
        const productData = await ProductService.index();
        setProducts(productData.products);
      } catch (error) {
        console.error("Error fetching product sale data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productSaleData = {
      product_id,
      price_sale,
      date_begin,
      date_end,
      status,
    };

    try {
      // Update the product sale
      await ProductSaleService.update(id, productSaleData);
      navigate("/admin/productsale"); // Redirect to product sale list page
    } catch (error) {
      console.error("Error updating product sale:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
          <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
            Cập nhật sản phẩm khuyến mãi
          </h1>
          <button
            type="submit"
            className="text-lg ml-auto bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
          >
            <FaSave className="mr-1" />
            Lưu
          </button>

          <Link
            to="/admin/productsale"
            className="text-lg bg-admin hover:bg-slate-600 ml-1 py-1 px-2 text-white rounded-md flex items-center"
          >
            <RiArrowGoBackFill className="mr-1" />
            Quay lại
          </Link>
        </div>
      </div>

      <div className="m-3 p-3 bg-white rounded-lg px-3 py-5">
        <div className="flex flex-row gap-8">
          <div className="basis-9/12">
            <div className="my-3">
              <label className="font-bold">Sản phẩm</label>
              <select
                value={product_id || ""}
                onChange={(e) => setProductId(e.target.value)}
                className="border border-gray-400 p-1 px-2 w-full"
              >
                <option value="">-- Chọn sản phẩm --</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-3">
              <label className="font-bold">Giá khuyến mãi</label>
              <input
                type="number"
                className="border border-gray-400 p-1 px-2 w-full"
                value={price_sale || ""}
                onChange={(e) => setPriceSale(e.target.value)}
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Ngày bắt đầu</label>
              <input
                type="datetime-local"
                className="border border-gray-400 p-1 px-2 w-full"
                value={date_begin || ""}
                onChange={(e) => setDateBegin(e.target.value)}
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Ngày kết thúc</label>
              <input
                type="datetime-local"
                className="border border-gray-400 p-1 px-2 w-full"
                value={date_end || ""}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
          </div>

          <div className="basis-3/12">
            {/* Trạng thái */}
            <div className="mb-3">
              <label className="font-bold">Trạng thái</label>
              <select
                value={status || ""}
                onChange={(e) => setStatus(e.target.value)}
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

export default ProductSaleUpdate;
