
import React, { useState,useEffect, useRef } from 'react';
import arrow from '../assets/down-arrow.png';
import Post from './Post';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PostSkeleton from './PostSkeleton';

function Posts() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      newRequest
        .get(
          `/posts${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
          //`posts?cat=wheat`
        )
        .then((res) => {
          return res.data;
        }),
  });

  // console.log(data);


  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };


  return (
    <div className="flex py-24 justify-center bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#e0f7fa] min-h-screen">
      <div className="w-full py-6 px-12 flex flex-col gap-4">
        <span className="text-gray-600  text-lg font-medium">KisanMart: Categories</span>
        <h1 className='text-4xl font-extrabold'>explore many Products from Fields</h1>
        <p className='text-gray-500 font-medium '></p>
        <div className="flex items-center justify-between">
          <div className="flex p-[7px] flex-wrap items-center gap-3 ">
            <span className='block'>Budget</span>
            <input className='p-1.5 mr-2 border outline-none' type="number" ref={minRef} placeholder='min' />
            <input className='p-1.5 border outline-none' type="number" ref={maxRef} placeholder='max' />
            <button onClick={apply} className='rounded-md cursor-pointer border px-3 py-1  hover:text-white bg-[#1DBF73]'>Apply</button>
          </div>
          <div className="flex flex-wrap items-center gap-3 ">
            <span className="text-greay-600 font-normal">Sort by</span>
            <span className="font-medium "></span>
            <div onClick={() => setOpen(!open)} className='inline-flex cursor-pointer items-center'>
            <span className='hover:text-[#1DBF73]'>{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img onClick={() => setOpen(!open)} className="w-[15px] p-0" src={arrow} alt="" />
            </div>
            {open && (
              <div className="p-5 bg-white rounded-md border-gray-200 absolute mt-32 right-0 gap-5 flex flex-col">
              {sort === "sales" ? (
                  <span className='hover:text-[#1DBF73] cursor-pointer' onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span className='hover:text-[#1DBF73] cursor-pointer' onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span className='hover:text-[#1DBF73] cursor-pointer' onClick={() => reSort("sales")}>Popular</span> </div>
            )}
          </div>
        </div>
        <div className=" items-center mt-12 justify-between flex flex-wrap ">
         {/* {posts.map(post => (
        <Post key={post.id} item={post} /> */}
        {isLoading
  ?  <PostSkeleton cards={12} />
  : error
  ? "Something went wrong!"
  : data && data.map((post) => <Post key={post._id} item={post} />)} 
  {/* // : <PostSkeleton cards={12}/>}  */}

</div>

      </div>
    </div>
  );
}

export default Posts;
