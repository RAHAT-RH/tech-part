import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Rating } from "react-simple-star-rating";
import auth from "../../firebase.init";
import "./AddReview.css";

const AddReview = () => {
   const [user] = useAuthState(auth);
   const [ratingValue, setRatingValue] = useState(0);
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();
   const [reviewAdding, setReviewAdding] = useState(false);
   const handleRating = (rate: number) => {
      setRatingValue(rate);
   };

   const addReview = async (data) => {
      setReviewAdding(true);
      const review = {
         ratings: ratingValue,
         author: user.displayName,
         comment: data.feedback,
         image: user.photoURL,
      };

      fetch("http://localhost:5000/review", {
         method: "POST",
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
         body: JSON.stringify(review),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.insertedId) {
               reset();
               toast.success("Thanks for your review!");
               setReviewAdding(false);
            }
         });
   };
   return (
      <div>
         <h2 className="mb-5 text-xl">Add a review</h2>
         <form
            onSubmit={handleSubmit(addReview)}
            className="flex flex-col max-w-xl gap-5 text-left "
         >
            <Rating
               transition
               onClick={handleRating}
               ratingValue={ratingValue}
               showTooltip
               tooltipArray={["Terrible", "Bad", "Average", "Great", "Prefect"]}
               fillColorArray={[
                  "#f17a45",
                  "#f19745",
                  "#f1a545",
                  "#f1b345",
                  "#f1d045",
               ]}
            ></Rating>

            <textarea
               {...register("feedback", { required: true })}
               className="w-full textarea textarea-bordered"
               placeholder="Write your feedback"
            />
            {errors.feedback?.type === "required" && (
               <p className="text-sm text-red-400 ">
                  Please write your feedback!
               </p>
            )}
            <input
               type="submit"
               value={reviewAdding ? "Adding..." : "Add Review"}
               className="mt-3 text-lg text-white  btn btn-primary"
            />
         </form>
      </div>
   );
};

export default AddReview;
