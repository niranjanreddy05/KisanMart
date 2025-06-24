
import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import star from "../assets/star.png";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
const Review = ({ review }) => {
  console.log(review.userId);
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.userId],
      queryFn: () =>
        newRequest.get(`/users/${review.userId}`).then((res) => {
          return res.data;
        }),
    },
  );


  return (
    <div className="flex mb-6 flex-col gap-4 review">
    {isLoading ? (
      "loading"
    ) : error ? (
      "error"
    ) : (
      <div className="flex items-center user">
        <img className="h-50 w-12 rounded-full" src={data.img || "/img/noavatar.jpg"} alt="" />
        <div className="info ml-4">
          <span>{data.username}</span>
           <img className="w-20" src="/img/country.png" alt="" />
            <span>{data.country}</span>
        </div>
      </div>
    )}
    <div className="flex items-center gap-2 stars">
      {Array(review.star)
        .fill()
        .map((item, i) => (
          <img className="h-4 w-4" src={star} alt="" key={i} />
        ))}
      <span className="text-yellow-500 font-bold text-16">{review.star}</span>
    </div>
    <p>{review.desc}</p>
    <div className="flex items-center  gap-2 helpful">
      <span className="cursor-pointer">Helpful?</span>
      <img className="w-4 cursor-pointer" src={like} alt="" />
      <span>Yes</span>
      <img className="w-4 cursor-pointer" src={dislike} alt="" />
      <span>No</span>
    </div>
  </div>  
  );
};

export default Review;
