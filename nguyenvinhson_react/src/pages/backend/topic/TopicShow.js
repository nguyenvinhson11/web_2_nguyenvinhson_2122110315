import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TopicService from "../../../services/TopicService"; // Import service to fetch topic data
import { RiArrowGoBackFill } from "react-icons/ri"; // Import back icon for navigation

const TopicShow = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [topic, setTopic] = useState({
    name: "",
    slug: "",
    description: "",
    sort_order: 1,
    created_at: "",
    updated_at: "",
    created_by: 0,
    updated_by: 0,
    status: 1,
  });

  // Fetch the topic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await TopicService.show(id); // Fetch topic data
        console.log(result); // Kiểm tra xem dữ liệu trả về có đúng không
        setTopic(result.topic); // Set the topic data into state
      } catch (error) {
        console.error("Error fetching topic data:", error);
      }
    };
    if (id) {
      fetchData(); // Fetch data only if the ID is present
    }
  }, [id]);

  return (
    <div className="p-3">
      <div className="flex flex-row items-center bg-white rounded-lg px-3 py-5">
        <h1 className="basis-1/2 text-2xl text-end font-bold uppercase text-gray-600">
          Chi tiết chủ đề
        </h1>
        <Link
          to="/admin/topic"
          className="text-lg bg-admin hover:bg-slate-600 ml-auto py-1 px-2 text-white rounded-md flex items-center"
        >
          <RiArrowGoBackFill className="mr-1" />
          Quay lại
        </Link>
      </div>

      <div className="m-3 p-3 bg-white rounded-lg px-3 py-5">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Tên trường</th>
              <th className="px-4 py-2">Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-bold">ID</td>
              <td className="border px-4 py-2">{topic.id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Tên chủ đề</td>
              <td className="border px-4 py-2">{topic.name}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Slug</td>
              <td className="border px-4 py-2">{topic.slug}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Mô tả</td>
              <td className="border px-4 py-2">{topic.description}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày tạo</td>
              <td className="border px-4 py-2">{topic.created_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày cập nhật</td>
              <td className="border px-4 py-2">{topic.updated_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người tạo</td>
              <td className="border px-4 py-2">{topic.created_by}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người cập nhật</td>
              <td className="border px-4 py-2">{topic.updated_by}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Trạng thái</td>
              <td className="border px-4 py-2">
                {topic.status === 1 ? "Hoạt động" : "Không hoạt động"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicShow;
