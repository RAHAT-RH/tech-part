import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiMenu3Fill, RiUser3Line } from "react-icons/ri";
import logo from "../../images/rayna.png";
import "./Header.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import useAdmin from "../../hooks/useAdmin";
import useUserInfo from "../../hooks/useUserInfo";

const Header = ({ children }) => {
   const [user] = useAuthState(auth);
   const [admin] = useAdmin(user);
   const [userInfo, isLoading, refetch] = useUserInfo(user);
   const navigate = useNavigate();

   const logOut = () => {
      signOut(auth);
      navigate("/");
   };

   refetch();

   return (
      <div className="" id="header">
         <div className="drawer drawer-end">
            <input
               id="navbar-drawer"
               type="checkbox"
               className="drawer-toggle"
            />
            <div className="flex flex-col drawer-content">
               <div className="sticky top-0 z-10 w-full px-3 bg-white navbar">
                  <div className="container mx-auto">
                     <div className="flex-1">
                        <Link to="/">
                           <img
                              className="w-48 md:w-full"
                              src={logo}
                              alt="hexa logo"
                              style={{ maxWidth: "250px" }}
                           />
                        </Link>
                     </div>
                     <div className="flex-none lg:hidden">
                        <label
                           htmlFor="navbar-drawer"
                           className="btn btn-square btn-ghost"
                        >
                           <RiMenu3Fill className="text-2xl text-black"></RiMenu3Fill>
                        </label>
                     </div>

                     <div className="flex-none hidden lg:block">
                        <ul className="text-lg menu menu-horizontal">
                           <li>
                              <NavLink
                                 className="py-2 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                 to="/"
                              >
                                 Home
                              </NavLink>
                           </li>
                           <li>
                              <NavLink
                                 className="py-2 m-1 text-black bg-transparent rounded-md active:text-secondary hover:text-secondary"
                                 to="/blogs"
                              >
                                 Blogs
                              </NavLink>
                           </li>
                           <li>
                              <NavLink
                                 className="py-2 m-1 text-black bg-transparent rounded-md active:text-secondary hover:text-secondary"
                                 to="/products"
                              >
                                 Products
                              </NavLink>
                           </li>
                           {user && (
                              <li tabIndex="0">
                                 <span className="gap-1 py-2 m-1 text-black bg-transparent rounded-md active:text-secondary hover:text-secondary">
                                    Dashboard
                                    <svg
                                       className="fill-current"
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="20"
                                       height="20"
                                       viewBox="0 0 24 24"
                                    >
                                       <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                    </svg>
                                 </span>
                                 <ul className="left-0 w-auto p-2 rounded-lg shadow-lg bg-base-100 top-full text-md">
                                    {!admin && (
                                       <>
                                          <li>
                                             <NavLink
                                                className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                                to="/dashboard/my-orders"
                                             >
                                                My Orders
                                             </NavLink>
                                          </li>
                                          <li>
                                             <NavLink
                                                className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                                to="/dashboard/add-review"
                                             >
                                                Add Review
                                             </NavLink>
                                          </li>
                                       </>
                                    )}
                                    {admin && (
                                       <>
                                          <li>
                                             <NavLink
                                                className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                                to="/dashboard/add-product"
                                             >
                                                Add Product
                                             </NavLink>
                                          </li>
                                          <li>
                                             <NavLink
                                                className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                                to="/dashboard/manage-all-products"
                                             >
                                                Manage Products
                                             </NavLink>
                                          </li>
                                          <li>
                                             <NavLink
                                                className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                                to="/dashboard/manage-all-orders"
                                             >
                                                Manage Orders
                                             </NavLink>
                                          </li>
                                          <li>
                                             <NavLink
                                                className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                                to="/dashboard/make-admin"
                                             >
                                                Make An Admin
                                             </NavLink>
                                          </li>
                                       </>
                                    )}
                                 </ul>
                              </li>
                           )}
                        </ul>
                     </div>
                     {!user ? (
                        <Link to="/login">
                           <div className="p-3 rounded-full ring bg-slate-700">
                              <RiUser3Line className="w-full text-xl text-base-100"></RiUser3Line>
                           </div>
                        </Link>
                     ) : (
                        <div className="dropdown dropdown-end">
                           <label
                              tabIndex="0"
                              className="btn btn-ghost btn-circle avatar"
                           >
                              {userInfo?.photo ? (
                                 <div className="rounded-full ring">
                                    <img src={userInfo?.photo} alt="user" />
                                 </div>
                              ) : (
                                 <div className="p-3 rounded-full ring bg-slate-700">
                                    <RiUser3Line className="w-full text-xl text-base-100"></RiUser3Line>
                                 </div>
                              )}
                           </label>
                           <ul
                              tabIndex="0"
                              className="w-40 p-2 mt-3 rounded-lg shadow menu dropdown-content bg-base-100"
                           >
                              <li>
                                 <NavLink
                                    to="/dashboard/my-profile"
                                    className="justify-between py-1 m-1 text-black bg-transparent active:text-secondary text-md hover:text-secondary"
                                 >
                                    My Profile
                                 </NavLink>
                              </li>

                              <li>
                                 <button
                                    onClick={logOut}
                                    className="justify-between py-1 m-1 text-black bg-transparent text-md active:text-secondary hover:text-secondary"
                                 >
                                    Logout
                                 </button>
                              </li>
                           </ul>
                        </div>
                     )}
                  </div>
               </div>
               {children}
            </div>
            <div className="drawer-side">
               <label
                  htmlFor="navbar-drawer"
                  className="drawer-overlay"
               ></label>
               <ul className="w-56 p-4 pt-16 overflow-y-auto text-lg menu bg-base-100">
                  <li>
                     <NavLink
                        className="py-2 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                        to="/"
                     >
                        Home
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        className="py-2 m-1 text-black bg-transparent rounded-md active:text-secondary hover:text-secondary"
                        to="/blogs"
                     >
                        Blogs
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        className="py-2 m-1 text-black bg-transparent rounded-md active:text-secondary hover:text-secondary"
                        to="/products"
                     >
                        Products
                     </NavLink>
                  </li>
                  <li tabindex="0">
                     <span className="gap-1 py-2 m-1 text-black bg-transparent rounded-md active:text-secondary hover:text-secondary">
                        Dashboard
                        <svg
                           className="fill-current"
                           xmlns="http://www.w3.org/2000/svg"
                           width="20"
                           height="20"
                           viewBox="0 0 24 24"
                        >
                           <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                     </span>
                     <ul className="left-0 w-auto p-2 rounded-lg shadow-lg bg-base-100 top-full text-md">
                        {!admin && (
                           <>
                              <li>
                                 <NavLink
                                    className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                    to="/dashboard/my-orders"
                                 >
                                    My Orders
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink
                                    className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                    to="/dashboard/add-review"
                                 >
                                    Add Review
                                 </NavLink>
                              </li>
                           </>
                        )}
                        {admin && (
                           <>
                              <li>
                                 <NavLink
                                    className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                    to="/dashboard/add-product"
                                 >
                                    Add Product
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink
                                    className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                    to="/dashboard/manage-all-products"
                                 >
                                    Manage Products
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink
                                    className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                    to="/dashboard/manage-all-orders"
                                 >
                                    Manage Orders
                                 </NavLink>
                              </li>
                              <li>
                                 <NavLink
                                    className="py-1 m-1 text-black bg-transparent active:text-secondary hover:text-secondary"
                                    to="/dashboard/make-admin"
                                 >
                                    Make An Admin
                                 </NavLink>
                              </li>
                           </>
                        )}
                     </ul>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Header;
