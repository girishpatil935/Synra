import axios from "axios";
import { getAdminToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export interface Inquiry {
  id: number;
  reference_id: string;

  full_name: string;
  email: string;
  phone: string | null;

  company_name: string;
  website_url: string | null;

  business_description: string;
  industry: string;
  custom_industry: string | null;

  services: string[];

  project_details: string;

  timeline: string;
  budget: string;

  contact_preference: string;
  preferred_time: string | null;

  status: string;

  created_at: string;
  updated_at: string;
}

export type InquiryStatus =
  | "new"
  | "contacted"
  | "discussion"
  | "quoted"
  | "converted"
  | "closed";

export interface AdminLoginResponse {
  access_token: string;
  token_type: string;
}


// =========================================================
// Admin Login
// =========================================================

export async function loginAdmin(
  email: string,
  password: string
): Promise<AdminLoginResponse> {
  const response = await axios.post<AdminLoginResponse>(
    `${API_URL}/api/admin/login`,
    {
      email,
      password,
    }
  );

  return response.data;
}


// =========================================================
// Get Inquiries
// =========================================================

export async function getInquiries(): Promise<Inquiry[]> {
  const token = getAdminToken();

  const response = await axios.get<Inquiry[]>(
    `${API_URL}/api/inquiries`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}


// =========================================================
// Update Inquiry Status
// =========================================================

export async function updateInquiryStatus(
  inquiryId: number,
  status: InquiryStatus
) {
  const token = getAdminToken();

  const response = await axios.patch(
    `${API_URL}/api/inquiries/${inquiryId}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}