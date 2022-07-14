import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddProduct = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();
   const [productAdding, setProductAdding] = useState(false);

   const imgbbKey = "4c8d6ff46a25522b68b347a2284bbf1f";

   const addProduct = async (data) => {
      setProductAdding(true);
      const uploadedImage = data.image[0];
      const formData = new FormData();
      formData.append("image", uploadedImage);

      fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
         method: "POST",
         body: formData,
      })
         .then((res) => res.json())
         .then((result) => {
            if (result.success) {
               const img = result.data.url;
               const product = {
                  name: data.name,
                  details: data.details,
                  price: data.price,
                  image: img,
                  available: data.available,
                  minimum_order: data.minimumUnit,
               };
               fetch("http://localhost:5000/product", {
                  method: "POST",
                  headers: {
                     "content-type": "application/json",
                     authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                     )}`,
                  },
                  body: JSON.stringify(product),
               })
                  .then((res) => res.json())
                  .then((data) => {
                     if (data.insertedId) {
                        toast.success("Product added successfully!");
                        reset();
                        setProductAdding(false);
                     }
                     if (data.message) {
                        setProductAdding(false);
                        toast.error("You don't have the authorization");
                     }
                  });
            }
         });
   };
   return (
      <div>
         <h2 className="mb-2 text-xl">Add new product</h2>
         <form
            onSubmit={handleSubmit(addProduct)}
            className="flex flex-col max-w-xl gap-2 text-left "
         >
            <input
               {...register("name", { required: true })}
               className="w-full input input-bordered"
               type="text"
               placeholder="Product Name"
            />
            {errors.name?.type === "required" && (
               <p className="text-sm text-red-400 ">Please add product name!</p>
            )}
            <textarea
               {...register("details", { required: true })}
               className="w-full textarea textarea-bordered"
               placeholder="Product Details"
            />
            {errors.details?.type === "required" && (
               <p className="text-sm text-red-400 ">
                  Please add product details!
               </p>
            )}
            <input
               {...register("price", { required: true })}
               className="w-full input input-bordered"
               type="number"
               placeholder="Price"
            />
            {errors.price?.type === "required" && (
               <p className="text-sm text-red-400 ">
                  Please add product price!
               </p>
            )}

            <div className="flex gap-2">
               <div className="flex-1">
                  <input
                     {...register("available", { required: true })}
                     className="w-full input input-bordered"
                     type="number"
                     placeholder="Available unit"
                  />
                  {errors.available?.type === "required" && (
                     <p className="text-sm text-red-400 ">
                        Please add available unit!
                     </p>
                  )}
               </div>
               <div className="flex-1">
                  <input
                     {...register("minimumUnit", { required: true })}
                     className="w-full input input-bordered"
                     type="number"
                     placeholder="Minimum Order Unit"
                  />
                  {errors.minimumUnit?.type === "required" && (
                     <p className="text-sm text-red-400 ">
                        Please add minimum order unit!
                     </p>
                  )}
               </div>
            </div>
            <input
               {...register("image", { required: true })}
               className="w-full input input-bordered"
               type="file"
               placeholder="Product Image"
            />
            {errors.image?.type === "required" && (
               <p className="text-sm text-red-400 ">
                  Please add product image!
               </p>
            )}
            <input
               type="submit"
               value={productAdding ? "Adding..." : "Add Product"}
               className="mt-3 text-lg text-white btn btn-primary"
            />
         </form>
      </div>
   );
};

export default AddProduct;
