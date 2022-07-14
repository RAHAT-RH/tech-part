import React from "react";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
   const { tId } = useParams();

   return (
      <div className="px-3 pt-20 ">
         <div
            className="container p-5 mx-auto border rounded-lg shadow border-slate-200"
            style={{ maxWidth: "600px" }}
           >
               <h2 className="text-2xl" >Thank You for the purchase</h2>
               <p className="mb-3 text-xl text-green-600">Your payment is successfully!</p>
               <p className="text-lg">Transaction Id: <span className="px-2 py-1 rounded text-slate-600">{tId}</span></p>
               <Link className="mt-5 btn btn-outline" to="/dashboard/my-orders">Go back to my orders</Link>
         </div>
      </div>
   );
};

export default PaymentSuccess;
