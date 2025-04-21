import { useEffect, useState } from "react";
import BannerService from "../../../services/BannerService";

import { FaSave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

const BannerCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [sort_order, setSort_order] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await BannerService.index();
      setBanners(result.banners);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const banner = new FormData();
    const inputImage = document.getElementById("image");
    const imageFile = inputImage.files;

    if (imageFile.length > 0) {
      banner.append("image", imageFile[0]);
    }

    banner.append("name", name);
    banner.append("description", description);
    banner.append("position", position);
    banner.append("sort_order", sort_order || 1);
    banner.append("status", status);

    try {
      const result = await BannerService.create(banner);
      console.log(result);
    } catch (error) {
      
      console.error("API Error:", error.response.data);
    }

    for (let pair of banner.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    navigate("/admin/banner"); 
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="p-3">
          <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
            <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
              Thêm banner
            </h1>
            <button
              type="submit"
              className="text-lg  ml-auto bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
            >
              <FaSave className="mr-1" />
              Lưu
            </button>

            <Link
              to="/admin/banner"
              className="text-lg  bg-admin hover:bg-slate-600 ml-1 py-1 px-2 text-white rounded-md flex items-center"
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
                <label className="font-bold  ">Tên banner</label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-400 p-1 px-2 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="my-3">
                <label className="font-bold">Miêu tả</label>
                <textarea
                  value={description}
                  id="description"
                  rows="5"
                  className="border border-gray-400 p-1 px-2 w-full"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="my-3">
                <label className="font-bold  ">Vị trí</label>
                <input
                  type="text"
                  id="position"
                  className="border border-gray-400 p-1 px-2 w-full"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </div>

            <div className="basis-3/12">
              <div className="mb-3">
                <label className="font-bold">Sắp xếp</label>
                <select
                  id="sort_order"
                  value={sort_order}
                  onChange={(e) => setSort_order(e.target.value)}
                  className="border p-1 px-2 w-full"
                >
                  {banners && banners.length > 0 ? (
                    banners.map((banner, index) => (
                      <option key={index} value={index + 1}>
                        Sau: {banner.name}
                      </option>
                    ))
                  ) : (
                    <option value={1}>Đây là banner đầu tiên</option>
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label className="font-bold">Hình ảnh</label>
                <input
                  type="file"
                  multiple
                  id="image"
                  accept="image/png, image/jpeg, image/jpg"
                  className="border p-1 px-2 w-full"
                />
              </div>

              <div className="mb-3">
                <label className="font-bold">Trạng thái</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => {
                    console.log("Selected status:", e.target.value); // Kiểm tra giá trị được chọn
                    setStatus(e.target.value);
                  }}
                  className="border p-1 px-2 w-full"
                >
                  <option value="0">Chưa xuất bản</option>
                  <option value="1">Xuất bản</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BannerCreate;
