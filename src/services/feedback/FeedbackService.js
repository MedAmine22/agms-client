import axios from "axios";
import URL from "../../URL.js";
const accessToken = localStorage?.getItem("accessToken");

const FeedbackService = {
  leaveF: async (data) => {
    const response = await axios.post(`${URL.LOCAL}/testimony/add`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },

  retrieveConfirmed: async (data) => {
    const response = await axios.get(`${URL.LOCAL}/testimony/getConfirmedA`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  },
};

export default FeedbackService;
