/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import ProfileService from "../../../services/profile/ProfileService";
import { Oval } from "react-loader-spinner";
export const EditProfile = ({ user, onUpdate }) => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false); // State pour gérer le chargement
  const [userData, setUserData] = useState(user);
  const [avatar, setAvatar] = useState(null); // State pour stocker l'image du profil sélectionnée par l'utilisateur
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Mise à jour des données de l'administrateur avec celles de adminData
      // const updatedUser = { ...user, ...userData };
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      if (avatar) {
        formData.append("avatar", avatar);
      }
      // Appel du service de modification du profil administratif avec les données mises à jour
      await ProfileService.editProfile(formData);

      setIsLoading(false);
      addToast("Profile updated", {
        autoDismiss: true,
        appearance: "success",
      });
      onUpdate(formData);
      window.location.reload();
      //alert(JSON.stringify(updatedAdmin));
    } catch (error) {
      addToast("Error while updating profile", {
        autoDismiss: true,
        appearance: "error",
      });

      setIsLoading(false);
    }
  };
  return (
    <div>
      <p className="fw-medium text-uppercase text-primary mb-2">Edit Profile</p>
      <h1 className="display-5 mb-4">Profile</h1>
      <div className="row pt-2">
        <div className="col-sm-12">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-user text-white"></i>
            </div>
            <div className="ms-3 w-100 d-flex">
              {avatar === null ? (
                <img
                  src={avatar ? URL.createObjectURL(avatar) : user.avatar}
                  alt="Avatar"
                  hidden
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
              ) : (
                <img
                  src={avatar ? URL.createObjectURL(avatar) : user.avatar}
                  alt="Avatar"
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
              )}

              <input type="file" onChange={handleFileChange} accept="image/*" />
            </div>
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-user text-white"></i>
            </div>
            <div className="ms-3 w-100">
              <p className="mb-2">Name</p>
              <input
                style={{ height: 50, fontSize: 14 }}
                type=""
                onChange={handleInputChange}
                name="name"
                value={userData?.name || ""}
                className="form-control w-100"
              />
            </div>
          </div>
        </div>
        <div className="col-sm-12 mt-5">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-envelope-open text-white"></i>
            </div>
            <div className="ms-3 w-100">
              <p className="mb-2">Email</p>
              <input
                style={{ height: 50, fontSize: 14 }}
                type="email"
                onChange={handleInputChange}
                name="email"
                value={userData?.email || ""}
                className="form-control w-100"
              />
            </div>
          </div>
        </div>
        <div className="col-sm-12 mt-5">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-phone-alt text-white"></i>
            </div>
            <div className="ms-3 w-100">
              <p className="mb-2">Phone</p>
              <input
                style={{ height: 50, fontSize: 14 }}
                placeholder="Current Phone"
                type="text"
                onChange={handleInputChange}
                name="phone"
                value={userData?.phone || ""}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="mt-3  btn btn-primary py-3 px-5 text-white"
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            // Changed to type="button" and onClick
          >
            {isLoading ? (
              <Oval
                visible={true}
                height="30"
                width="30"
                color="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span style={{ color: "white" }}>Save Changes</span>
            )}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
