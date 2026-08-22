import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectThankYouProps {
  referenceId: string;
  onClose: () => void;
}

export function ProjectThankYou({ referenceId, onClose }: ProjectThankYouProps) {
  return (
    <motion.div
      className="inquiry-thankyou"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="inquiry-thankyou__icon-wrap">
        <CheckCircle2 size={46} className="text-[var(--terra)]" strokeWidth={1.5} />
      </div>

      <div className="section-label justify-center my-3">
        <span className="section-label__number">CONFIRMATION</span>
        <span className="section-label__line" />
        <span>REF: {referenceId}</span>
      </div>

      <h2 className="inquiry-thankyou__title">THANK YOU.</h2>

      <p className="inquiry-thankyou__body">
        We've received your project inquiry. Our team will review the details and get back to you soon.
      </p>

      <div className="inquiry-thankyou__card glass-surface">
        <span className="eyebrow text-[var(--terra)]">What Happens Next</span>
        <div className="inquiry-thankyou__steps">
          <div className="thankyou-step">
            <span className="thankyou-step__num">01</span>
            <div>
              <h5>Brief Review</h5>
              <p>Our strategy and engineering leads evaluate your requirements and scope.</p>
            </div>
          </div>
          <div className="thankyou-step">
            <span className="thankyou-step__num">02</span>
            <div>
              <h5>Initial Response</h5>
              <p>We’ll reach out via your preferred contact channel within 2 business days.</p>
            </div>
          </div>
          <div className="thankyou-step">
            <span className="thankyou-step__num">03</span>
            <div>
              <h5>Discovery Call</h5>
              <p>A focused 20-minute discussion to clarify milestones and propose next steps.</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="inquiry-back-btn"
        onClick={onClose}
      >
        <span>Back to SYNRA</span>
        <ArrowRight size={17} strokeWidth={1.8} />
      </button>
    </motion.div>
  );
}
