import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const TOKEN_KEY = "synra_admin_token";

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAdminAuthenticated(): boolean {
  return !!getAdminToken();
}

export function saveAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function logoutAdmin(): void {
  localStorage.removeItem(TOKEN_KEY);
}



export async function verifyAdminToken(): Promise<boolean> {
  const token = getAdminToken();

  if (!token) {
    return false;
  }

  try {
    await axios.get(`${API_URL}/api/admin/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    console.error("Admin token verification failed:", error);
    logoutAdmin();
    return false;
  }
}