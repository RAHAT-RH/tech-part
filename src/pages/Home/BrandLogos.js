import React from "react";
import logo1 from "../../images/brand-logo-1.svg";
import logo2 from "../../images/brand-logo-2.svg";
import logo3 from "../../images/brand-logo-3.svg";
import logo4 from "../../images/brand-logo-4.svg";
import logo5 from "../../images/brand-logo-5.svg";
import logo6 from "../../images/brand-logo-4.svg";
import logo7 from "../../images/brand-logo-3.svg";
import logo8 from "../../images/brand-logo-1.svg";

const brandLogos = [logo1, logo2, logo3, logo4, logo5, logo6,logo7,logo8];

const BrandLogos = () => {
   return (
      <div className="px-3 pt-24">
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
            <div className="mb-5">
               <h2 className="text-2xl font-extrabold text-center md:text-4xl ">
                  Brands We Are Working With
               </h2>
               <p className="max-w-md mx-auto mt-5 mb-16 ">
                  We work with the top brands all over the world.
               </p>
            </div>
            <div className="grid justify-center grid-cols-2 gap-5 mt-10 sm:grid-cols-4">
               {brandLogos.map((logo,index) => (
                  <div className="flex justify-center" key={index}>
                     <img
                        className=""
                        src={logo}
                        alt=""
                     />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default BrandLogos;
