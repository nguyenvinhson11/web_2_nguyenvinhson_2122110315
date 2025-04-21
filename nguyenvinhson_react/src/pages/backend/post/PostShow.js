import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PostService from "../../../services/PostService"; // Import service to fetch post data
import { RiArrowGoBackFill } from "react-icons/ri"; // Import back icon for navigation

const PostShow = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [post, setPost] = useState({
    title: "",
    slug: "",
    topic_id: 0,
    content: "",
    description: "",
    thumbnail: "",
    type: "post",
    created_at: "",
    updated_at: "",
    created_by: 0,
    updated_by: 0,
    status: 1,
  });

  // Fetch the post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await PostService.show(id); // Fetch post data
        console.log(result); // Kiểm tra xem dữ liệu trả về có đúng không
        setPost(result.post); // Set the post data into state
      } catch (error) {
        console.error("Error fetching post data:", error);
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
          Chi tiết bài viết
        </h1>
        <Link
          to="/admin/post"
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
              <td className="border px-4 py-2">{post.id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Tiêu đề</td>
              <td className="border px-4 py-2">{post.title}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Slug</td>
              <td className="border px-4 py-2">{post.slug}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Chủ đề ID</td>
              <td className="border px-4 py-2">{post.topic_id}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Nội dung</td>
              <td className="border px-4 py-2">{post.content}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Mô tả</td>
              <td className="border px-4 py-2">{post.description}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày tạo</td>
              <td className="border px-4 py-2">{post.created_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Ngày cập nhật</td>
              <td className="border px-4 py-2">{post.updated_at}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người tạo</td>
              <td className="border px-4 py-2">{post.created_by}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Người cập nhật</td>
              <td className="border px-4 py-2">{post.updated_by}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Trạng thái</td>
              <td className="border px-4 py-2">
                {post.status === 1 ? "Hoạt động" : "Không hoạt động"}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Hình ảnh</td>
              <td className="border px-4 py-2">
                {post.thumbnail && (
                  <img
                    className="w-48"
                    src={`http://localhost/website/nguyenvinhson_laravel/public/images/post/${post.thumbnail}`}
                    alt={post.title}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostShow;
