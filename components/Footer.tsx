import React from "react";

const Footer = () => {
  return (
    <div className=" md:h-90 w-full bg-[#181313] mt-15">
      <div className="max-w-312.5 flex items-center justify-center  h-full mx-auto">
        <div className="flex flex-1 flex-col ">
          <div className=" flex  w-full flex-col md:flex-row items-center md:items-start justify-evenly">
            <div className=" w-[320px] flex flex-col mt-2 items-center md:items-start justify-center md:mb-20 ">
              <img
                src="./assets/logo.png"
                alt="logo"
                className=" w-auto"
              />
              <p className="text-[14px] w-50 md:w-full text-center md:text-left my-3 text-[#cfcfcf]">
                Our mission is to satisfy your cravings and elevate your dining
                experience, one delicious meal at a time.
              </p>
              <div className="flex gap-2">
                <img src="/assets/facebook_icon.png" alt="facebook" />
                <img src="/assets/twitter_icon.png" alt="twitter" />
                <img src="/assets/linkedin_icon.png" alt="linkedin" />
              </div>
            </div>

            <div className="text-center md:text-left my-3">
              <p className="font-semibold text-[16px] text-white pb-3">
                COMPANY
              </p>
              <p className="font-light text-[14px] text-[#cfcfcf] pb-3">
                Home
              </p>
              <p className="font-light text-[14px] text-[#cfcfcf] pb-3">
                About us
              </p>
              <p className="font-light text-[14px] text-[#cfcfcf] pb-3">
                Delivery
              </p>
              <p className="font-light text-[14px] text-[#cfcfcf] pb-3">
                Privacy policy
              </p>
            </div>

            <div className="text-center md:text-left my-3">
              <p className="font-semibold text-[16px]  text-white pb-3">
                GET IN TOUCH
              </p>
              <p className="font-light text-[14px] text-[#cfcfcf] pb-3">
                +233 20 455 4486
              </p>
              <p className="font-light text-[14px] text-[#cfcfcf] pb-3">
                winfrednukpe2002@gmail.com
              </p>
            </div>
          </div>

          <p className="text-white text-center">Copyright © 2026 All rights reserved</p>
        </div>
      </div>
    </div>

  );
};

export default Footer;
