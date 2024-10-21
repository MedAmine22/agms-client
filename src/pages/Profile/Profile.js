import React, { useEffect, useState } from "react";
import PageHeader from "components/HeaderSections/PageHeader";
import { ProfileComponent } from "components/Landing/Profile/ProfileComponent";
import ProfileService from "../../services/profile/ProfileService";
import { Oval } from "react-loader-spinner";

export const MiddlewareUserContainer = ({ user }) => {
  return user;
};
export const Profile = () => {
  const [user, setUser] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true); // Ajout d'un état pour le chargement

  useEffect(() => {
    const fetchProfile = async () => {
      await ProfileService.getProfile().then((res) => {
        setUser(res?.data);
        setLoading(false);
      });
    };
    fetchProfile();
  }, []);

  useEffect(() => {}, [user]);

  useEffect(() => {}, [accessToken]);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  if (loading) {
    return (
      <div>
        <Oval
          visible={true}
          height="70"
          width="70"
          color="#0061D0"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  return (
    <React.Fragment>
      <PageHeader user={user} title="Profile" home="Home" currentLink="Profile" />
      <ProfileComponent onUpdate={updateUser} user={user} />
    </React.Fragment>
  );
};
