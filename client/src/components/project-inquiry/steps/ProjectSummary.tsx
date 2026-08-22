import type { ProjectInquiryData } from "@/services/projectService";
import { ArrowUpRight, Check, Edit3, Loader2 } from "lucide-react";

interface ProjectSummaryProps {
  data: ProjectInquiryData;
  onEditStep: (stepNumber: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ProjectSummary({
  data,
  onEditStep,
  onSubmit,
  isSubmitting,
}: ProjectSummaryProps) {
  return (
    <div className="inquiry-step-content">
      <div className="inquiry-step-header">
        <h3 className="inquiry-step-title">Review Project Inquiry</h3>
        <p className="inquiry-step-desc">
          Please review your details before submitting. You can click edit on any section to make quick adjustments.
        </p>
      </div>

      <div className="inquiry-summary-grid">
        {/* About You */}
        <div className="inquiry-summary-card glass-surface">
          <div className="inquiry-summary-card__header">
            <span className="inquiry-summary-card__tag">01 · About You</span>
            <button
              type="button"
              className="inquiry-summary-card__edit"
              onClick={() => onEditStep(1)}
              aria-label="Edit About You"
            >
              <Edit3 size={13} /> Edit
            </button>
          </div>
          <div className="inquiry-summary-card__body">
            <div className="summary-field">
              <span className="summary-field__label">Full Name</span>
              <span className="summary-field__value font-semibold">{data.fullName}</span>
            </div>
            <div className="summary-field">
              <span className="summary-field__label">Email</span>
              <span className="summary-field__value">{data.email}</span>
            </div>
            {data.phone && (
              <div className="summary-field">
                <span className="summary-field__label">Phone / WhatsApp</span>
                <span className="summary-field__value">{data.phone}</span>
              </div>
            )}
            <div className="summary-field">
              <span className="summary-field__label">Company</span>
              <span className="summary-field__value">{data.companyName}</span>
            </div>
            {data.websiteUrl && (
              <div className="summary-field">
                <span className="summary-field__label">Website</span>
                <span className="summary-field__value">{data.websiteUrl}</span>
              </div>
            )}
          </div>
        </div>

        {/* Business Context */}
        <div className="inquiry-summary-card glass-surface">
          <div className="inquiry-summary-card__header">
            <span className="inquiry-summary-card__tag">02 · Your Business</span>
            <button
              type="button"
              className="inquiry-summary-card__edit"
              onClick={() => onEditStep(2)}
              aria-label="Edit Business Details"
            >
              <Edit3 size={13} /> Edit
            </button>
          </div>
          <div className="inquiry-summary-card__body">
            <div className="summary-field">
              <span className="summary-field__label">Industry</span>
              <span className="summary-field__value">
                {data.industry === "Other" && data.customIndustry
                  ? `Other (${data.customIndustry})`
                  : data.industry}
              </span>
            </div>
            <div className="summary-field">
              <span className="summary-field__label">Business Description</span>
              <p className="summary-field__text">{data.businessDescription}</p>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="inquiry-summary-card glass-surface">
          <div className="inquiry-summary-card__header">
            <span className="inquiry-summary-card__tag">03 · Capabilities Needed</span>
            <button
              type="button"
              className="inquiry-summary-card__edit"
              onClick={() => onEditStep(3)}
              aria-label="Edit Capabilities"
            >
              <Edit3 size={13} /> Edit
            </button>
          </div>
          <div className="inquiry-summary-card__body">
            <div className="inquiry-summary-tags">
              {data.services.map((srv) => (
                <span key={srv} className="inquiry-summary-tag">
                  <Check size={11} strokeWidth={2.5} /> {srv}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Project Details & Budget */}
        <div className="inquiry-summary-card glass-surface">
          <div className="inquiry-summary-card__header">
            <span className="inquiry-summary-card__tag">04–06 · Scope & Contact</span>
            <button
              type="button"
              className="inquiry-summary-card__edit"
              onClick={() => onEditStep(4)}
              aria-label="Edit Scope"
            >
              <Edit3 size={13} /> Edit
            </button>
          </div>
          <div className="inquiry-summary-card__body">
            <div className="summary-field">
              <span className="summary-field__label">Timeline</span>
              <span className="summary-field__value">{data.timeline}</span>
            </div>
            <div className="summary-field">
              <span className="summary-field__label">Approx. Budget</span>
              <span className="summary-field__value">{data.budget}</span>
            </div>
            <div className="summary-field">
              <span className="summary-field__label">Contact Mode</span>
              <span className="summary-field__value">
                {data.contactPreference}
                {data.preferredTime ? ` (${data.preferredTime})` : ""}
              </span>
            </div>
            <div className="summary-field">
              <span className="summary-field__label">Project Overview</span>
              <p className="summary-field__text">{data.projectDetails}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="inquiry-submit-box">
        <p className="inquiry-submit-note">
          By sending this inquiry, our leadership team will review your brief and schedule an exploratory strategy discussion.
        </p>

        <button
          type="button"
          disabled={isSubmitting}
          className="inquiry-submit-btn"
          onClick={onSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={17} />
              <span>Submitting Brief...</span>
            </>
          ) : (
            <>
              <span>SEND PROJECT INQUIRY</span>
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
