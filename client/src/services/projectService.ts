import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
// =========================================================
// Project Inquiry Data
// =========================================================
// This represents the data collected by the React form.
// =========================================================

export interface ProjectInquiryData {
  // Step 01: About You
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  websiteUrl?: string;

  // Step 02: Your Business
  businessDescription: string;
  industry: string;
  customIndustry?: string;

  // Step 03: What You Need
  services: string[];

  // Step 04: Project Details
  projectDetails: string;
  timeline: string;

  // Step 05: Budget
  budget: string;

  // Step 06: Contact Preference
  contactPreference: string;
  preferredTime?: string;
}


// =========================================================
// Response returned to the React application
// =========================================================

export interface SubmissionResponse {
  success: boolean;
  message: string;
  referenceId: string;
  timestamp: string;
}


// =========================================================
// FastAPI response format
// =========================================================
// This matches what our Python backend currently returns:
//
// {
//   "message": "...",
//   "reference_id": "SYN-XXXXXX"
// }
// =========================================================

interface BackendInquiryResponse {
  message: string;
  reference_id: string;
}


// =========================================================
// Submit Project Inquiry
// =========================================================
//
// React Form
//     ↓
// Axios
//     ↓
// FastAPI
//     ↓
// PostgreSQL
//
// =========================================================

export async function submitProjectInquiry(
  data: ProjectInquiryData
): Promise<SubmissionResponse> {

  // Send the form data to our FastAPI backend
  const response = await axios.post<BackendInquiryResponse>(
    `${API_URL}/api/inquiries`,
    data
  );


  // Get the response from FastAPI
  const backendData = response.data;


  // Convert the backend response into the format
  // expected by the existing React application.
  return {
    success: true,

    message: backendData.message,

    referenceId: backendData.reference_id,

    timestamp: new Date().toISOString(),
  };
}
