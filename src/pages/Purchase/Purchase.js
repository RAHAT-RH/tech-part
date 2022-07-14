// import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
// import auth from "../../firebase.init";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { FiMinus, FiPlus } from "react-icons/fi";
import useUserInfo from "../../hooks/useUserInfo";
import toast from "react-hot-toast";
import { format } from "date-fns";

const Purchase = () => {
   const [user, loading] = useAuthState(auth);
   const [userInfo] = useUserInfo(user);

   const [quantity, setQuantity] = useState();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const { _id } = useParams();

   const {
      data: product,
      isLoading,
      refetch,
   } = useQuery("product", () =>
      fetch(`http://localhost:5000/product/${_id}`).then((res) => {
         return res.json();
      })
   );
   const [subtotal, setSubtotal] = useState();

   const minimumUnit = parseInt(product?.minimum_order);
   const availableUnit = parseInt(product?.available);
   useEffect(() => {
      setQuantity(minimumUnit);
   }, [product, minimumUnit]);
   useEffect(() => {
      setSubtotal(parseInt(product?.price) * quantity);
   }, [quantity, product?.price]);

   if (isLoading || loading) {
      return <Loading></Loading>;
   }

   const decreaseQuantity = () => {
      if (quantity > minimumUnit) {
         setQuantity(quantity - 1);
      }
   };
   const increaseQuantity = () => {
      if (quantity < availableUnit) {
         setQuantity(quantity + 1);
      }
   };
   const date = new Date();
   const formattedDate = format(date, "PP");
   const formattedTime = format(date, "p");

   const handleOrder = (data) => {
      console.log(data);
      const order = {
         orderDate: formattedDate,
         orderTime: formattedTime,
         product: product.name,
         productID: product._id,
         productImg: product.image,
         orderUnit: quantity,
         orderAmount: subtotal,
         customerName: userInfo.name,
         email: userInfo.email,
         phone: data.phone,
         company: data.company,
         street: data.street,
         city: data.city,
         country: data.country,
         txId: "",
         status: "unpaid",
      };
      fetch("http://localhost:5000/order", {
         method: "POST",
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
         body: JSON.stringify(order),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.insertedId) {
               toast.success("Order is placed successfully!");
               fetch(
                  `http://localhost:5000/product-available/${product._id}`,
                  {
                     method: "PATCH",
                     body: JSON.stringify({
                        available: availableUnit - quantity,
                     }),
                     headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        authorization: `Bearer ${localStorage.getItem(
                           "accessToken"
                        )}`,
                     },
                  }
               )
                  .then((response) => response.json())
                  .then((result) => {
                     if (result.modifiedCount) {
                        refetch();
                     }
                  });
               reset();
               setQuantity(minimumUnit);
            }
            if (data.message) {
               toast.error("Forbidden Access! Please login again");
            }
         });
   };
   return (
      <div className="px-3 pt-20 ">
         <div className="container mx-auto" style={{ maxWidth: "1000px" }}>
            <div className="justify-between gap-5 md:flex">
               <div className="md:w-3/6">
                  <div className="sticky top-20">
                     <div className="flex gap-5">
                        <div className="overflow-hidden bg-center bg-no-repeat bg-cover rounded-lg h-36 w-36 bg-base-200 bg-blend-overlay">
                           <img
                              src={product?.image}
                              alt=""
                              className="object-cover w-full h-full rounded-t-lg item-thumbnail"
                           />
                        </div>
                        <div className="text-left">
                           <h2 className="mb-2 text-2xl">{product?.name}</h2>
                           <span className="px-3 py-1 mr-2 text-xl font-normal rounded-full bg-secondary/30">
                              ${product?.price}
                           </span>
                           <span>/ per unit</span>
                           <h4 className="mt-5">
                              Available: {product?.available} unit.
                           </h4>
                           <h4 className="">
                              Minimum order quantity: {product?.minimum_order}{" "}
                              unit.
                           </h4>
                        </div>
                     </div>

                     <div className="p-5 my-5 text-left rounded-lg bg-base-200">
                        <h2 className="text-lg">Product Details - </h2>
                        <p className="text-slate-600">{product?.details}</p>
                     </div>
                  </div>
               </div>
               <div className="md:w-3/6">
                  <div className="p-10 border rounded-lg shadow-2xl shadow-slate-200">
                     <form
                        onSubmit={handleSubmit(handleOrder)}
                        className="flex flex-col gap-2 text-left "
                     >
                        <h2 className="mb-2 text-2xl">Order Form</h2>
                        <input
                           className="w-full input input-bordered"
                           type="text"
                           value={user?.displayName}
                           disabled
                        />
                        <input
                           className="w-full input input-bordered"
                           type="text"
                           value={user?.email}
                           disabled
                        />
                        <input
                           {...register("company")}
                           className="w-full input input-bordered"
                           type="text"
                           placeholder="Company (Optional)"
                        />

                        <div className="flex gap-2">
                           <div className="flex-1">
                              <input
                                 {...register("street", { required: true })}
                                 className="w-full input input-bordered"
                                 type="text"
                                 placeholder="Street"
                              />
                              {errors.street?.type === "required" && (
                                 <p className="mt-1 text-sm text-red-400">
                                    Street is required!
                                 </p>
                              )}
                           </div>
                           <div className="flex-1">
                              <input
                                 {...register("city", { required: true })}
                                 className="w-full input input-bordered"
                                 type="text"
                                 placeholder="City"
                              />
                              {errors.city?.type === "required" && (
                                 <p className="mt-1 text-sm text-red-400 ">
                                    City is required!
                                 </p>
                              )}
                           </div>
                        </div>
                        <input
                           {...register("country", { required: true })}
                           className="w-full input input-bordered"
                           type="text"
                           placeholder="Country"
                        />
                        {errors.country?.type === "required" && (
                           <p className="text-sm text-red-400 ">
                              Country is required!
                           </p>
                        )}

                        <input
                           {...register("phone", { required: true })}
                           className="w-full input input-bordered"
                           type="text"
                           placeholder="Phone"
                        />
                        {errors.phone?.type === "required" && (
                           <p className="text-sm text-red-400 ">
                              Phone Number is required!
                           </p>
                        )}
                        <p className="text-slate-500">
                           Minimum quantity : 100 unit
                        </p>
                        <div className="flex items-center">
                           <div
                              onClick={decreaseQuantity}
                              className="flex items-center justify-center w-10 h-10 text-2xl border cursor-pointer bg-base-200 hover:bg-base-300 border-base-200 hover:border-base-300"
                           >
                              <FiMinus></FiMinus>
                           </div>
                           <input
                              className="h-10 text-center border focus:outline-primary/30 w-28"
                              type="number"
                              id=""
                              min={minimumUnit}
                              max={availableUnit}
                              value={quantity}
                              onChange={(e) =>
                                 setQuantity(parseInt(e.target.value))
                              }
                           />
                           <div
                              onClick={increaseQuantity}
                              className="flex items-center justify-center w-10 h-10 text-2xl border cursor-pointer bg-base-200 hover:bg-base-300 border-base-200 hover:border-base-300"
                           >
                              <FiPlus></FiPlus>
                           </div>
                        </div>
                        {errors.quantity?.type === "required" && (
                           <p className="text-sm text-red-400 ">
                              Please add quantity!
                           </p>
                        )}
                        {quantity < minimumUnit && (
                           <p className="text-sm text-red-400 ">
                              Minimum order unit is{" "}
                              <strong>{minimumUnit}</strong>
                           </p>
                        )}
                        {quantity > availableUnit && (
                           <p className="text-sm text-red-400 ">
                              Available unit is <strong>{availableUnit}</strong>
                           </p>
                        )}

                        <label className="my-3 text-lg" htmlFor="">
                           Subtotal: $
                           <input
                              className="outline-0"
                              type="text"
                              value={subtotal}
                              readOnly
                           />
                        </label>

                        <input
                           type="submit"
                           value="Place Order"
                           className="mt-3 text-lg text-white btn btn-primary"
                           disabled={
                              quantity < minimumUnit || quantity > availableUnit
                           }
                        />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Purchase;
