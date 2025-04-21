import React, { useState, useEffect } from "react";
import ContactService from "../../../services/ContactService";
import {
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Import các icon cần thiết

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await ContactService.index();
      setContacts(result.contacts);
    };
    fetchData();
  }, []);

  console.log("ket qua",contacts);

  return (
    <>
      <div className="content">
        <div className="grid grid-cols-2">
          <div className="col-span-1 ">
            <h1 className="uppercase font-bold text-2xl my-3 mx-3 text-gray-800">
              Quản lý đặt hàng
            </h1>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bcontact bcontact-gray-300">
          <thead>
            <tr className="bg-gray-400 bcontact-b bcontact-gray-300">
              <th className=" w-20 py-2 px-4 bcontact-r bcontact-gray-300"></th>
              <th className="py-2 px-4 bcontact-r bcontact-gray-300">Tên</th>
              <th className="py-2 px-4 bcontact-r bcontact-gray-300">Email</th>
              <th className="py-2 px-4 bcontact-r bcontact-gray-300">Tiêu đề</th>
              <th className="py-2 px-4 bcontact-r bcontact-gray-300">Nội dung</th>
              <th className="py-2 px-4 bcontact-r bcontact-gray-300">Chức năng</th>
              <th className="py-2 px-4 bcontact-r bcontact-gray-300">ID</th>
            </tr>
          </thead>
          <tbody>
            {contacts &&
              contacts.length > 0 &&
              contacts.map((contact, index) => {
                let jsxStatus;
                if (contact.status === 1) {
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
                  <tr key={index} className="bcontact-b bcontact-gray-300">
                    <td className="text-center py-2 px-4 bcontact-r bcontact-gray-300">
                      <input type="checkbox" />
                    </td>
                    <td className="py-2 px-4 bcontact-r bcontact-gray-300">{contact.name}</td>
                    <td className="py-2 px-4 bcontact-r text-center bcontact-gray-300">{contact.email}</td>
                    <td className="py-2 px-4 bcontact-r text-center bcontact-gray-300">{contact.title} </td>
                    <td className="py-2 px-4 bcontact-r text-center bcontact-gray-300">{contact.content} </td>
                
                    <td className="text-center py-2 px-4 bcontact-r bcontact-gray-300">
                      {jsxStatus}
                      <button className="bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaEye className="text-sm" />
                      </button>
                      <button className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaEdit className="text-sm" />
                      </button>
                      <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md">
                        <FaTrashAlt className="text-sm" />
                      </button>
                    </td>
                    <td className="text-center py-2 px-4 bcontact-r bcontact-gray-300">{contact.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContactList;
