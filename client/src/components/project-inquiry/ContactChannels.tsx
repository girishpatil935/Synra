import { SYNRA_CONTACT } from "@/data/company";
import { ArrowUpRight, Mail, Instagram } from "lucide-react";

export function ContactChannels() {
  return (
    <div className="inquiry-sidebar__channels glass-surface">
      <div className="inquiry-sidebar__channels-header">
        <span className="eyebrow">Direct Enquiry Channels</span>
        <p className="text-xs text-[var(--body)] mt-1">
          Prefer reaching out directly? Connect through our official channels.
        </p>
      </div>

      <div className="inquiry-sidebar__channels-list">
        <a
          href={SYNRA_CONTACT.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inquiry-channel-item"
        >
          <div className="inquiry-channel-item__icon">
            <Instagram size={16} strokeWidth={1.8} />
          </div>
          <div className="inquiry-channel-item__details">
            <span className="inquiry-channel-item__title">Instagram ↗</span>
            <span className="inquiry-channel-item__sub">@synrastudios</span>
          </div>
          <ArrowUpRight size={15} className="inquiry-channel-item__arrow" />
        </a>

        <a
          href={`mailto:${SYNRA_CONTACT.email.address}`}
          className="inquiry-channel-item"
        >
          <div className="inquiry-channel-item__icon">
            <Mail size={16} strokeWidth={1.8} />
          </div>
          <div className="inquiry-channel-item__details">
            <span className="inquiry-channel-item__title">
              {SYNRA_CONTACT.email.label}
            </span>
            <span className="inquiry-channel-item__sub">Official Studio Inbox</span>
          </div>
          <ArrowUpRight size={15} className="inquiry-channel-item__arrow" />
        </a>
      </div>
    </div>
  );
}
