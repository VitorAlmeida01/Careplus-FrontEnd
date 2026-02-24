import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "authToken";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getTokenData() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Token inválido", error);
    return null;
  }
}

export function getUserRoles() {
  const payload = getTokenData();
  return payload?.roles || [];
}