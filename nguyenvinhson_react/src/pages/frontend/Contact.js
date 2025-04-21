import React, { useState } from "react";
import ContactService from "../../services/ContactService";

const Contact = () => {
  const [errors, setErrors] = useState({});
  const [contactError, setContactError] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  
  const [contact, setContact] = useState({
    name: user.fullname || "", // Gán giá trị từ user
    email: user.email || "", // Gán giá trị từ user
    phone: user.phone || "", // Gán giá trị từ user
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });

    // Xóa lỗi của trường hiện tại khi người dùng nhập lại
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu có trường trống
    if (!contact.name || !contact.email || !contact.phone || !contact.title || !contact.content) {
      setContactError(true);
      return;
    }

    const contactData = {
      ...contact,
      userID: user.id,
    };

    try {
      await ContactService.create(contactData);
      setErrors({});
      setContactError(false);
    } catch (error) {
      console.error("Lỗi khi thêm contact:", error.response);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      setContactError(true);
    }
    
  };

  return (
    <div>
      <div className="container max-w-7xl mx-auto">
        <h1 className="text-center font-bold text-3xl my-5">
          Liên hệ với chúng tôi
        </h1>
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <span className="">
              Cửa hàng công nghệ TOMA chuyên cung cấp các dòng điện thoại, máy tính bảng chính hãng giá tốt nhất thị trường.
            </span>
            <span className="block mt-2">Địa chỉ: 74B đường Hai Bà Trưng phường Bến Nghé Quận 1 TpHCM</span>
            <span className="block mt-2">Email: shoptoma@gmail.com</span>
            <span className="block mt-2">Hotline: 19001009</span>

            <form onSubmit={handleSubmit}>
              <div className=" flex items-center justify-center ">
                <div className="p-8 rounded-lg w-full ">
                  <div className="py-5 h-full">
                    <div className="w-full max-w-xl">
                      <div className="bg-gray-800 rounded-lg shadow-lg p-5">
                        <h2 className="text-3xl text-white font-bold mb-10 text-center uppercase">Liên hệ</h2>

                        <div className="mb-4">
                          <label className="text-white font-bold">Tên</label>
                          <input
                            type="text"
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-lg border border-gray-600"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="text-white font-bold">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-lg border border-gray-600"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="text-white font-bold">Điện thoại</label>
                          <input
                            type="text"
                            name="phone"
                            value={contact.phone}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-lg border border-gray-600"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="text-white font-bold">Chủ đề</label>
                          <textarea
                            name="title"
                            value={contact.title}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-lg border border-gray-600"
                          ></textarea>
                        </div>

                        <div className="mb-4">
                          <label className="text-white font-bold">Nội dung</label>
                          <textarea
                            name="content"
                            value={contact.content}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-lg border border-gray-600"
                          ></textarea>
                        </div>

                        {contactError && <p className="text-red-500 text-center">Gửi không thành công!</p>}
                        {contactSuccess && <p className="text-green-500 text-center">Gửi liên hệ thành công!</p>}

                        <button type="submit" className="btn btn-lg mt-6 px-5 py-3 ml-60 bg-blue-500 text-white rounded-lg">
                          Gửi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-span-6 mt-48">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.746392705052!2d106.77247247485776!3d10.830709789321352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701a34a5d5f%3A0x30056b2fdf668565!2zQ2FvIMSQ4bqzbmcgQ8O0bmcgVGjGsMahbmcgVFAuSENN!5e0!3m2!1svi!2s!4v1731263866877!5m2!1svi!2s"
              width="600"
              height="750"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
