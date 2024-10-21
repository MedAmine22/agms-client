import axios from "axios";
import URL from "../../URL.js";
const ServicesService = {
  fetchAll: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/services/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de l'affichage de la liste des services : ", error);
      throw error;
    }
  },

  fetchAllS: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/subservices/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de l'affichage de la liste des services : ", error);
      throw error;
    }
  },
};

export default ServicesService;
