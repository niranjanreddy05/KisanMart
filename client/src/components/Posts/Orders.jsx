
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Orders() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => res.data),
  });

  return (
    <div className="flex flex-wrap pt-16 px-12 justify-center bg-white min-h-screen">
      {isLoading ? (
        <p className="text-xl text-gray-500">Loading…</p>
      ) : error ? (
        <p className="text-red-500 text-lg">Something went wrong while fetching orders.</p>
      ) : (
        <div className="w-full pt-12">
          <div className="flex justify-between">
            <h1 className="text-3xl mb-5 font-bold">Orders</h1>
          </div>

          {data.length === 0 ? (
            <p className="text-gray-500 italic">No orders found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="h-12 border-b border-gray-200">
                  <th className="text-left">Image</th>
                  <th className="text-left">Title</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">
                    {currentUser.isSeller ? "Buyer" : "Seller"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => (
                  <tr key={order._id} className="h-12 border-b border-gray-100 hover:bg-gray-50">
                    <td>
                      <img
                        className="w-12 h-6 object-cover rounded"
                        src={order.img}
                        alt=""
                      />
                    </td>
                    <td className="px-3">{order.title}</td>
                    <td>₹ {order.price}</td>
                    <td>
                      {currentUser.isSeller ? order.buyerName : order.sellerName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
