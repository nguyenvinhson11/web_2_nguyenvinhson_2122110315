import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BannerService from "../../../services/BannerService";
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const BannerUpdate = () => {
  const urlImage = "http://localhost/website/nguyenvinhson_laravel/public/images/";
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  
  const [banner, setBanner] = useState({
    name: "",
    link: "",
    image: "",
    description: "",
    position: "slideshow", // Mặc định là 'slideshow'
    sort_order: 0,
    status: 1,
  });

  // Lấy dữ liệu cũ của banner
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BannerService.show(id);
        setBanner(result.banner);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu banner:", error);
      }
    };
    fetchData();
  }, [id]);

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bannerData = new FormData();

    // Thêm các thông tin vào FormData
    bannerData.append("name", banner.name);
    bannerData.append("link", banner.link);
    bannerData.append("description", banner.description);
    bannerData.append("position", banner.position);
    bannerData.append("sort_order", banner.sort_order);
    bannerData.append("status", banner.status);

    // Kiểm tra nếu có file hình ảnh mới được chọn
    const inputImage = document.getElementById("image");
    const imageFile = inputImage.files;
    if (imageFile.length > 0) {
      bannerData.append("image", imageFile[0]);
    }

    try {
      await BannerService.update(id, bannerData);
      navigate("/admin/banner"); 
    } catch (error) {
      console.error("Lỗi khi cập nhật banner:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
          <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
            Cập nhật banner
          </h1>
          <button
            type="submit"
            className="text-lg ml-auto bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
          >
            <FaSave className="mr-1" />
            Lưu
          </button>

          <Link
            to="/admin/banner"
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
              <label className="font-bold">Tên banner</label>
              <input
                type="text"
                id="name"
                className="border border-gray-400 p-1 px-2 w-full"
                value={banner.name}
                onChange={(e) => setBanner({ ...banner, name: e.target.value })}
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Link</label>
              <input
                type="text"
                id="link"
                className="border border-gray-400 p-1 px-2 w-full"
                value={banner.link}
                onChange={(e) => setBanner({ ...banner, link: e.target.value })}
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Mô tả</label>
              <textarea
                id="description"
                rows="5"
                className="border border-gray-400 p-1 px-2 w-full"
                value={banner.description}
                onChange={(e) => setBanner({ ...banner, description: e.target.value })}
              />
            </div>
          </div>

          <div className="basis-3/12">
            {/* Hình ảnh hiện tại */}
            {banner.image && (
              <div className="mb-3">
                <label className="font-bold">Hình</label>
                <img
                  className="w-48"
                  src={urlImage + "banner/" + banner.image}
                  alt={banner.name}
                />
              </div>
            )}

            {/* Cập nhật hình ảnh */}
            <div className="mb-3">
              <label className="font-bold">Cập nhật hình ảnh</label>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                className="border p-1 px-2 w-full"
              />
            </div>

            {/* Trạng thái */}
            <div className="mb-3">
              <label className="font-bold">Trạng thái</label>
              <select
                id="status"
                value={banner.status}
                onChange={(e) => setBanner({ ...banner, status: e.target.value })}
                className="border p-1 px-2 w-full"
              >
                <option value="0">Không hoạt động</option>
                <option value="1">Hoạt động</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BannerUpdate;
