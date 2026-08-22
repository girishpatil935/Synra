import { SERVICE_CATEGORIES } from "@/data/company";
import type { ProjectInquiryData } from "@/services/projectService";
import { Check } from "lucide-react";

interface StepWhatYouNeedProps {
  data: ProjectInquiryData;
  errors: Record<string, string>;
  updateField: (field: keyof ProjectInquiryData, value: string | string[]) => void;
}

export function StepWhatYouNeed({
  data,
  errors,
  updateField,
}: StepWhatYouNeedProps) {
  const toggleService = (service: string) => {
    const exists = data.services.includes(service);
    if (exists) {
      updateField(
        "services",
        data.services.filter((s) => s !== service)
      );
    } else {
      updateField("services", [...data.services, service]);
    }
  };

  const selectAllCategory = (services: string[]) => {
    const allSelected = services.every((s) => data.services.includes(s));
    if (allSelected) {
      updateField(
        "services",
        data.services.filter((s) => !services.includes(s))
      );
    } else {
      const merged = Array.from(new Set([...data.services, ...services]));
      updateField("services", merged);
    }
  };

  return (
    <div className="inquiry-step-content">
      <div className="inquiry-step-header">
        <h3 className="inquiry-step-title">What capabilities do you need?</h3>
        <p className="inquiry-step-desc">
          Select one or more services across our four pillars. We specialize in building cohesive growth systems.
        </p>
      </div>

      {errors.services && (
        <div className="inquiry-alert-error mb-4">
          {errors.services}
        </div>
      )}

      <div className="inquiry-services-groups">
        {SERVICE_CATEGORIES.map((cat, catIdx) => {
          const categorySelectedCount = cat.services.filter((s) =>
            data.services.includes(s)
          ).length;
          const allCatSelected = categorySelectedCount === cat.services.length;

          return (
            <div key={cat.id} className="inquiry-service-category-block glass-surface">
              <div className="inquiry-service-category-header">
                <div className="flex items-center gap-2">
                  <span className="inquiry-cat-number">0{catIdx + 1}</span>
                  <div>
                    <h4 className="inquiry-cat-title">{cat.category}</h4>
                    <p className="inquiry-cat-desc">{cat.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inquiry-cat-toggle-all"
                  onClick={() => selectAllCategory(cat.services)}
                >
                  {allCatSelected ? "Deselect All" : "Select All"}
                </button>
              </div>

              <div className="inquiry-services-chips">
                {cat.services.map((service) => {
                  const isSelected = data.services.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      className={`inquiry-service-chip ${isSelected ? "inquiry-service-chip--selected" : ""}`}
                      onClick={() => toggleService(service)}
                    >
                      <span className="inquiry-service-chip__indicator">
                        {isSelected && <Check size={12} strokeWidth={2.5} />}
                      </span>
                      <span>{service}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
