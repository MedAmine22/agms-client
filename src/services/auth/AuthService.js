import axios from "axios";
import URL from "../../URL.js";
const AuthService = {
  async register(data) {
    const response = await axios.post(`${URL.LOCAL}/auth/register`, data);
    return response.data;
  },

  async verify(email, verificationCode) {
    const response = await axios.post(`${URL.LOCAL}/auth/verify`, {
      email: email,
      verificationCode: verificationCode,
    });
    return response.data;
  },

  async login(credentials) {
    const response = await axios.post(`${URL.LOCAL}/auth/login`, credentials);
    return response.data;
  },

  async forgetpassword(data) {
    const response = await axios.post(`${URL.LOCAL}/auth/forget-password`, data);
    return response.data;
  },

  async resetpassword(data) {
    const response = await axios.post(`${URL.LOCAL}/auth/reset-password`, data);
    return response;
  },

  async resendCode(data) {
    const response = await axios.post(`${URL.LOCAL}/auth/resend-code-forgot-password`, data);
    return response;
  },

  async retrieveSA() {
    const response = await axios.get(`${URL.LOCAL}/superadmin/retrieve`);
    return response.data;
  },

  async retrieveA() {
    const response = await axios.get(`${URL.LOCAL}/admin/retrieveA`);
    return response.data;
  },
};

export default AuthService;
