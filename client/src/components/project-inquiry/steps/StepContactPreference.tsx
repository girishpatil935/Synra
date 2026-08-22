import {
  CONTACT_PREFERENCE_OPTIONS,
  PREFERRED_TIME_OPTIONS,
} from "@/data/company";
import type { ProjectInquiryData } from "@/services/projectService";
import { Check, Mail, MessageSquare, Phone } from "lucide-react";

interface StepContactPreferenceProps {
  data: ProjectInquiryData;
  errors: Record<string, string>;
  updateField: (field: keyof ProjectInquiryData, value: string | string[]) => void;
}

export function StepContactPreference({
  data,
  errors,
  updateField,
}: StepContactPreferenceProps) {
  const getIcon = (option: string) => {
    switch (option) {
      case "Email":
        return <Mail size={16} strokeWidth={1.8} />;
      case "WhatsApp":
        return <MessageSquare size={16} strokeWidth={1.8} />;
      case "Phone Call":
        return <Phone size={16} strokeWidth={1.8} />;
      default:
        return null;
    }
  };

  return (
    <div className="inquiry-step-content">
      <div className="inquiry-step-header">
        <h3 className="inquiry-step-title">Contact Preference</h3>
        <p className="inquiry-step-desc">
          Tell us how and when you’d prefer to continue the conversation.
        </p>
      </div>

      <div className="inquiry-form-stack">
        <div className="inquiry-field-group">
          <label className="inquiry-field-label">
            How would you prefer we contact you? <span className="inquiry-field-required">*</span>
          </label>
          <div className="inquiry-contact-pref-grid">
            {CONTACT_PREFERENCE_OPTIONS.map((item) => {
              const isSelected = data.contactPreference === item;
              return (
                <button
                  key={item}
                  type="button"
                  className={`inquiry-pref-card glass-surface ${isSelected ? "inquiry-pref-card--selected" : ""}`}
                  onClick={() => updateField("contactPreference", item)}
                >
                  <div className="inquiry-pref-card__icon">{getIcon(item)}</div>
                  <span className="inquiry-pref-card__label">{item}</span>
                  <span className="inquiry-pref-card__check">
                    {isSelected && <Check size={13} strokeWidth={2.5} />}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.contactPreference && (
            <p className="inquiry-field-error">{errors.contactPreference}</p>
          )}
        </div>

        <div className="inquiry-field-group">
          <label className="inquiry-field-label">
            Preferred Contact Time <span className="inquiry-field-optional">(Optional)</span>
          </label>
          <div className="inquiry-options-grid">
            {PREFERRED_TIME_OPTIONS.map((timeOption) => {
              const isSelected = data.preferredTime === timeOption;
              return (
                <button
                  key={timeOption}
                  type="button"
                  className={`inquiry-option-chip ${isSelected ? "inquiry-option-chip--selected" : ""}`}
                  onClick={() => updateField("preferredTime", timeOption)}
                >
                  <span className="inquiry-option-chip__indicator">
                    {isSelected && <Check size={13} strokeWidth={2.5} />}
                  </span>
                  <span>{timeOption}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
