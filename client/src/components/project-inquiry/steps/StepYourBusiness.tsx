import { INDUSTRY_OPTIONS } from "@/data/company";
import type { ProjectInquiryData } from "@/services/projectService";
import { Check } from "lucide-react";

interface StepYourBusinessProps {
  data: ProjectInquiryData;
  errors: Record<string, string>;
  updateField: (field: keyof ProjectInquiryData, value: string | string[]) => void;
}

export function StepYourBusiness({
  data,
  errors,
  updateField,
}: StepYourBusinessProps) {
  const handleSelectIndustry = (industry: string) => {
    updateField("industry", industry);
  };

  return (
    <div className="inquiry-step-content">
      <div className="inquiry-step-header">
        <h3 className="inquiry-step-title">Your Business Context</h3>
        <p className="inquiry-step-desc">
          Understanding what you do helps us tailor strategy, design, and architecture specifically to your market.
        </p>
      </div>

      <div className="inquiry-form-stack">
        <div className="inquiry-field-group">
          <label htmlFor="businessDescription" className="inquiry-field-label">
            What does your business do? <span className="inquiry-field-required">*</span>
          </label>
          <textarea
            id="businessDescription"
            rows={4}
            className={`inquiry-textarea ${errors.businessDescription ? "inquiry-input--error" : ""}`}
            placeholder="Briefly describe what your business offers, your primary products or services, and who your core customers are..."
            value={data.businessDescription}
            onChange={(e) => updateField("businessDescription", e.target.value)}
          />
          {errors.businessDescription && (
            <p className="inquiry-field-error">{errors.businessDescription}</p>
          )}
        </div>

        <div className="inquiry-field-group">
          <label className="inquiry-field-label">
            What industry are you in? <span className="inquiry-field-required">*</span>
          </label>
          <div className="inquiry-options-grid">
            {INDUSTRY_OPTIONS.map((item) => {
              const isSelected = data.industry === item;
              return (
                <button
                  key={item}
                  type="button"
                  className={`inquiry-option-chip ${isSelected ? "inquiry-option-chip--selected" : ""}`}
                  onClick={() => handleSelectIndustry(item)}
                >
                  <span className="inquiry-option-chip__indicator">
                    {isSelected && <Check size={13} strokeWidth={2.5} />}
                  </span>
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
          {errors.industry && (
            <p className="inquiry-field-error">{errors.industry}</p>
          )}

          {data.industry === "Other" && (
            <div className="mt-3">
              <input
                type="text"
                className="inquiry-input"
                placeholder="Specify your industry..."
                value={data.customIndustry || ""}
                onChange={(e) => updateField("customIndustry", e.target.value)}
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
