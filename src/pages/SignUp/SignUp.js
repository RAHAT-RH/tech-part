import React, { useState } from "react";
import {
   useCreateUserWithEmailAndPassword,
   useSignInWithGoogle,
   useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../../components/Loading/Loading";

const SignUp = () => {
   const [createUserWithEmailAndPassword, user, loading, error] =
      useCreateUserWithEmailAndPassword(auth);
   const [updateProfile] = useUpdateProfile(auth);
   const [signInWithGoogle, gUser, gLoading] =
      useSignInWithGoogle(auth);
   const navigate = useNavigate();
    const [token] = useToken(user || gUser);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   if (loading || gLoading) {
      return <Loading></Loading>;
   }
   if (token) {
      navigate("/dashboard");
   }

   const handleRegister = async (data) => {
      const { name, email, password } = data;
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
      reset();
   };
   return (
      <div className="px-3 pt-16 md:pt-24">
         <div className="flex items-center justify-center">
            <div className="border card w-96 border-slate-200">
               <div className="card-body">
                  <h2 className="justify-center mb-3 card-title">Sign Up</h2>

                  <div>
                     <div className="mb-5">
                        {error?.message ===
                           "Firebase: Error (auth/email-already-in-use)." && (
                           <p className="mb-2 text-left text-red-500">
                              Email already in use!
                           </p>
                        )}
                        <form
                           onSubmit={handleSubmit(handleRegister)}
                           className="flex flex-col gap-2 text-left "
                        >
                           <input
                              {...register("name", { required: true })}
                              className="w-full input input-bordered "
                              type="text"
                              placeholder="Full name"
                           />
                           {errors.name?.type === "required" && (
                              <p className="text-sm text-red-400">
                                 Name is required!
                              </p>
                           )}
                           <input
                              {...register("email", { required: true })}
                              className="w-full input input-bordered "
                              type="email"
                              placeholder="Your email"
                           />
                           {errors.email?.type === "required" && (
                              <p className="text-sm text-red-400">
                                 Email is required!
                              </p>
                           )}
                           <input
                              {...register("password", {
                                 required: true,
                                 pattern:
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                              })}
                              className="w-full input input-bordered "
                              type="password"
                              placeholder="Password"
                           />
                           {errors.password?.type === "required" && (
                              <p className="text-sm text-red-400">
                                 Password is required!
                              </p>
                           )}
                           {errors.password?.type === "pattern" && (
                              <p className="text-red-400">
                                 Password should have minimum eight characters,
                                 at least one uppercase, one lowercase, one
                                 number and one special character
                              </p>
                           )}

                           <input
                              type="submit"
                              value="Sign Up"
                              className="mt-3 text-lg text-white btn btn-primary"
                           />
                           <p className="text-sm">
                              Have an account?
                              <Link
                                 to="/login"
                                 className="ml-1 underline text-primary"
                              >
                                 Login here
                              </Link>
                           </p>
                        </form>
                     </div>
                     <div className="flex flex-col w-full border-opacity-50">
                        <div className="divider">OR</div>
                        <button
                           onClick={() => signInWithGoogle()}
                           className="btn btn-outline"
                        >
                           Continue with google
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SignUp;
