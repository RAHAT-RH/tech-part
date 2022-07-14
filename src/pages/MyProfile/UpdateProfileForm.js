import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateProfileForm = ({ update, setUpdate, userInfo, refetch }) => {
   const [updating, setUpdating] = useState(false);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [bio, setBio] = useState("");
   const [address, setAddress] = useState("");
   const [country, setCountry] = useState("");
   const [phone, setPhone] = useState("");
   const [facebook, setFacebook] = useState("");
   const [github, setGithub] = useState("");
   const [photo, setPhoto] = useState("");

   useEffect(() => {
      setName(userInfo?.name);
      setEmail(userInfo?.email);
      setBio(userInfo?.bio);
      setAddress(userInfo?.address);
      setCountry(userInfo?.country);
      setPhone(userInfo?.phone);
      setFacebook(userInfo?.facebook);
      setGithub(userInfo?.github);
   }, [userInfo]);

   const imgbbKey = "240d0933371a68f3b812609509cc49b5";

   const handleProfileUpdate = (e, email) => {
      e.preventDefault();
      setUpdating(true);
      const uploadedImage = photo[0];
      if (uploadedImage) {
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
                  const data = {
                     name: name,
                     bio: bio,
                     address: address,
                     country: country,
                     phone: phone,
                     facebook: facebook,
                     github: github,
                     photo: img,
                  };
                  fetch(`http://localhost:5000/user/${email}`, {
                     method: "PATCH",
                     headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                           "accessToken"
                        )}`,
                     },
                     body: JSON.stringify(data),
                  })
                     .then((res) => res.json())
                     .then((data) => {
                        if (data.acknowledged) {
                           toast.success("Profile updated successfully!");
                           setUpdating(false);
                           setUpdate(false);
                           refetch();
                        }
                        if (data.message) {
                           toast.error(data.message);
                        }
                     });
               }
            });
      } else {
         const data = {
            name: name,
            bio: bio,
            address: address,
            country: country,
            phone: phone,
            facebook: facebook,
            github: github,
         };
         fetch(`http://localhost:5000/user/${email}`, {
            method: "PATCH",
            headers: {
               "content-type": "application/json",
               authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data),
         })
            .then((res) => res.json())
            .then((data) => {
               if (data.acknowledged) {
                  toast.success("Profile updated successfully!");
                  setUpdating(false);
                  setUpdate(false);
                  refetch();
               }
               if (data.message) {
                  toast.error(data.message);
               }
            });
      }
   };

   return (
      <>
         <input type="checkbox" id="update-profile" class="modal-toggle" />
         <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box h-[500px]">
               <h2 className="mb-5 text-xl">Update Your Profile</h2>
               <form
                  onSubmit={(e) => handleProfileUpdate(e, email)}
                  className="flex flex-col max-w-xl gap-2 text-left"
               >
                  <label htmlFor="name">
                     Name
                     <input
                        className="w-full rounded-md input input-sm input-bordered"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </label>
                  <label htmlFor="bio">
                     Bio
                     <textarea
                        className="w-full textarea textarea-bordered"
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                     />
                  </label>
                  <label htmlFor="address">
                     Address
                     <input
                        className="w-full rounded-md input input-sm input-bordered"
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                     />
                  </label>
                  <div className="flex gap-2">
                     <div className="flex-1">
                        <label htmlFor="country">
                           Country
                           <input
                              className="w-full rounded-md input input-sm input-bordered"
                              id="country"
                              type="text"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                           />
                        </label>
                     </div>
                     <div className="flex-1">
                        <label htmlFor="phone">
                           Phone
                           <input
                              className="w-full rounded-md input input-sm input-bordered"
                              id="phone"
                              type="number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                           />
                        </label>
                     </div>
                  </div>
                  <label htmlFor="facebook">
                     Facebook URL
                     <input
                        className="w-full rounded-md input input-sm input-bordered"
                        id="facebook"
                        type="url"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                     />
                  </label>
                  <label htmlFor="github">
                     Github URL
                     <input
                        className="w-full rounded-md input input-sm input-bordered"
                        id="facebook"
                        type="url"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                     />
                  </label>
                  Profile Picture
                  <input
                     className="w-auto rounded-md"
                     id="profilePic"
                     type="file"
                     name="profilePic"
                     onChange={(e) => setPhoto(e.target.files)}
                  />
                  <input
                     type="submit"
                     value={updating ? "Updating..." : "Update"}
                     className="mt-3 text-lg text-white btn btn-primary"
                  />
               </form>

               <div class="modal-action">
                  <button
                     onClick={() => setUpdate(false)}
                     class="btn  text-white border-0"
                  >
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default UpdateProfileForm;
