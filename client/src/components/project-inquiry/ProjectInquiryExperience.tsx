import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { toast } from "sonner";

import {
  type ProjectInquiryData,
  submitProjectInquiry,
} from "@/services/projectService";
import { ProgressIndicator } from "./ProgressIndicator";
import { StepAboutYou } from "./steps/StepAboutYou";
import { StepYourBusiness } from "./steps/StepYourBusiness";
import { StepWhatYouNeed } from "./steps/StepWhatYouNeed";
import { StepProjectDetails } from "./steps/StepProjectDetails";
import { StepBudget } from "./steps/StepBudget";
import { StepContactPreference } from "./steps/StepContactPreference";
import { ProjectSummary } from "./steps/ProjectSummary";
import { ProjectThankYou } from "./steps/ProjectThankYou";
import { TeamSection } from "./TeamSection";
import { ContactChannels } from "./ContactChannels";

interface ProjectInquiryExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const STEP_TITLES = [
  "ABOUT YOU",
  "YOUR BUSINESS",
  "WHAT DO YOU NEED",
  "PROJECT DETAILS",
  "BUDGET",
  "CONTACT PREFERENCE",
  "REVIEW & SUBMIT",
];

const INITIAL_FORM_DATA: ProjectInquiryData = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  websiteUrl: "",
  businessDescription: "",
  industry: "",
  customIndustry: "",
  services: [],
  projectDetails: "",
  timeline: "Within 1 month",
  budget: "₹50,000 – ₹1,00,000",
  contactPreference: "Email",
  preferredTime: "Anytime (Working hours)",
};

const MARK_URL = "/synra-mark.svg";

export function ProjectInquiryExperience({
  isOpen,
  onClose,
  initialService,
}: ProjectInquiryExperienceProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProjectInquiryData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  // Auto-select initial service if passed
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        services: prev.services.includes(initialService)
          ? prev.services
          : [...prev.services, initialService],
      }));
    }
  }, [initialService]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && !isSubmitting) {
          handleClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, isSubmitting]);

  const handleClose = () => {
    onClose();
  };

  const updateField = (
    field: keyof ProjectInquiryData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Please enter your full name";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Please enter your email address";
      } else if (!validateEmail(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Please enter your company or business name";
      }
    } else if (currentStep === 2) {
      if (!formData.businessDescription.trim()) {
        newErrors.businessDescription = "Please tell us what your business does";
      }
      if (!formData.industry) {
        newErrors.industry = "Please select your industry";
      }
    } else if (currentStep === 3) {
      if (!formData.services || formData.services.length === 0) {
        newErrors.services = "Please select at least one service/capability";
      }
    } else if (currentStep === 4) {
      if (!formData.projectDetails.trim()) {
        newErrors.projectDetails = "Please describe your project vision or problem";
      }
      if (!formData.timeline) {
        newErrors.timeline = "Please select a preferred timeline";
      }
    } else if (currentStep === 5) {
      if (!formData.budget) {
        newErrors.budget = "Please select an approximate budget";
      }
    } else if (currentStep === 6) {
      if (!formData.contactPreference) {
        newErrors.contactPreference = "Please select your preferred contact method";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 7) {
        setCurrentStep((prev) => prev + 1);
        // Smoothly scroll inquiry form area to top
        const formContainer = document.querySelector(".project-inquiry__content-scroll");
        if (formContainer) {
          formContainer.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleEditStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitProjectInquiry(formData);
      if (res.success) {
        setReferenceId(res.referenceId);
        setIsSubmitted(true);
        toast.success("Project inquiry received!", {
          description: `Reference: ${res.referenceId}. We will get back to you soon.`,
        });
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch {
      toast.error("An error occurred while submitting your inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="project-inquiry-overlay"
        onWheel={(event) => event.stopPropagation()}
        onTouchMove={(event) => event.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="project-inquiry-backdrop" onClick={handleClose} />

        <motion.div
          className="project-inquiry-modal"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Top Bar / Company Header */}
          <header className="project-inquiry__header glass-surface">
            <div className="project-inquiry__header-left">
              <div className="brand-lockup">
                <img src={MARK_URL} alt="SYNRA" className="brand-mark" />
                <span className="brand-wordmark">SYNRA</span>
              </div>
              <div className="project-inquiry__header-sep" />
              <div className="project-inquiry__header-tagline">
                <span>PROJECT INQUIRY EXPERIENCE</span>
              </div>
            </div>

            <button
              type="button"
              className="project-inquiry__close-btn"
              onClick={handleClose}
              aria-label="Close project inquiry"
            >
              <X size={20} strokeWidth={1.7} />
            </button>
          </header>

          {/* Modal Main Content */}
          <div className="project-inquiry__content-scroll">
            <div className="project-inquiry__hero-banner">
              <div className="section-label">
                <span className="section-label__number">START A PROJECT</span>
                <span className="section-label__line" />
                <span>SYNRA STUDIO</span>
              </div>
              <h2 className="project-inquiry__main-title">
                LET'S BUILD SOMETHING GREAT<span className="text-[var(--terra)]">.</span>
              </h2>
              <p className="project-inquiry__main-subtitle">
                Tell us about your business, what you're trying to achieve, and how we can help.
              </p>
            </div>

            <div className="project-inquiry__layout">
              {/* Form Column */}
              <div className="project-inquiry__form-col">
                <div className="inquiry-form-card glass-surface">
                  {!isSubmitted ? (
                    <>
                      {/* Step Progress */}
                      {currentStep <= 6 && (
                        <ProgressIndicator
                          currentStep={currentStep}
                          totalSteps={6}
                          stepTitle={STEP_TITLES[currentStep - 1]}
                        />
                      )}

                      {/* Step Views */}
                      <div className="inquiry-form-card__body">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                          >
                            {currentStep === 1 && (
                              <StepAboutYou
                                data={formData}
                                errors={errors}
                                updateField={updateField}
                              />
                            )}
                            {currentStep === 2 && (
                              <StepYourBusiness
                                data={formData}
                                errors={errors}
                                updateField={updateField}
                              />
                            )}
                            {currentStep === 3 && (
                              <StepWhatYouNeed
                                data={formData}
                                errors={errors}
                                updateField={updateField}
                              />
                            )}
                            {currentStep === 4 && (
                              <StepProjectDetails
                                data={formData}
                                errors={errors}
                                updateField={updateField}
                              />
                            )}
                            {currentStep === 5 && (
                              <StepBudget
                                data={formData}
                                errors={errors}
                                updateField={updateField}
                              />
                            )}
                            {currentStep === 6 && (
                              <StepContactPreference
                                data={formData}
                                errors={errors}
                                updateField={updateField}
                              />
                            )}
                            {currentStep === 7 && (
                              <ProjectSummary
                                data={formData}
                                onEditStep={handleEditStep}
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Step Actions (Steps 1–6) */}
                      {currentStep <= 6 && (
                        <div className="inquiry-form-card__actions">
                          {currentStep > 1 ? (
                            <button
                              type="button"
                              className="inquiry-nav-btn inquiry-nav-btn--back"
                              onClick={handleBack}
                            >
                              <ArrowLeft size={16} strokeWidth={1.8} />
                              <span>Back</span>
                            </button>
                          ) : (
                            <div />
                          )}

                          <button
                            type="button"
                            className="inquiry-nav-btn inquiry-nav-btn--next"
                            onClick={handleNext}
                          >
                            <span>{currentStep === 6 ? "Review Brief" : "Next Step"}</span>
                            <ArrowRight size={16} strokeWidth={1.8} />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <ProjectThankYou
                      referenceId={referenceId}
                      onClose={handleClose}
                    />
                  )}
                </div>
              </div>

              {/* Sidebar Column: Team & Direct Contacts */}
              <div className="project-inquiry__sidebar-col">
                <TeamSection />
                <ContactChannels />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
