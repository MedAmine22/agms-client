import axios from "axios";
import URL from "../../URL.js";
const ProjectsService = {
  fetchAll: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/projects/to-client");
      return response;
    } catch (error) {
      console.error("Erreur lors de l'affichage de la liste des projets : ", error);
      throw error;
    }
  },

  retrieveAll: async () => {
    try {
      const response = await axios.get(URL.LOCAL + "/crm/gallery/retrieve");
      return response;
    } catch (error) {
      console.error("Erreur lors de l'affichage de la liste des projets : ", error);
      throw error;
    }
  },
};

export default ProjectsService;
