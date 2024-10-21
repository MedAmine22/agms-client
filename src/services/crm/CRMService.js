import axios from "axios";
import URL from "../../URL.js";

const CRMService = {
  fetchAll_WhoAreWe: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/crm/whoarewe/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de la création du service : ", error);
      throw error;
    }
  },
  fetchAll_Contacts: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/crm/contact/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de la création du service : ", error);
      throw error;
    }
  },
  fetchAll_Location: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/crm/location/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de la création du service : ", error);
      throw error;
    }
  },
  fetchAll_WhyChooseUs: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/crm/whychooseus/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de la création du service : ", error);
      throw error;
    }
  },

  fetchAll_Social: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/crm/sociallinks/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de la création du service : ", error);
      throw error;
    }
  },

  fetchAll_Useful: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/crm/usefullinks/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de la création du service : ", error);
      throw error;
    }
  },

  fetchAll_Hours: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/crm/businessHour/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de la création du service : ", error);
      throw error;
    }
  },

  fetchAll_Logo: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/crm/logo/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de la création du service : ", error);
      throw error;
    }
  },
};

export default CRMService;
