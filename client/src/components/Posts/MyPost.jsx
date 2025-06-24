import React from 'react'
import { Link } from 'react-router-dom';
import bin from '../assets/delete.png'
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import toast from 'react-hot-toast';


function MyPost() {
  const currentUser = getCurrentUser();
  console.log(currentUser._id);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myPost"],
    queryFn: () =>
      newRequest.get(`/posts?userId=${currentUser._id}`).then((res) => {
        console.log("API Response:", res.data);
        return res.data;
      }).catch((error) => {
        console.error("API Error:", error);
        throw error;
      }),
  });
  
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/posts/${id}`);
      toast.success("Post Deleted");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPosts"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

    
      return (
        <div className="flex flex-wrap pt-16 px-12 justify-center bg-white ">
          {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
          <div className="w-full pt-12">
            <div className="flex fle justify-between">
              <h1 className="text-3xl mb-5 font-bold">{currentUser.isSeller ? "Items" : "Orders"}</h1>
              {currentUser.isSeller && (
                <Link to="/addpost">
                  <button className='bg-green-500 text-white font-medium rounded-md mb-5 border-none p-3 cursor-pointer'>Add New Item</button>
                </Link>
              )}
            </div>
            <table className='w-full'>
              <tr className="h-12">
                <th className='text-left'>Image</th>
                <th className='text-left'>Title</th>
                <th className='text-left'>Price</th>
                <th className='text-left'>Sales</th>
                <th className='text-left'>Action</th>
              </tr>
              {data.map((gig) => (
              <tr key={gig._id} className="h-12" >
                <td>
                  <img
                    className="w-12  h-6 object-cover"
                    src={gig.cover}
                    alt=""
                  />
                </td>
                <td className="px-3">{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img onClick={() => handleDelete(gig._id)} className="w-5 cursor-pointer" src={bin} alt="" />
                </td>
              </tr>
                ))}
            </table>
          </div>
            )}
        </div>
  );
}

export default MyPost