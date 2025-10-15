import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserInfo() {
    return axios.get(API_URL + 'users/profile', { headers: authHeader() });
  }

  getUserRoutines() {
    return axios.get(API_URL + '/routine/mine', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();