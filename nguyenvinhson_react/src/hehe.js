<form onSubmit={handleSubmit}>
<div className=" flex items-center justify-center ">
  <div className=" p-8 rounded-lg  w-full ">
    <div className="  py-5 h-full">
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-xl">
          <div className="bg-gray-800  rounded-lg shadow-lg p-5">
            <div className="text-center">
              <div className="pb-5">
                <h2 className="text-3xl my-3 text-white  text-center font-bold mb-10 uppercase">
                  đăng ký
                </h2>

                <div className="mb-4 flex flex-col items-center">
                  <label className="text-white mb-1 font-bold">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    className=" text-center w-4/5  mt-1 p-3 rounded-lg  border border-gray-600  placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name[0]}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex flex-col  items-center">
                  <label className="text-white font-bold">Mật khẩu</label>
                  <input
                    type="password"
                    name="password"
                    value={contact.password}
                    onChange={handleChange}
                    className=" text-center w-4/5 mt-1 p-3 rounded-lg  border border-gray-600  placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password[0]}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex flex-col  items-center">
                  <label className="text-white font-bold">Họ tên</label>
                  <input
                    type="text"
                    name="fullname"
                    value={contact.fullname}
                    onChange={handleChange}
                    className=" text-center w-4/5 mt-1 p-3 rounded-lg  border border-gray-600  placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullname[0]}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex flex-col  items-center">
                  <label className="text-white font-bold">
                    Giới tính
                  </label>

                  <select
                    name="gender"
                    value={contact.gender}
                    onChange={handleChange}
                    className="w-4/5 mt-1 p-3 rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  >
                    <option className="text-center" value="nam">
                      Nam
                    </option>
                    <option className="text-center" value="nữ">
                      Nữ
                    </option>
                  </select>
                </div>

                <div className="mb-4 flex flex-col  items-center">
                  <label className="text-white font-bold">Email</label>
                  <input
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    type="email"
                    id=""
                    className=" text-center w-4/5 mt-1 p-3 rounded-lg  border border-gray-600  placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email[0]}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex flex-col  items-center">
                  <label className="text-white font-bold">
                    Điện thoại
                  </label>
                  <input
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                    type="text"
                    id=""
                    className=" text-center w-4/5 mt-1 p-3 rounded-lg  border border-gray-600  placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone[0]}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex flex-col items-center">
                  <label className="text-white font-bold">Địa chỉ</label>
                  <input
                    name="address"
                    value={contact.address}
                    onChange={handleChange}
                    type="text"
                    id=""
                    className=" text-center w-4/5 mt-1 p-3 rounded-lg  border border-gray-600  placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address[0]}
                    </p>
                  )}
                </div>

               
                {contactError && (
                  <p className="text-red-500 text-center mt-4">
                    Đăng ký không thành công!
                  </p>
                )}

                <button
                  className="btn btn-lg mt-6 px-5 py-3 bg-transparent border border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition duration-200"
                  type="submit"
                >
                  Đăng ký
                </button>

                <div className="flex justify-center text-center mt-4 pt-1 space-x-4">
                  <a href="#!" className="text-white hover:text-blue-500">
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                  <a href="#!" className="text-white hover:text-blue-300">
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                  <a href="#!" className="text-white hover:text-red-500">
                    <i className="fab fa-google fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</form>