export default function authHeader() {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    return {
      Authorization: 'Bearer ' + accessToken
    };
  }
}