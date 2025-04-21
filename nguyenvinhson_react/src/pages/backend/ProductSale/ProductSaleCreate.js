import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa"; // Import icon lưu
import ProductSaleService from "../../../services/ProductSaleService";
import ProductService from "../../../services/ProductService";
import { RiArrowGoBackFill } from "react-icons/ri";

const ProductSaleCreate = () => {
  const navigate = useNavigate();

  // State cho danh sách sản phẩm và các giá trị của form
  const [products, setProducts] = useState([]);
  const [product_id, setProductId] = useState(null);
  const [date_begin, setDateBegin] = useState(null);
  const [date_end, setDateEnd] = useState(null);
  const [price_sale, setPriceSale] = useState(0);

  // Lấy danh sách sản phẩm khi component được render lần đầu
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductService.index();
      setProducts(result.products);
    };
    fetchData();
  }, []);

  // Hàm format lại định dạng ngày
  const formatDateTime = (strdate) => {
    if (strdate != null) {
      const arr = strdate.split("T");
      return arr.join(" ") + ":00";
    }
    return strdate;
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productsale = {
      product_id: product_id,
      date_begin: formatDateTime(date_begin),
      date_end: formatDateTime(date_end),
      price_sale: price_sale,
    };
    const result = await ProductSaleService.create(productsale);
    console.log(result);
    navigate("/admin/productsale"); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
          <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
            Thêm sản phẩm khuyến mãi
          </h1>
          <button
            type="submit"
            className="text-lg  ml-auto bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
          >
            <FaSave className="mr-1" />
            Lưu
          </button>

          <Link
            to="/admin/productsale"
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

        {/* Ngày bắt đầu */}
        <div className="mb-3">
          <label className="font-bold">Ngày bắt đầu</label>
          <input
            type="datetime-local"
            value={date_begin}
            onChange={(e) => setDateBegin(e.target.value)}
            className="border border-gray-400 p-1 px-2 w-full"
          />
        </div>

        {/* Ngày kết thúc */}
        <div className="mb-3">
          <label className="font-bold">Ngày kết thúc</label>
          <input
            type="datetime-local"
            value={date_end}
            onChange={(e) => setDateEnd(e.target.value)}
            className="border border-gray-400 p-1 px-2 w-full"
          />
        </div>

        {/* Giá khuyến mãi */}
        <div className="mb-3">
          <label className="font-bold">Giá khuyến mãi</label>
          <input
            type="number"
            value={price_sale}
            onChange={(e) => setPriceSale(e.target.value)}
            className="border border-gray-400 p-1 px-2 w-full"
          />
        </div>
      </div>
    </form>
  );
};

export default ProductSaleCreate;
