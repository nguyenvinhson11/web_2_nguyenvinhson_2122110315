import { useEffect, useState } from "react";
import PostService from "../../../services/PostService";
import TopicService from "../../../services/TopicService";

import { FaSave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

const BannerCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [topic_id, setTopic_id] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await TopicService.index();
      setTopics(result.topics);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = new FormData();
    const inputThumbnail = document.getElementById("thumbnail");
    const thumbnailFile = inputThumbnail.files;

    if (thumbnailFile.length > 0) {
      post.append("thumbnail", thumbnailFile[0]);
    }

    post.append("title", title);
    post.append("topic_id", topic_id);
    post.append("description", description);
    post.append("content", content);
    post.append("type", type);
    post.append("status", status);

    try {
      const result = await PostService.create(post);
      console.log(result);
    } catch (error) {
      console.error("API Error:", error.response.data);
    }

    for (let pair of post.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    navigate("/admin/post");

    console.log("két quả trước khi gửi,", post);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="p-3">
          <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
            <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
              Thêm bài viết
            </h1>
            <button
              type="submit"
              className="text-lg  ml-auto bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
            >
              <FaSave className="mr-1" />
              Lưu
            </button>

            <Link
              to="/admin/post"
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
                <label className="font-bold  ">Tên bài viết</label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-400 p-1 px-2 w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                <label className="font-bold">Nội dung</label>
                <textarea
                  value={content}
                  id="description"
                  rows="5"
                  className="border border-gray-400 p-1 px-2 w-full"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            <div className="basis-3/12">
              <div className="my-3">
                <label className="font-bold  ">Kiểu bài viết</label>
                <input
                  type="text"
                  id="type"
                  className="border border-gray-400 p-1 px-2 w-full"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="font-bold">Chủ đề</label>
                <select
                  id="topic_id"
                  value={topic_id}
                  onChange={(e) => setTopic_id(e.target.value)}
                  className="border p-1 px-2 w-full"
                >
                  <option value="">-- Chọn chủ đề --</option>
                  {topics &&
                    topics.length > 0 &&
                    topics.map((topic, index) => (
                      <option key={index} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="font-bold">Hình ảnh</label>
                <input
                  type="file"
                  multiple
                  id="thumbnail"
                  accept="thumbnail/png, thumbnail/jpeg, thumbnail/jpg"
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
