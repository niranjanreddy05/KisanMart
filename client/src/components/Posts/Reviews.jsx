
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "./Review";
import  toast  from "react-hot-toast";
const Reviews = ({ postId }) => {

  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: [postId],
    queryFn: () =>
      newRequest.get(`/reviews/${postId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess:()=>{
      toast.success("Review added successfully")
      queryClient.invalidateQueries(["reviews"])
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ postId, desc, star });
  };

  return (
<div className="mt-50 reviews">
  <h2 className="mb-10">Reviews</h2>
  {isLoading
    ? "loading"
    : error
    ? "Something went wrong!"
    : data?.map((review) => review && <Review key={review._id} review={review} />)}
  <div className="mt-20 flex flex-col add">
    <h3>Add a review</h3>
    <form action="" className="flex flex-col addForm" onSubmit={handleSubmit}>
      <input type="text" placeholder="write your opinion" className=" border-2 mt-2 p-12" />
      <select name="" id="" className="w-100 border-2 mt-2 p-2 self-end">
        <option value={5}>5</option>
        <option value={4}>4</option>
        <option value={3}>3</option>
        <option value={2}>2</option>
        <option value={1}>1</option>
      </select>
      <button className="self-end w-100 mt-2 bg-green-500 text-white rounded-md p-2 cursor-pointer">Send</button>
    </form>
  </div>
  <hr className="my-50 border-t-0.5 border-lightgray" />
</div>

  );
};

export default Reviews;
