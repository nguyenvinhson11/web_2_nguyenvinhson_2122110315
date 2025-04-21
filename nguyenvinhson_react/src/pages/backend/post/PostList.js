import React, { useState, useEffect } from "react";
import PostService from "../../../services/PostService";
import {
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Import các icon cần thiết
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const PostList = () => {
  const urlImage =
    "http://localhost/website/nguyenvinhson_laravel/public/images/";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await PostService.index();
      setPosts(result.posts);
    };
    fetchData();
  }, []);

  console.log("ket qua", posts);

  return (
    <>
      <div className="content">
        <div className="flex">
          <div>
            <h1 className="uppercase text-2xl font-bold ml-4 my-5">
              quản lý bài viết
            </h1>
          </div>

          <div className="ml-auto">
            <button
              type="submit"
              className="text-lg  ml-auto my-5 mr-5 bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
            >
              <Link className="flex items-center" to="/admin/post/create">
                <IoMdAdd className="mr-1 up" />
                Thêm
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-400 border-b border-gray-300">
              <th className=" w-20 py-2 px-4 border-r border-gray-300"></th>
              <th className="py-2 px-4 border-r border-gray-300">Hình</th>
              <th className="py-2 px-4 border-r border-gray-300">
                Tiêu đề bài viết
              </th>
              <th className="py-2 px-4 border-r border-gray-300">Chủ đề</th>
              <th className="py-2 px-4 border-r border-gray-300">Kiểu</th>
              <th className="py-2 px-4 border-r border-gray-300">Nội dung</th>
              <th className=" w-60 py-2 px-4 border-r border-gray-300">
                Chức năng
              </th>
              <th className="py-2 px-4 border-r border-gray-300">ID</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.length > 0 &&
              posts.map((post, index) => {
                let jsxStatus;
                if (post.status === 1) {
                  jsxStatus = (
                    <button className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md">
                      <FaToggleOn className="text-sm" />
                    </button>
                  );
                } else {
                  jsxStatus = (
                    <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md">
                      <FaToggleOff className="text-sm" />
                    </button>
                  );
                }

                return (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      <input type="checkbox" />
                    </td>
                    <td className=" w-44 h-w-44 py-2 px-4 border-r border-gray-300">
                      <img
                        className="w-full"
                        src={urlImage + "post/" + post.thumbnail}
                        alt={post.title}
                      />
                    </td>
                    <td className="py-2 px-4 border-r border-gray-300">
                      {post.title}
                    </td>
                    <td className="py-2 px-4 border-r text-center border-gray-300">
                      {post.topic_name}
                    </td>
                    <td className="py-2 px-4 border-r text-center border-gray-300">
                      {post.type}
                    </td>
                    <td className="py-2 px-4 border-r text-center border-gray-300">
                      {post.content}
                    </td>

                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      {jsxStatus}
                      <button className="bg-sky-500 hover:bg-sky-400 py-1 px-2 mx-0.5 text-white rounded-md">
                      <Link to={`show/${post.id}`}>
                        <FaEye className="text-sm" />
                        </Link>
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-400 py-1 px-2 mx-0.5 text-white rounded-md">
                        <Link to={`update/${post.id}`}>
                          <FaEdit className="text-sm" />
                        </Link>
                      </button>
                      <button className="bg-red-500 hover:bg-red-400 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </td>
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      {post.id}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PostList;
