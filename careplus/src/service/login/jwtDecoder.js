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

export function hasRole(roleName) {
  const payload = getTokenData();
  if (!payload || !payload.roles) return false;
  const target = roleName.replace(/^ROLE_/, '').toUpperCase();
  const raw = payload.roles;
  const arr = typeof raw === 'string'
    ? raw.split(',').map(r => r.trim().replace(/^ROLE_/, '').toUpperCase())
    : Array.isArray(raw)
      ? raw.map(r => (typeof r === 'string' ? r.replace(/^ROLE_/, '').toUpperCase() : ''))
      : [];
  return arr.includes(target);
}

export function getFuncionarioNome() {
  const payload = getTokenData();
  return payload?.nome ?? null;
}

export function getFuncionarioId() {
  const payload = getTokenData();
  if (!payload) return null;

  const chavesPreferenciais = [
    "idFuncionario", "funcionarioId", "idfuncionario",
    "id_usuario", "idUsuario", "usuarioId", "id", "sub",
  ];

  for (const chave of chavesPreferenciais) {
    const idConvertido = Number(payload[chave]);
    if (Number.isFinite(idConvertido)) return idConvertido;
  }

  for (const chave of Object.keys(payload).filter(c => /id/i.test(c))) {
    const idConvertido = Number(payload[chave]);
    if (Number.isFinite(idConvertido)) return idConvertido;
  }

  return null;
}