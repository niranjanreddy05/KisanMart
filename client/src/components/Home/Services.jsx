
import { categories } from "../../utils/categories";


import React from "react";

function Services() {
//   const router = useRouter();

  return (
    <div className="sm:mx-20 mx-8 my-16 ">
      <h2 className="text-4xl mb-10 text-[#404145] font-bold ">
        Our Services are for Farmers 
      </h2>
      <ul className="grid  grid-cols-2 sm:grid-cols-5 sm:gap-10 gap-1 ">
        {categories.map(({ name, logo }) => {
          return (
            <li
              key={name}
              className="flex flex-col justify-center items-center cursor-pointer hover:shadow-2xl hover:border-[#1DBF73]  border-2 border-transparent p-5 transition-all duration-500"
            
            >
              <img src={logo} alt="category" height={50} width={50} />
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Services;
