import React, { useEffect, useState } from "react";
import PostService from "../../services/PostService"; // Đường dẫn tới PostService
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const urlImage = "http://localhost/website/nguyenvinhson_laravel/public/images/";

  useEffect(() => {
    // Hàm gọi API để lấy danh sách bài viết
    const fetchPosts = async () => {
      try {
        const result = await PostService.index(); 
        setPosts(result.posts); 
        console.log("Danh sách bài viết", result);
      } catch (error) {
        console.error("Lỗi khi tải danh sách bài viết:", error);
      }
    };

    fetchPosts();
  }, []);

  if (!posts.length) return <p>Loading...</p>; // Hiển thị khi đang tải dữ liệu

  return (
    <div className="container max-w-7xl mx-auto ">
      <h1 className="text-center bg-category py-7 my-20 uppercase text-3xl font-bold text-white">
            Bài viết mới nhất
          </h1>
      <div className="grid grid-cols-3 gap-8 mb-5">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={`${urlImage}post/${post.thumbnail}`}
              alt={post.title}
              className=" h-72 "
            />
            <div className="p-5">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 mb-2">Chủ đề: {post.topic_name}</p>
              <p className="text-sm text-gray-700 mb-4">{post.description}</p>
              <Link
                to={`/postDetail/${post.id}`}
                className="text-blue-500 hover:underline font-bold"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
