import { SYNRA_TEAM, type TeamMemberData } from "@/data/company";
import { User } from "lucide-react";

export function TeamSection() {
  return (
    <div className="inquiry-sidebar__team">
      <div className="inquiry-sidebar__team-header">
        <div className="section-label">
          <span className="section-label__number">05</span>
          <span className="section-label__line" />
          <span>The SYNRA Team</span>
        </div>
        <h3 className="inquiry-sidebar__team-title">
          THE PEOPLE BEHIND SYNRA.
        </h3>
        <p className="inquiry-sidebar__team-subtitle">
          Five people. One vision. Building digital growth for businesses.
        </p>
      </div>

      <div className="inquiry-sidebar__team-list">
        {SYNRA_TEAM.map((member: TeamMemberData, index: number) => (
          <div key={member.id} className="inquiry-team-card glass-surface">
            <div className="inquiry-team-card__top">
              <span className="inquiry-team-card__index">0{index + 1}</span>
              <div className="inquiry-team-card__avatar">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} />
                ) : (
                  <User size={15} strokeWidth={1.7} />
                )}
              </div>
            </div>
            <div className="inquiry-team-card__info">
              <h4 className="inquiry-team-card__name">{member.name}</h4>
              <div className="inquiry-team-card__role-pill">{member.role}</div>
              <p className="inquiry-team-card__focus">
                <span className="inquiry-team-card__focus-label">Focus: </span>
                {member.focus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
