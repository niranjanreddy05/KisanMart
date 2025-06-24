
import React, { useState } from "react";
import newRequest from "../utils/newRequest";
import upload from "../utils/upload";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
     
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      toast.success("user registered successfully")
      navigate("/login");
    } catch (err) {
      toast.error("Something went wrong!")
    }
  };

  return (
    <div className="flex pt-24 items-center justify-center">
      <form  onSubmit={handleSubmit} className="w-[960px] p-8 flex gap-20">
        <div className="flex-1 flex flex-col justify-between">
          <h1 className="text-gray-500 text-2xl mb-4">Create a new account</h1>
          <label className="text-gray-500 text-lg" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            className="p-4 border border-gray-300"
          />
          <label className="text-gray-500 text-lg" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            className="p-4 border border-gray-300"
          />
          <label className="text-gray-500 text-lg" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            className="p-4 border border-gray-300"
          />
          <label className="text-gray-500 text-lg" htmlFor="file">
            Profile Picture
          </label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="text-gray-500 text-lg" htmlFor="country">
            State,Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="Andhra Pradesh,India"
            onChange={handleChange}
            className="p-4 border border-gray-300"
          />
          <button
            type="submit"
            className="bg-green-500 text-white font-semibold text-lg p-4 cursor-pointer"
          >
            Register
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <h1 className="text-gray-500 text-2xl">I want to become a seller</h1>
          <div className="flex items-center gap-4">
            <label className="text-gray-500">Activate the seller account</label>
            <label className="switch relative inline-block w-10 h-4">
              <input
                type="checkbox"
                onChange={handleSeller}
                className=""
              />
              <span className="slider round absolute cursor-pointer"></span>
            </label>
          </div>
          <label className="text-gray-500 text-lg" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
            className="p-4 border border-gray-300"
          />
          <label className="text-gray-500 text-lg" htmlFor="desc">
            Description
          </label>
          <textarea
            id="desc"
            placeholder="A short description of yourself"
            name="desc"
            onChange={handleChange}
            className="p-4 border border-gray-300"
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
