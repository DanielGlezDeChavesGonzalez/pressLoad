import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      return response.data;
    }
    );
  }

  getCurrentUser() {
    return axios.get(API_URL + "profile", {
      headers: { Authorization: 'Bearer ' + localStorage.getItem("accessToken") }
    });
  }
}

export default new AuthService();