import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import bgHero  from '../assets/c1.jpg';
import bgHero2 from '../assets/c2.jpg';
import bgHero3 from '../assets/c3.jpg';
import bgHero4 from '../assets/c4.jpeg';
import bgHero5 from '../assets/c5.jpg';
import {useNavigate}  from "react-router-dom";

const imageSources = [
  bgHero,
  bgHero2,
  bgHero3,
  bgHero4,
  bgHero5,
  
];

function HomeBanner() {
  const [imageIndex, setImageIndex] = useState(0);
  const [input, setInput] = useState("");
  const [fadeClass, setFadeClass] = useState("image-transition");

  const navigate = useNavigate()

  const handleSubmit = ()=> {
 //navigate(`/posts?search=`)
 navigate(`/posts?search=${input}`)
   
  }

  const handleSearch = (searchTerm) => {
    //navigate(`/posts?search=`)
    navigate(`/posts?search=${searchTerm}`)
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("image-transition-fadeout ");
      setTimeout(() => {
        setImageIndex((prevIndex) => (prevIndex >= imageSources.length - 1 ? 0 : prevIndex + 1));
        setFadeClass("image-transition-fadein");
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full pb-1 xl:pb-2 2xl:pb-64 z-10 bg-green-600 sm:bg-white bg-cover">
      <div className="absolute hidden sm:inline-block top-0 h-auto 2xl:h-[400px]  w-full transition-opacity z-0">
        <img
          alt="hero"
          src={imageSources[imageIndex]}
         className={`h-[500px] top-0 md:h-[430px] lg:h-[450px] xl:h-[500px] 2xl:h-[700px] w-full ${fadeClass}`}
        />
      </div>
      
      <div className="z-10 h-[500px] relative w-[400px] sm:w-[650px] flex pt-24  justify-center flex-col  gap-5 pl-12 sm:ml-4">
        <h1 className="text-white sm:text-5xl text-5xl leading-snug">
           Straight from the Soil to your Soul✨
        </h1>
        <div className="flex align-middle">
          <div className="relative">
            <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2" />
            <input
              type="text"
              className="h-14 sm:w-[450px] w-[240px] pl-10 rounded-md rounded-r-none"
              placeholder={`check you product`}
              
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            className="bg-[#1DBF73] text-white  px-4 sm:px-12 text-lg font-semibold rounded-r-md"
            onClick={handleSubmit} 
          >
            Search
          </button>
        </div>
        <div className="text-white hidden sm:flex  gap-4">
          Popular:
          <ul className="flex  gap-5">
        <li className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => handleSearch('apple')}>
            Apple
        </li>
        <li className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => handleSearch('corn')}>
            Corn
        </li>
        <li className="text-sm py-1  px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => handleSearch('wheat')}>
            Wheat
        </li>
        <li className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            onClick={() => handleSearch('rice')}>
            Rice
        </li>
    </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;