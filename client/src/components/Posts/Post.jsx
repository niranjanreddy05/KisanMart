
import React from 'react';
import { Link } from 'react-router-dom';
import star from '../assets/star.png';
import like from '../assets/heart.png';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import pfp from "../assets/user.png";
import { useParams } from 'react-router-dom';


function Post({ item }) {

  
  

  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link  to={`/post/${item._id}`}>
      <div className="sm:w-64 w-full rounded-sm border-2 mb-6 bg-gradient-to-br from-[#fffbe6] via-[#fff0c1] to-[#ffe9a7] shadow-md animate-popIn hover:scale-105 hover:shadow-xl transition-transform duration-500 ease-in-out tag-pop-in">
      <div className="w-full h-52 rounded-md overflow-hidden">
        <img className="w-full h-full object-cover" src={item.cover} alt="" />
    </div>
    <div className="flex flex-col gap-2 pt-2 ">
          {isLoading ? ("Loading") : error ? ("something went wrong") :( <div className="flex items-center gap-4">
            <img className="w-6 h-6 ml-1.5  rounded-full" src={data.img || pfp} alt="" />
            <span>{data.username}</span>
          </div>)}
          <p className='text-gray-600  text-base px-2 '>{item.desc}</p>
          <div className="flex center gap-1.5">
            {/* Replace the following line with your actual star image */}
            <img className="w-[15px] h-[15px] mt-1.5 ml-3" src={star} alt="" />
            <span className='text-yellow-400  text-xl '>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber) }</span>
          </div>
        </div>
        <div className=" pb-2 flex  items-center justify-between">
          {/* Replace the following line with your actual like image */}
          <img className="w-[25px] h-[25px] ml-3 cursor-pointer" src={like} alt="" />
          <div className="flex items-center justify-between px-3 flex-col">
          <span className='text-gray-500 font-medium '>Starting At</span>
          <h2 className='text-gray-600  text-xl '>₹{item.price} /Kg</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
