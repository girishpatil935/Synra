import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  stepTitle,
}: ProgressIndicatorProps) {
  const percentage = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className="project-inquiry__progress">
      <div className="project-inquiry__progress-meta">
        <span className="project-inquiry__step-badge">
          0{currentStep} <span className="text-[var(--body)] opacity-50">/</span> 0{totalSteps}
        </span>
        <span className="project-inquiry__step-label">{stepTitle}</span>
        <span className="project-inquiry__step-percent">{percentage}%</span>
      </div>

      <div className="project-inquiry__progress-bar-bg" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className="project-inquiry__progress-bar-fill"
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  );
}
