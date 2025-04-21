import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopicService from "../../../services/TopicService";
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const TopicUpdate = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  const [topic, setTopic] = useState({
    name: "",
    slug: "",
    description: "",
    sort_order: 0,
    status: 1,
  });

  // Fetch existing topic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TopicService.show(id);
        setTopic(result.topic);
      } catch (error) {
        console.error("Error fetching topic data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Handle form submission to update topic data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const topicData = new FormData();

    topicData.append("name", topic.name);
    topicData.append("slug", topic.slug);
    topicData.append("description", topic.description);
    topicData.append("sort_order", topic.sort_order);
    topicData.append("status", topic.status);

    try {
      await TopicService.update(id, topicData); // Call service to update topic data
      navigate("/admin/topic"); // Redirect back to the topic list
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3">
        <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
          <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
            Cập nhật chủ đề
          </h1>
          <button
            type="submit"
            className="text-lg ml-auto bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
          >
            <FaSave className="mr-1" />
            Lưu
          </button>

          <Link
            to="/admin/topic"
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
              <label className="font-bold">Tên chủ đề</label>
              <input
                type="text"
                className="border border-gray-400 p-1 px-2 w-full"
                value={topic.name}
                onChange={(e) =>
                  setTopic({ ...topic, name: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Slug</label>
              <input
                type="text"
                className="border border-gray-400 p-1 px-2 w-full"
                value={topic.slug}
                onChange={(e) =>
                  setTopic({ ...topic, slug: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label className="font-bold">Mô tả</label>
              <textarea
                rows="5"
                className="border border-gray-400 p-1 px-2 w-full"
                value={topic.description}
                onChange={(e) =>
                  setTopic({ ...topic, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="basis-3/12">
            {/* Sort Order */}
            <div className="mb-3">
              <label className="font-bold">Sắp xếp</label>
              <input
                type="number"
                className="border border-gray-400 p-1 px-2 w-full"
                value={topic.sort_order}
                onChange={(e) =>
                  setTopic({ ...topic, sort_order: e.target.value })
                }
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="font-bold">Trạng thái</label>
              <select
                value={topic.status}
                onChange={(e) =>
                  setTopic({ ...topic, status: e.target.value })
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

export default TopicUpdate;
