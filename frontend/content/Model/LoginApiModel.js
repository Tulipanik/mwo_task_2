import { URL, getAPIRequest } from "./BookApiModel.js";

const TOKEN_KEY = "jwtToken";

export const TokenService = {
  saveToken: async (loginData) => {
    const endpoint = `${URL}login`;
    const metadata = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };
    try {
      const response = await getAPIRequest(endpoint, "", metadata);
      console.log(response);
      if (response.token) {
        localStorage.setItem(TOKEN_KEY, response.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error saving token:", error);
      return false;
    }
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
