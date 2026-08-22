import { START_TIMELINE_OPTIONS } from "@/data/company";
import type { ProjectInquiryData } from "@/services/projectService";
import { Check } from "lucide-react";

interface StepProjectDetailsProps {
  data: ProjectInquiryData;
  errors: Record<string, string>;
  updateField: (field: keyof ProjectInquiryData, value: string | string[]) => void;
}

export function StepProjectDetails({
  data,
  errors,
  updateField,
}: StepProjectDetailsProps) {
  return (
    <div className="inquiry-step-content">
      <div className="inquiry-step-header">
        <h3 className="inquiry-step-title">Project Details & Timeline</h3>
        <p className="inquiry-step-desc">
          Share your vision, challenges, and timeline goals so we can understand your objectives.
        </p>
      </div>

      <div className="inquiry-form-stack">
        <div className="inquiry-field-group">
          <label htmlFor="projectDetails" className="inquiry-field-label">
            Tell us about your project <span className="inquiry-field-required">*</span>
          </label>
          <textarea
            id="projectDetails"
            rows={5}
            className={`inquiry-textarea ${errors.projectDetails ? "inquiry-input--error" : ""}`}
            placeholder="Tell us what you're trying to build, the problem you're solving, and what success would look like."
            value={data.projectDetails}
            onChange={(e) => updateField("projectDetails", e.target.value)}
          />
          {errors.projectDetails && (
            <p className="inquiry-field-error">{errors.projectDetails}</p>
          )}
        </div>

        <div className="inquiry-field-group">
          <label className="inquiry-field-label">
            When would you like to start? <span className="inquiry-field-required">*</span>
          </label>
          <div className="inquiry-options-grid">
            {START_TIMELINE_OPTIONS.map((item) => {
              const isSelected = data.timeline === item;
              return (
                <button
                  key={item}
                  type="button"
                  className={`inquiry-option-chip ${isSelected ? "inquiry-option-chip--selected" : ""}`}
                  onClick={() => updateField("timeline", item)}
                >
                  <span className="inquiry-option-chip__indicator">
                    {isSelected && <Check size={13} strokeWidth={2.5} />}
                  </span>
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
          {errors.timeline && (
            <p className="inquiry-field-error">{errors.timeline}</p>
          )}
        </div>
      </div>
    </div>
  );
}
