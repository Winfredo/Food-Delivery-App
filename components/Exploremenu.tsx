import React from "react";
import { menuList } from "@/constants/constants";
import Image from "next/image";
import { Props } from "@/types/type";

const Exploremenu = ({ category, setCategory }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-2xl text-[#262626]">Explore our menu</h2>
      <p className="text-[15px] max-w-[60%]">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="flex justify-between items-center my-5 mx-0 overflow-x-scroll ">
        {menuList.map((menu, index) => (
          <div
            onClick={() =>
              setCategory?.((prev: string) =>
                prev === menu.name ? "All" : menu.name,
              )
            }
            key={index}
            className="flex flex-col items-center mx-2.5"
          >
            <Image
              src={menu.image}
              alt="Variety of foods"
              width={100}
              height={100}
              className={`w-[7.5vw] min-w-20 cursor-pointer rounded-[50%] hover:scale-95 transition-all duration-300 ease-in-out ${category === menu.name ? "border-3 border-[#FF6347] p-0.5" : ""}`}
            />
            <h3 className="mt-2 text-[#747474] font-semibold text-[1.2vw] cursor-pointer">
              {menu.name}
            </h3>
          </div>
        ))}
      </div>
      <hr className="my-2.5 mx-0 border-none bg-[#e2e2e2] h-0.5" />
    </div>
  );
};

export default Exploremenu;
