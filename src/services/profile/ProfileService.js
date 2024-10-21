import axios from "axios";
import URL from "../../URL.js";
const accessToken = localStorage?.getItem("accessToken");

const ProfileService = {
  getProfile: async () => {
    const response = await axios.get(`${URL.LOCAL}/user/user-profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },

  editProfile: async (data) => {
    const response = await axios.put(`${URL.LOCAL}/userprofile/editinfo`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },
};

export default ProfileService;
