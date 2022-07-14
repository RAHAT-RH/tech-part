import React from "react";
import bg from "../../images/banner-bg.svg";
import cpu from "../../images/rgb-black-glass.436608b54a942760f885.jpg";
import CountUp from "react-countup";
import hikey from "../../images/blob-haikei.svg"
import { RiUserShared2Line } from "react-icons/ri";
import { FaHeadset } from "react-icons/fa";
import { GoTools } from "react-icons/go";
import { Link } from "react-router-dom";

const Banner = () => {
   return (
      <div
         id="hero"
         className="pb-16 bg-bottom bg-no-repeat bg-cover "
         style={{ backgroundImage: `url(${bg})` }}
      >
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
            <div className="pt-10 md:pt-28 md:pb-16">
               <div className="flex-col gap-10 hero-content lg:flex-row-reverse">
                  <img
                     src={cpu}
                     className="flex-1 max-w-[250px] md:max-w-lg"
                     alt=""
                  />
                  <div className="flex-1 text-left">
                     <h1 className="text-4xl font-extrabold text-black uppercase lg:text-6xl">
                        Tech Parts
                     </h1>
                     <h1 className="text-2xl font-extrabold uppercase lg:text-2xl text-secondary">
                        Building Complete Computer
                     </h1>
                     <p className="max-w-md py-6 text-lg">
                        This is high quality and low coast Computer parts and manufacturer Company The part are durable, low cost and long lasting.
                     </p>
                     <Link to="/products">
                        <button className="text-white rounded-sm btn">
                           Browse Products
                        </button>
                     </Link>
                     <div className="flex flex-col gap-3 mt-10 md:flex-row md:gap-16">
                        <div className="flex flex-col items-center p-5 rounded-lg text-primary md:items-start bg-base-200 md:bg-transparent md:p-0">
                           <RiUserShared2Line className="text-4xl"></RiUserShared2Line>
                           <p className="text-4xl font-bold">
                              <CountUp start={4500} end={5000} duration={2} />+
                           </p>
                           <p className="text-xl font-bold">Customers</p>
                        </div>
                        <div className="flex flex-col items-center p-5 rounded-lg text-secondary md:items-start bg-base-200 md:bg-transparent md:p-0">
                           <FaHeadset className="text-4xl"></FaHeadset>
                           <p className="text-4xl font-bold">
                              <CountUp start={1500} end={2000} duration={2} />
                              +
                           </p>
                           <p className="text-xl font-bold">Customer Support</p>
                        </div>
                        <div className="flex flex-col items-center p-5 rounded-lg text-accent md:items-start bg-base-200 md:bg-transparent md:p-0">
                           <GoTools className="text-4xl"></GoTools>
                           <p className="text-4xl font-bold">
                              <CountUp start={9500} end={10000} duration={2} />+
                           </p>
                           <p className="text-xl font-bold">Products</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Banner;
