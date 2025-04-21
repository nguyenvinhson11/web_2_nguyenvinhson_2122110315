import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../services/PostService"; // Đường dẫn tới PostService

const PostDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [post, setPost] = useState(null); // State để lưu thông tin bài viết
  const urlImage = "http://localhost/website/nguyenvinhson_laravel/public/images/";

  useEffect(() => {
    // Hàm gọi API để lấy chi tiết bài viết
    const fetchPostDetail = async () => {
      try {
        const result = await PostService.show(id); // Gọi API lấy bài viết theo id
        setPost(result.post); // Lưu dữ liệu bài viết vào state
        console.log("Chi tiết bài viết", result);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết bài viết:", error);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (!post) return <p>Loading...</p>; // Hiển thị khi đang tải dữ liệu

  return (
    <div className="container max-w-4xl mx-auto my-10">
        <h1 className="text-center text-3xl text-blue-600 font-bold mb-5">Chi tiết bài viết</h1>
        <img
        src={`${urlImage}post/${post.thumbnail}`}
        alt={post.title}
        className=" w-80 mb-6"
      />
      {/* <h1 className="text-3xl font-bold mb-6">{post.title}</h1> */}
     
     
      <p className="text-gray-800 leading-relaxed mb-4">{post.description}</p>
     
      <div className="content">
        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default PostDetail;
