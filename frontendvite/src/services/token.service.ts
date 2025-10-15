export const TokenService = {
  getLocalAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },
  getLocalRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  },
  updateLocalAccessToken(token: string): void {
    localStorage.setItem("accessToken", token);
  },
  updateLocalRefreshToken(token: string): void {
    localStorage.setItem("refreshToken", token);
  },
  removeUser(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}