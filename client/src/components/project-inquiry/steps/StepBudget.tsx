import { BUDGET_OPTIONS } from "@/data/company";
import type { ProjectInquiryData } from "@/services/projectService";
import { Check, Sparkles } from "lucide-react";

interface StepBudgetProps {
  data: ProjectInquiryData;
  errors: Record<string, string>;
  updateField: (field: keyof ProjectInquiryData, value: string | string[]) => void;
}

export function StepBudget({ data, errors, updateField }: StepBudgetProps) {
  return (
    <div className="inquiry-step-content">
      <div className="inquiry-step-header">
        <h3 className="inquiry-step-title">Approximate Investment</h3>
        <p className="inquiry-step-desc">
          Selecting a budget range helps us suggest realistic architectures, phased rollouts, and the highest-impact scope.
        </p>
      </div>

      <div className="inquiry-budget-intro">
        <Sparkles size={16} className="text-[var(--terra)] shrink-0" />
        <span className="text-xs text-[var(--body)]">
          All ranges are estimates. We offer transparent, tailored milestone pricing with zero hidden fees.
        </span>
      </div>

      <div className="inquiry-budget-grid">
        {BUDGET_OPTIONS.map((tier) => {
          const isSelected = data.budget === tier.label;
          return (
            <button
              key={tier.id}
              type="button"
              className={`inquiry-budget-card glass-surface ${isSelected ? "inquiry-budget-card--selected" : ""}`}
              onClick={() => updateField("budget", tier.label)}
            >
              <div className="inquiry-budget-card__header">
                <span className="inquiry-budget-card__label">{tier.label}</span>
                <span className="inquiry-budget-card__check">
                  {isSelected && <Check size={14} strokeWidth={2.5} />}
                </span>
              </div>
              <p className="inquiry-budget-card__desc">{tier.description}</p>
            </button>
          );
        })}
      </div>

      {errors.budget && (
        <p className="inquiry-field-error mt-3">{errors.budget}</p>
      )}
    </div>
  );
}
