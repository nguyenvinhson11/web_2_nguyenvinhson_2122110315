import "./App.css";

import logo from "./images/logo.webp";
import { FaSearch } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { PiEye } from "react-icons/pi";
import { FaMicrophone } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import Slider from "./slider";
import Flashsale from "./flash_sale";

function App1() {
  return (
    <>
      <div>
        <section className="header ">
          <div className="container max-w-7xl mt-3 py-5 mx-auto">
            <div className="grid grid-cols-12 ">
              <div className="col-span-2">
                <a href="#">
                  <img className="w-48" src={logo} alt="logo" />
                </a>
              </div>

              <div className=" search  col-span-5 flex items-center">
                <input
                  type="text"
                  className="form-control border border-gray-400 rounded-l-3xl py-2 px-3 w-full"
                  placeholder="Tìm kiếm"
                />
                <span className=" text-1xl px-3 py-3 bg-gray-700 text-white rounded-r-3xl ">
                  <FaSearch />
                </span>
                <span className=" text-2xl px-3 py-2 rounded-r-md text-gray-600">
                  <FaMicrophone />
                </span>
                <span className=" relative text-2xl px-3 py-2 rounded-r-md text-gray-600">
                  <FaRegBell />
                  <span className="absolute bottom-4 left-8 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    0
                  </span>
                </span>
              </div>

              <div className=" ml-10 tu van col-span-2 ">
                <div className="grid grid-cols-12 ">
                  <div className="col-span-2 flex items-center">
                    <span className="text-2xl text-gray-600">
                      <FaPhone />
                    </span>
                  </div>
                  <div className="col-span-10">
                    <p className="font-bold">Tư vấn </p>
                    <p className="text-red-600 font-bold">0961251656</p>
                  </div>
                </div>
              </div>

              <div className=" dang xuat gio col-span-3">
                <div className="grid grid-cols-12">
                  <div className="col-span-4   ">
                    <a
                      className="flex flex-col items-center hover:text-red-600"
                      href="#"
                    >
                      <p className="text-3xl text-gray-600 ">
                        <LuUser2 />
                      </p>
                      <p className="font-bold">Đăng nhập</p>
                    </a>
                  </div>

                  <div className="col-span-4 flex flex-col items-center  ">
                    <a
                      className="flex flex-col items-center hover:text-red-600 "
                      href="#"
                    >
                      <p className="text-3xl text-gray-600 font-bold">
                        <IoMdLogOut />
                      </p>
                      <p className="font-bold">Đăng xuất</p>
                    </a>
                  </div>

                  <div className="col-span-4 flex flex-col items-center relative">
                    <a
                      className="flex flex-col items-center hover:text-red-600"
                      href="#"
                    >
                      <p className="text-3xl text-gray-600 font-bold relative">
                        <BsCart2 />

                        <span className="absolute bottom-2 left-7 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          0
                        </span>
                      </p>
                      <p className="font-bold">Giỏ hàng</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="menu bg-red-600 mt-3 flex items-center ">
            <div className="container max-w-7xl  py-5 mx-auto">
              <div>
                <ul className="list-menu">
                  <li>
                    <a className="text-white" href="index.php">
                      Trang chủ
                    </a>
                  </li>
                  <li className="drop-menu ">
                    <a className="text-white" href="index.php?option=product">
                      Sản phẩm
                    </a>

                    <ul className="drop-menu-sub">
                      <li>
                        <a className="drop-menu-item" href="#">
                          Giày nam
                        </a>
                      </li>

                      <li>
                        <a className="drop-menu-item" href="#">
                          Giày nữ
                        </a>
                      </li>

                      <li>
                        <a className="drop-menu-item" href="#">
                          Giày đá banh
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="drop-menu ">
                    <a className="text-white" href="index.php?option=product">
                      Thương hiệu
                    </a>

                    <ul className="drop-menu-sub">
                      <li>
                        <a
                          className="drop-menu-item "
                          href="<?= $row['link'] ?>"
                        ></a>
                      </li>
                    </ul>
                  </li>

                  <li className="drop-menu ">
                    <a className="text-white" href="index.php?option=post">
                      Bài viết
                    </a>

                    <ul className="drop-menu-sub">
                      <li>
                        <a
                          className="drop-menu-item "
                          href="<?= $row['link'] ?>"
                        ></a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a className="text-white" href="index.php?option=contact">
                      Liên hệ
                    </a>
                  </li>
                  <li>
                    <a className="text-white" href="index.php?option=register">
                      Đăng ký
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </section>

        <section class="slide-show">
          <Slider />
        </section>

        <h1 className="mb-96"></h1>

        <section className="main ">
          <section className="flash-sale">
            <Flashsale />
          </section>

          <section className="product-new">
            <div className="container max-w-7xl  mx-auto ">
              <div className=" ">
                <h1 className="text-center bg-category py-7 my-20 uppercase text-4xl font-bold text-gray-800">
                  Sản phẩm mới nhất
                </h1>
                <div className="grid grid-cols-12">
                  <div className="col-span-3">
                    <div className="product-card">
                      <div className="product-item border bg-gray-100 transform hover:scale-105 transition-transform duration-300 mb-5 p-4">
                        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                          8%
                        </span>
                        <div className="product-image">
                          <img
                            style={{ objectFit: "cover" }}
                            className="w-full h-64"
                            src="/images/product/00002.webp"
                            alt="Product"
                          />
                        </div>
                        <div className="product-name  my-2">
                          <strong className="text-lg py-1">Giày đẹp</strong>
                        </div>
                        <div className="product-price">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              1000đ
                            </strong>
                            <del className="text-red-400">900đ</del>
                          </div>
                        </div>
                        <div className="product-cart-hearth-eye mt-4">
                          <div className="flex justify-between items-center">
                            <button className="btn btn-add-cart bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded">
                              Thêm vào giỏ hàng
                            </button>

                            <a
                              href="#"
                              className="text-white text-2xl rounded px-1 py-1 btn-eye  hover:bg-green-600"
                            >
                              <PiEye />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="product-card">
                      <div className="product-item border bg-gray-100 transform hover:scale-105 transition-transform duration-300 mb-5 p-4">
                        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                          8%
                        </span>
                        <div className="product-image">
                          <img
                            style={{ objectFit: "cover" }}
                            className="w-full h-64"
                            src="/images/product/00002.webp"
                            alt="Product"
                          />
                        </div>
                        <div className="product-name  my-2">
                          <strong className="text-lg py-1">Giày đẹp</strong>
                        </div>
                        <div className="product-price">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              1000đ
                            </strong>
                            <del className="text-red-400">900đ</del>
                          </div>
                        </div>
                        <div className="product-cart-hearth-eye mt-4">
                          <div className="flex justify-between items-center">
                            <button className="btn btn-add-cart bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded">
                              Thêm vào giỏ hàng
                            </button>

                            <a
                              href="#"
                              className="text-white text-2xl rounded px-1 py-1 btn-eye  hover:bg-green-600"
                            >
                              <PiEye />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="product-card">
                      <div className="product-item border bg-gray-100 transform hover:scale-105 transition-transform duration-300 mb-5 p-4">
                        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                          8%
                        </span>
                        <div className="product-image">
                          <img
                            style={{ objectFit: "cover" }}
                            className="w-full h-64"
                            src="/images/product/00002.webp"
                            alt="Product"
                          />
                        </div>
                        <div className="product-name  my-2">
                          <strong className="text-lg py-1">Giày đẹp</strong>
                        </div>
                        <div className="product-price">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              1000đ
                            </strong>
                            <del className="text-red-400">900đ</del>
                          </div>
                        </div>
                        <div className="product-cart-hearth-eye mt-4">
                          <div className="flex justify-between items-center">
                            <button className="btn btn-add-cart bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded">
                              Thêm vào giỏ hàng
                            </button>

                            <a
                              href="#"
                              className="text-white text-2xl rounded px-1 py-1 btn-eye  hover:bg-green-600"
                            >
                              <PiEye />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="product-card">
                      <div className="product-item border bg-gray-100 transform hover:scale-105 transition-transform duration-300 mb-5 p-4">
                        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                          8%
                        </span>
                        <div className="product-image">
                          <img
                            style={{ objectFit: "cover" }}
                            className="w-full h-64"
                            src="/images/product/00002.webp"
                            alt="Product"
                          />
                        </div>
                        <div className="product-name  my-2">
                          <strong className="text-lg py-1">Giày đẹp</strong>
                        </div>
                        <div className="product-price">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              1000đ
                            </strong>
                            <del className="text-red-400">900đ</del>
                          </div>
                        </div>
                        <div className="product-cart-hearth-eye mt-4">
                          <div className="flex justify-between items-center">
                            <button className="btn btn-add-cart bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded">
                              Thêm vào giỏ hàng
                            </button>

                            <a
                              href="#"
                              className="text-white text-2xl rounded px-1 py-1 btn-eye  hover:bg-green-600"
                            >
                              <PiEye />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3"></div>
              </div>
            </div>
          </section>

          <section className="product-sale">
            <div className="container max-w-7xl  mx-auto ">
              <div className=" ">
                <h1 className="text-center bg-category py-7 my-20 uppercase text-4xl font-bold text-gray-800">
                  Sản phẩm khuyến mãi
                </h1>
                <div className="grid grid-cols-12">
                  <div className="col-span-3">
                    <div className="product-card">
                      <div className="product-item border bg-gray-100 transform hover:scale-105 transition-transform duration-300 mb-5 p-4">
                        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                          8%
                        </span>
                        <div className="product-image">
                          <img
                            style={{ objectFit: "cover" }}
                            className="w-full h-64"
                            src="/images/product/00002.webp"
                            alt="Product"
                          />
                        </div>
                        <div className="product-name  my-2">
                          <strong className="text-lg py-1">Giày đẹp</strong>
                        </div>
                        <div className="product-price">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              1000đ
                            </strong>
                            <del className="text-red-400">900đ</del>
                          </div>
                        </div>
                        <div className="product-cart-hearth-eye mt-4">
                          <div className="flex justify-between items-center">
                            <button className="btn btn-add-cart bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded">
                              Thêm vào giỏ hàng
                            </button>

                            <a
                              href="#"
                              className="text-white text-2xl rounded px-1 py-1 btn-eye  hover:bg-green-600"
                            >
                              <PiEye />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="product-card">
                      <div className="product-item border bg-gray-100 transform hover:scale-105 transition-transform duration-300 mb-5 p-4">
                        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                          8%
                        </span>
                        <div className="product-image">
                          <img
                            style={{ objectFit: "cover" }}
                            className="w-full h-64"
                            src="/images/product/00002.webp"
                            alt="Product"
                          />
                        </div>
                        <div className="product-name  my-2">
                          <strong className="text-lg py-1">Giày đẹp</strong>
                        </div>
                        <div className="product-price">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              1000đ
                            </strong>
                            <del className="text-red-400">900đ</del>
                          </div>
                        </div>
                        <div className="product-cart-hearth-eye mt-4">
                          <div className="flex justify-between items-center">
                            <button className="btn btn-add-cart bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded">
                              Thêm vào giỏ hàng
                            </button>

                            <a
                              href="#"
                              className="text-white text-2xl rounded px-1 py-1 btn-eye  hover:bg-green-600"
                            >
                              <PiEye />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="product-card">
                      <div className="product-item border bg-gray-100 transform hover:scale-105 transition-transform duration-300 mb-5 p-4">
                        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                          8%
                        </span>
                        <div className="product-image">
                          <img
                            style={{ objectFit: "cover" }}
                            className="w-full h-64"
                            src="/images/product/00002.webp"
                            alt="Product"
                          />
                        </div>
                        <div className="product-name  my-2">
                          <strong className="text-lg py-1">Giày đẹp</strong>
                        </div>
                        <div className="product-price">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              1000đ
                            </strong>
                            <del className="text-red-400">900đ</del>
                          </div>
                        </div>
                        <div className="product-cart-hearth-eye mt-4">
                          <div className="flex justify-between items-center">
                            <button className="btn btn-add-cart bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded">
                              Thêm vào giỏ hàng
                            </button>

                            <a
                              href="#"
                              className="text-white text-2xl rounded px-1 py-1 btn-eye  hover:bg-green-600"
                            >
                              <PiEye />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="product-card">
                      <div className="product-item border bg-gray-100 transform hover:scale-105 transition-transform duration-300 mb-5 p-4">
                        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                          8%
                        </span>
                        <div className="product-image">
                          <img
                            style={{ objectFit: "cover" }}
                            className="w-full h-64"
                            src="/images/product/00002.webp"
                            alt="Product"
                          />
                        </div>
                        <div className="product-name  my-2">
                          <strong className="text-lg py-1">Giày đẹp</strong>
                        </div>
                        <div className="product-price">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              1000đ
                            </strong>
                            <del className="text-red-400">900đ</del>
                          </div>
                        </div>
                        <div className="product-cart-hearth-eye mt-4">
                          <div className="flex justify-between items-center">
                            <button className="btn btn-add-cart bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded">
                              Thêm vào giỏ hàng
                            </button>

                            <a
                              href="#"
                              className="text-white text-2xl rounded px-1 py-1 btn-eye  hover:bg-green-600"
                            >
                              <PiEye />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3"></div>
              </div>
            </div>
          </section>
        </section>

        <section className="footer bg-footer  ">
          <div className="container  max-w-7xl py-5 mx-auto">
            <div className=" grid-cols-12 flex justify-between">
              <div className="col-span-4">
                <h4 className="uppercase text-2xl font-bold my-4">
                  Chính sách
                </h4>
                <ul className=" space-y-2 ">
                  <li>
                    <a className="font-bold hover:text-red-600" href="#">
                      Chính sách bảo hành
                    </a>
                  </li>
                  <li>
                    <a className="font-bold hover:text-red-600" href="#">
                      Chính sách vận chuyển
                    </a>
                  </li>
                  <li>
                    <a className="font-bold hover:text-red-600" href="#">
                      Chính sách mua hàng
                    </a>
                  </li>
                  <li>
                    <a className="font-bold hover:text-red-600" href="#">
                      Chính sách đổi trả
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-span-4">
                <h4 className="uppercase text-2xl font-bold my-4">
                  Thương hiệu nổi bật
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a className="font-bold hover:text-red-600" href="#">
                      Converse
                    </a>
                  </li>
                  <li>
                    <a className="font-bold hover:text-red-600" href="#">
                      Adidas
                    </a>
                  </li>
                  <li>
                    <a className="font-bold hover:text-red-600" href="">
                      Nike
                    </a>
                  </li>
                  <li>
                    <a className="font-bold hover:text-red-600" href="#">
                      Puma
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-span-4 contact-icon">
                <h4 className="uppercase text-2xl font-bold my-4 ">
                  Liên hệ với chúng tôi
                </h4>
                <div className="flex justify-around">
                  <img
                    className="rounded-full w-16 h-16 inline-block "
                    src="images/footer/facebook.png"
                  ></img>
                  <img
                    className="rounded-full w-16 h-16 inline-block "
                    src="images/footer/instagram.png"
                  ></img>
                  <img
                    className="rounded-full w-16 h-16 inline-block "
                    src="images/footer/zalo.png"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="copyrigt bg-footer ">
          <div className=" container  max-w-7xl  mx-auto border-t py-5 text-center ">
            <p>Bản quyền thuộc về Nguyễn Vinh Sơn</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App1;
