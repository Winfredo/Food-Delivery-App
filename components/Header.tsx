import React from "react";

const Header = () => {
  return (
    <div className='bg-[url("/assets/header_img.png")] h-[34vw] my-7.5 mx-auto bg-no-repeat bg-contain relative rounded-2xl'>
      <div className="absolute animation-fadeIn flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]">
        <h2 className="font-bold text-[4.5vw] text-white">Order your favorite food here.</h2>
        <p className="text-[1vw] text-white font-semibold">
          Choose from diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="border-none bg-white text-[#747474] font-semibold rounded-[50px] py-[1vw] px-[2vw]">View Menu</button>
      </div>
    </div>
  );
};

export default Header;
