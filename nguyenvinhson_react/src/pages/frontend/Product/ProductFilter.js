import React, { useState, useEffect } from "react";
import ProductService from "../../../services/ProductService";
import CategoryService from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";
import { Link } from "react-router-dom";
import { LiaCartPlusSolid } from "react-icons/lia";
import { PiEye } from "react-icons/pi";

const ProductFilter = () => {
  const urlImage =
    "http://localhost/website/nguyenvinhson_laravel/public/images/";
  // State cho các tiêu chí lọc
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 });

  // State để lưu sản phẩm sau khi lọc
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await CategoryService.index();
        setCategories(result.categorys || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const result = await BrandService.index();
        setBrands(result.brands || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const handleFilter = async () => {
    try {
      const result = await ProductService.productByCriteria(
        selectedCategory,
        selectedBrand,
        priceRange.min,
        priceRange.max
      );
      
      setFilteredProducts(result.products || []); // Cập nhật danh sách sản phẩm sau khi lọc
      
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto mt-20">
      <h2 className="text-2xl text-center font-bold mb-20">Lọc Sản Phẩm</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-bold mb-2">Danh mục</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded"
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="">Không có danh mục</option>
            )}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-2">Thương hiệu</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded"
          >
            {brands.length > 0 ? (
              brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))
            ) : (
              <option value="">Không có thương hiệu</option>
            )}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-2">Khoảng giá</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
              placeholder="Từ"
              className="w-1/2 border border-gray-400 p-2 rounded"
            />
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
              placeholder="Đến"
              className="w-1/2 border border-gray-400 p-2 rounded"
            />
          </div>
        </div>
      </div>
      <div className="my-10 text-center">
        <button
          onClick={handleFilter}
          className="bg-pink-700 hover:bg-pink-600  text-white py-2  px-8 font-bold rounded"
        >
          Lọc
        </button>
      </div>

      {/* Khu vực hiển thị sản phẩm */}
      <div className="mt-6 grid grid-cols-12 ">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => {
            return (
              <div key={product.id} className="col-span-3 ">
                <div className="wrap">
                  <div className="in">
                    <div className="product-card ">
                      <div className="product-item transform hover:scale-105 transition-transform duration-300  p-3">
                        {product.price_sale !== null && (
                          <span className="bg-main text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                            {Math.floor(
                              ((product.price - product.price_sale) /
                                product.price) *
                                100
                            )}
                            %
                          </span>
                        )}

                        <div className="product-image">
                          {product.images.map((image, imgIndex) => (
                            <img
                              key={imgIndex}
                              className="w-full mb-2"
                              src={urlImage + "product/" + image.thumbnail}
                              alt={`${product.name} - ${imgIndex}`}
                            />
                          ))}
                        </div>
                        <div className="product-name  my-2">
                          <strong className="text-lg py-1">
                            {product.name}
                          </strong>
                        </div>
                        <div className="product-price">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              {new Intl.NumberFormat("vi-VN").format(
                                product.price_sale ?? product.price
                              )}
                              đ
                            </strong>
                            <del className="">
                              {new Intl.NumberFormat("vi-VN").format(
                                product.price
                              )}
                              đ
                            </del>
                          </div>
                        </div>
                        <div className="product-cart-hearth-eye mt-4">
                          <div className="flex justify-between items-center">
                            <button className=" flex items-center   bg-addcard hover:bg-red-600  text-white text-sm font-bold py-1.5 px-4 rounded">
                              <LiaCartPlusSolid className="mr-1 text-2xl " />
                              <p>Thêm vào giỏ hàng</p>
                            </button>

                            <Link
                              to="#"
                              className="text-white text-2xl rounded px-1 py-1 bg-main  hover:bg-red-600"
                            >
                              <PiEye />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-12 text-center">
            <p className="text-xl mb-10 font-bold">Không có sản phẩm cần tìm</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
