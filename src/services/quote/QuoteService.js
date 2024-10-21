import axios from "axios";
import URL from "../../URL.js";
const accessToken = localStorage?.getItem("accessToken");

const QuoteService = {
  create: async (formData) => {
    try {
      const response = await axios.post(URL.LOCAL + "/quote/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande : ", error);
      throw error;
    }
  },

  cancel: async (id, data) => {
    try {
      const response = await axios.put(URL.LOCAL + "/quote/cancel/" + id, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande : ", error);
      throw error;
    }
  },

  retrieve: async () => {
    try {
      const response = await axios.get(URL.LOCAL + `/quote/retrievetoclient`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande : ", error);
      throw error;
    }
  },

  retrieveC: async () => {
    try {
      const response = await axios.get(URL.LOCAL + `/contract/retrievetoclient`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande : ", error);
      throw error;
    }
  },

  updateByUser: async (id, formData) => {
    try {
      const response = await axios.put(
        URL.LOCAL + "/contract/update-from-agms-user/" + id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande : ", error);
      throw error;
    }
  },
};

export default QuoteService;
