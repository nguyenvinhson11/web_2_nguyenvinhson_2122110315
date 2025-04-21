import React, { useState, useEffect } from "react";
import TopicService from "../../../services/TopicService";
import {
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Import các icon cần thiết
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await TopicService.index();
      setTopics(result.topics);
    };
    fetchData();
  }, []);

  console.log("ket qua", topics);

  return (
    <>
      <div className="content">
        <div className=" flex ">
          <div>
            <h1 className="uppercase text-2xl font-bold ml-4 my-5">
              Quản lý chủ đề
            </h1>
          </div>

          <div className="ml-auto">
            <button
              type="submit"
              className=" text-lg ml-auto my-5 mr-5 bg-admin hover:bg-slate-600 py-1 px-2 text-white rounded-md flex items-center"
            >
              <Link className="flex items-center" to="/admin/topic/create">
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
              <th className="py-2 px-4 border-r border-gray-300">Tên</th>
              <th className="py-2 px-4 border-r border-gray-300">Slug</th>
              <th className="py-2 px-4 border-r border-gray-300">Miêu tả</th>
              <th className="py-2 px-4 border-r border-gray-300">Chức năng</th>
              <th className="py-2 px-4 border-r border-gray-300">ID</th>
            </tr>
          </thead>
          <tbody>
            {topics &&
              topics.length > 0 &&
              topics.map((topic, index) => {
                let jsxStatus;
                if (topic.status === 1) {
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
                    <td className="py-2 px-4 border-r border-gray-300">
                      {topic.name}
                    </td>
                    <td className="py-2 px-4 border-r text-center border-gray-300">
                      {topic.slug}
                    </td>
                    <td className="py-2 px-4 border-r text-center border-gray-300">
                      {topic.description ? topic.description : "không"}{" "}
                    </td>

                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      {jsxStatus}
                      <button className="bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <Link to={`show/${topic.id}`}>
                          <FaEye className="text-sm" />
                        </Link>
                      </button>
                      <button className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md">
                      <Link to={`update/${topic.id}`}>
                        <FaEdit className="text-sm" />
                        </Link>
                      </button>
                      <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </td>
                    <td className="text-center py-2 px-4 border-r border-gray-300">
                      {topic.id}
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

export default TopicList;
