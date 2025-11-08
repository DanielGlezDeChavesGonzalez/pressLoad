import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
        }
        return response.data;
      })
      .catch(error => {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "auth/register", {
      username,
      email,
      password
    }).then(response => {
      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }

      return response.data;
    }
    );
  }

  getCurrentUser() {
    return axios.get(API_URL + "users/profile", {
      headers: { Authorization: 'Bearer ' + localStorage.getItem("access_token") }
    });
  }
}

export default new AuthService();