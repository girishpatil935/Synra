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

export interface SubmissionResponse {
  success: boolean;
  message: string;
  referenceId: string;
  timestamp: string;
}

/**
 * Submit a project inquiry.
 * Ready for future backend, API, CRM, WhatsApp, and email notification integrations.
 */
export async function submitProjectInquiry(
  data: ProjectInquiryData
): Promise<SubmissionResponse> {
  // Mock submission delay to emulate robust network transaction
  await new Promise((resolve) => setTimeout(resolve, 900));

  const referenceId = `SYN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // In production, this can call `/api/inquiries`, email webhook, or Zapier/CRM
  console.info("[SYNRA Project Inquiry Submitted]", {
    referenceId,
    timestamp: new Date().toISOString(),
    inquiry: data,
  });

  return {
    success: true,
    message: "Project inquiry received successfully.",
    referenceId,
    timestamp: new Date().toISOString(),
  };
}
