
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import webp from '../assets/support.jpg';
function Everything() {
  const everythingData = [
    {
      title: "💰Win to Win for both Buyers and Farmers ",
      subtitle:
        "No middlemen means no retail markup. You pay closer to the true cost of the food.",
    },
    {
      title: "🥕Quality and Freshness of Products:",
      subtitle:
        "Produce is often harvested just before it reaches you — fresher than store shelves.",
    },
    {
      title: "🌎Eco-Friendly: ",
      subtitle:
        "Local purchases reduce the need for long-haul transportation and cold storage.",
    },
    {
      title: "🧑‍🌾Community and Trust",
      subtitle:
        "You can meet the farmer, ask about farming practices, and build trust in your food..",
    },
  ];
  return (
    <div className="bg-[#f1fdf7] sm:pb-24 pb-44 flex flex-wrap pt-20 justify-between px-12 sm:px-24">
      <div>
        <h2 className="text-4xl mb-5 text-[#404145] font-bold">
        The Best Part of KisanMart 
        </h2>
        <ul className="flex flex-col gap-10">
          {everythingData.map(({ title, subtitle }) => {
            return (
              <li key={title}>
                <div className="flex gap-2 items-center text-xl">
                  <BsCheckCircle className="text-[#62646a]" />
                  <h4>{title}</h4>
                </div>
                <p className="text-[#62646a]">{subtitle}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative h-44 w-full mt-16 sm:w-5/12">
        <img
  src={webp}
  style={{ width: "400px", height: "400px",marginTop:"-53px" }}

  alt="everything"
/>
      </div>
    </div>
  );
}

export default Everything;