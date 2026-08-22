import type { ProjectInquiryData } from "@/services/projectService";

interface StepAboutYouProps {
  data: ProjectInquiryData;
  errors: Record<string, string>;
  updateField: (field: keyof ProjectInquiryData, value: string | string[]) => void;
}

export function StepAboutYou({ data, errors, updateField }: StepAboutYouProps) {
  return (
    <div className="inquiry-step-content">
      <div className="inquiry-step-header">
        <h3 className="inquiry-step-title">Tell us about yourself</h3>
        <p className="inquiry-step-desc">
          We’ll use these details to coordinate your consultation and send your project proposal.
        </p>
      </div>

      <div className="inquiry-form-grid">
        <div className="inquiry-field-group">
          <label htmlFor="fullName" className="inquiry-field-label">
            Full Name <span className="inquiry-field-required">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            className={`inquiry-input ${errors.fullName ? "inquiry-input--error" : ""}`}
            placeholder="e.g. Harshit Mishra"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            autoComplete="name"
          />
          {errors.fullName && <p className="inquiry-field-error">{errors.fullName}</p>}
        </div>

        <div className="inquiry-field-group">
          <label htmlFor="email" className="inquiry-field-label">
            Email Address <span className="inquiry-field-required">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`inquiry-input ${errors.email ? "inquiry-input--error" : ""}`}
            placeholder="e.g. name@company.com"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            autoComplete="email"
          />
          {errors.email && <p className="inquiry-field-error">{errors.email}</p>}
        </div>

        <div className="inquiry-field-group">
          <label htmlFor="phone" className="inquiry-field-label">
            Phone / WhatsApp <span className="inquiry-field-optional">(Optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            className="inquiry-input"
            placeholder="e.g. +91 98765 43210"
            value={data.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            autoComplete="tel"
          />
        </div>

        <div className="inquiry-field-group">
          <label htmlFor="companyName" className="inquiry-field-label">
            Company / Business Name <span className="inquiry-field-required">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            className={`inquiry-input ${errors.companyName ? "inquiry-input--error" : ""}`}
            placeholder="e.g. Hush House / Acme Corp"
            value={data.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            autoComplete="organization"
          />
          {errors.companyName && <p className="inquiry-field-error">{errors.companyName}</p>}
        </div>

        <div className="inquiry-field-group inquiry-field-group--full">
          <label htmlFor="websiteUrl" className="inquiry-field-label">
            Current Website URL <span className="inquiry-field-optional">(If you have one)</span>
          </label>
          <input
            id="websiteUrl"
            type="url"
            className="inquiry-input"
            placeholder="e.g. https://yourbusiness.com"
            value={data.websiteUrl || ""}
            onChange={(e) => updateField("websiteUrl", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
