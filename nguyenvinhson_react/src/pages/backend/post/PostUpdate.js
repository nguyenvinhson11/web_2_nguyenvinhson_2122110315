import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostService from "../../../services/PostService";
import TopicService from "../../../services/TopicService";

import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const PostUpdate = () => {
  const urlImage =
    "http://localhost/website/nguyenvinhson_laravel/public/images/";
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    topic_id: "",
    description: "",
    content: "",
    type: "",
    status: "",
    thumbnail: "",
  });
  const [topics, setTopics] = useState([]);

  // Lấy dữ liệu cũ của bài viết
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy thông tin bài viết dựa trên ID
        const result = await PostService.show(id);
        setPost(result.post);
        // Lấy danh sách chủ đề
        const topicsResult = await TopicService.index();
        setTopics(topicsResult.topics);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài viết:", error);
      }
    };
    fetchData();
  }, [id]);

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();

    // Thêm các thông tin khác vào FormData
    postData.append("title", post.title);
    postData.append("topic_id", post.topic_id);
    postData.append("description", post.description);
    postData.append("content", post.content);
    postData.append("type", post.type);
    postData.append("status", post.status);

    // Kiểm tra nếu có file hình ảnh mới được chọn
    const inputThumbnail = document.getElementById("thumbnail");
    const thumbnailFile = inputThumbnail.files;
    if (thumbnailFile.length > 0) {
      postData.append("thumbnail", thumbnailFile[0]);
    }

    try {
      await PostService.update(id, postData);
      navigate("/admin/post"); 
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
          <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
            Cập nhật bài viết
          </h1>
          <button
            type="submit"
            className="text-lg ml-auto bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
          >
            <FaSave className="mr-1" />
            Lưu
          </button>

          <Link
            to="/admin/post"
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
              <label className="font-bold">Tên bài viết</label>
              <input
                type="text"
                id="title"
                className="border border-gray-400 p-1 px-2 w-full"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Miêu tả</label>
              <textarea
                id="description"
                rows="5"
                className="border border-gray-400 p-1 px-2 w-full"
                value={post.description}
                onChange={(e) =>
                  setPost({ ...post, description: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Nội dung</label>
              <textarea
                id="content"
                rows="5"
                className="border border-gray-400 p-1 px-2 w-full"
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
              />
            </div>
          </div>

          <div className="basis-3/12">
            {/* Chủ đề */}
            <div className="mb-3">
              <label className="font-bold">Chủ đề</label>
              <select
                id="topic_id"
                value={post.topic_id}
                onChange={(e) => setPost({ ...post, topic_id: e.target.value })}
                className="border p-1 px-2 w-full"
              >
                <option value="">-- Chọn chủ đề --</option>
                {topics.map((topic, index) => (
                  <option key={index} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Kiểu bài viết */}
            <div className="mb-3">
              <label className="font-bold">Kiểu bài viết</label>
              <input
                type="text"
                id="type"
                className="border border-gray-400 p-1 px-2 w-full"
                value={post.type}
                onChange={(e) => setPost({ ...post, type: e.target.value })}
              />
            </div>

            {/* Hình ảnh hiện tại */}
            {post.thumbnail && (
              <div className="mb-3">
                <label className="font-bold">Hình</label>
                <img
                  className="w-48"
                  src={urlImage + "post/" + post.thumbnail}
                  alt={post.title}
                />
              </div>
            )}

            {/* Cập nhật hình ảnh */}
            <div className="mb-3">
              <label className="font-bold">Cập nhật hình ảnh</label>
              <input
                type="file"
                id="thumbnail"
                accept="image/png, image/jpeg"
                className="border p-1 px-2 w-full"
              />
            </div>

            {/* Trạng thái */}
            <div className="mb-3">
              <label className="font-bold">Trạng thái</label>
              <select
                id="status"
                value={post.status}
                onChange={(e) => setPost({ ...post, status: e.target.value })}
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
  );
};

export default PostUpdate;
