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

export function getFuncionarioId() {
  const payload = getTokenData();
  if (!payload) return null;

  const chavesPreferenciais = [
    "idFuncionario",
    "funcionarioId",
    "idfuncionario",
    "id_usuario",
    "idUsuario",
    "usuarioId",
    "id",
    "sub",
  ];

  for (const chave of chavesPreferenciais) {
    const valor = payload[chave];
    const idConvertido = Number(valor);

    if (Number.isFinite(idConvertido)) {
      return idConvertido;
    }
  }

  const chavesComId = Object.keys(payload).filter((chave) => /id/i.test(chave));

  for (const chave of chavesComId) {
    const valor = payload[chave];
    const idConvertido = Number(valor);

    if (Number.isFinite(idConvertido)) {
      return idConvertido;
    }
  }

  return null;
}