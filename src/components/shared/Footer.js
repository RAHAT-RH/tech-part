import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF,FaInstagram, FaRegEnvelope } from "react-icons/fa";

const Footer = () => {
   return (
      <div className="px-3 py-16 mt-16 bg-secondary-focus">
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
            <div className="grid grid-cols-1 gap-10 text-left text-white md:grid-cols-3">
               <div>
                  <h2 className="mb-3 text-3xl">Tech Parts</h2>
                  <p className="text-slate-300">
                     Tech Parts is a worldwide famous computer build. We
                     produce very high quality parts.
                  </p>
                  <div className="flex gap-5 mt-3 text-2xl text-slate-300">
                           <Link to="/" className="transition-all hover:text-white hover:scale-110"><FaFacebookF></FaFacebookF></Link>
                           <Link to="/" className="transition-all hover:text-white hover:scale-110"> <FaInstagram></FaInstagram></Link>
                           <Link to="/" className="transition-all hover:text-white hover:scale-110"><FaRegEnvelope></FaRegEnvelope></Link>
                  </div>
               </div>
               <div>
                  <h2 className="mb-3 text-2xl">Important Links</h2>
                  <ul className="flex flex-col gap-2 text-slate-300">
                     <li>
                        <Link
                           to="/dashboard/my-orders"
                           className="hover:text-white hover:translate-x-1 transition-all inline-block hover:scale-[1.1]"
                        >
                           Mange Orders
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/dashboard/my-profile"
                           className="hover:text-white hover:translate-x-1 transition-all inline-block hover:scale-[1.1]"
                        >
                           My Profile
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/login"
                           className="hover:text-white hover:translate-x-1 transition-all inline-block hover:scale-[1.1]"
                        >
                           Login
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <p className="mb-3 text-slate-300">
                     Subscribe to the newsletter to get the latest updates.
                  </p>
                  <form action="" className="">
                     <input
                        type="text"
                        placeholder="Your email"
                        className="w-full max-w-xs text-black input input-bordered"
                     />
                     <input
                        type="submit"
                        value="Subscribe"
                        className="mt-2 btn btn-primary"
                     />
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Footer;
