import axios from "axios";
import URL from "../../URL.js";
const ContactService = {
  create: async (data) => {
    try {
      const response = await axios.post(URL.LOCAL + "/contact/create", data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la demande de contact: ", error);
      throw error;
    }
  },

  retrieve: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/partners/retrieve");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la demande de contact: ", error);
      throw error;
    }
  },
};

export default ContactService;
