export const TokenService = {
  getLocalAccessToken(): string | null {
    return localStorage.getItem("access_token");
  },
  getLocalRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  },
  updateLocalAccessToken(token: string): void {
    localStorage.setItem("access_token", token);
  },
  updateLocalRefreshToken(token: string): void {
    localStorage.setItem("refresh_token", token);
  },
  removeUser(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}