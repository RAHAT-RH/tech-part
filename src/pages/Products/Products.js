import React from "react";
import { useQuery } from "react-query";
import Loading from "../../components/Loading/Loading";
import Product from "../Home/Product";

const Products = () => {
   const { data: products, isLoading } = useQuery("allProducts", () =>
      fetch("http://localhost:5000/product/").then((res) =>
         res.json()
      )
   );

   if (isLoading) {
      return <Loading></Loading>;
   }
   return (
      <div className="px-3 pt-16 md:pt-24">
         <div className="container mx-auto" style={{ maxWidth: "1100px" }}>
            <div className="mb-5">
               <h2 className="text-2xl font-extrabold text-center md:text-4xl ">
                  All Products
               </h2>
               <p className="max-w-md mx-auto mt-5 mb-16 ">
                  Let us help you find the right fit for you or your
                  corporation.
               </p>
            </div>
            <div className="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-3 lg:grid-cols-4">
               {products.map((product) => (
                  <Product product={product} key={product._id}></Product>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Products;
