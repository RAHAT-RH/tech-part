import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm";
import Loading from "../../components/Loading/Loading";

const stripePromise = loadStripe(
   "pk_test_51L2GDxCnfQKZ3PG64anyXRaI5sfOwANqppUHlpHV5LgbIswPqk9KeGoevN89cZGgE0oz8KsizJogWBnVYNaucOvQ00Xbk1lDf3"
);

const Payment = () => {
   const { id } = useParams();

   //    const [order, setOrder] = useState({});

   const { data: order, isLoading } = useQuery(["purchase", id], () =>
      fetch(`http://localhost:5000/order/${id}`, {
         method: "GET",
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
      }).then((res) => res.json())
   );

   if (isLoading) {
      return <Loading></Loading>;
   }

   //    useEffect(() => {
   //       fetch(`https://hexa-tools.herokuapp.com/order/${id}`, {
   //          method: "GET",
   //          headers: {
   //             "content-type": "application/json",
   //             authorization: `Bearer ${localStorage.getItem("accessToken")}`,
   //          },
   //       })
   //          .then((res) => res.json())
   //          .then((data) => setOrder(data));
   //    }, [id]);

   return (
      <div className="px-3 pt-20 ">
         <div className="container mx-auto" style={{ maxWidth: "1000px" }}>
            <div className="justify-between gap-5 md:flex">
               <div className="md:w-3/6">
                  <div className="sticky top-20">
                     <div className="flex gap-5">
                        <div className="overflow-hidden bg-center bg-no-repeat bg-cover rounded-lg h-36 w-36 bg-base-200 bg-blend-overlay">
                           <img
                              src={order?.productImg}
                              alt=""
                              className="object-cover w-full h-full rounded-t-lg item-thumbnail"
                           />
                        </div>
                        <div className="text-left">
                           <h2 className="mb-1 text-2xl">{order?.product}</h2>

                           <span className="text-slate-400">
                              Order#{order?._id}
                           </span>
                           <span className="text-sm font-thin text-black border-0 badge bg-base-300 ">
                              {order?.status}
                           </span>
                           <h4 className="mt-5">
                              Quantity: {order?.orderUnit} unit.
                           </h4>
                           <h4 className="text-xl">
                              Subtotal: ${order?.orderAmount}.00
                           </h4>
                        </div>
                     </div>

                     <div className="p-5 my-5 text-left rounded-lg bg-base-200">
                        <h2 className="mb-5 text-lg font-bold">
                           Shipping Details -{" "}
                        </h2>
                        <p className="">{order?.customerName}</p>
                        <p className="">
                           {order?.street}, {order?.city}, {order?.country}
                        </p>
                        <p className="">{order?.email}</p>
                        <p className="">{order?.phone}</p>
                     </div>
                  </div>
               </div>
               <div className="md:w-3/6">
                  <div className="p-10 border rounded-lg shadow-2xl shadow-slate-200">
                     <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                     </Elements>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Payment;
