import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  getInquiries,
  updateInquiryStatus,
  type Inquiry,
  type InquiryStatus,
} from "@/services/adminService";
import { logoutAdmin } from "@/services/authService";

const statusOptions: InquiryStatus[] = [
  "new",
  "contacted",
  "discussion",
  "quoted",
  "converted",
  "closed",
];

const statusLabels: Record<InquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  discussion: "Discussion",
  quoted: "Quoted",
  converted: "Converted",
  closed: "Closed",
};

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center border border-[var(--line)] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em]">
      {status}
    </span>
  );
}

export default function AdminInquiries() {
  const [, navigate] = useLocation();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState("");

  async function loadInquiries() {
    try {
      setLoading(true);
      setError("");

      const data = await getInquiries();

      setInquiries(data);

      if (data.length > 0) {
        setSelectedInquiry(current => current ?? data[0]);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load inquiries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  const stats = useMemo(() => {
    return {
      total: inquiries.length,
      new: inquiries.filter(item => item.status === "new").length,
      contacted: inquiries.filter(item => item.status === "contacted").length,
      discussion: inquiries.filter(item => item.status === "discussion").length,
      quoted: inquiries.filter(item => item.status === "quoted").length,
      converted: inquiries.filter(item => item.status === "converted").length,
    };
  }, [inquiries]);

  async function handleStatusChange(status: InquiryStatus) {
    if (!selectedInquiry) return;

    try {
      setUpdatingStatus(true);

      await updateInquiryStatus(selectedInquiry.id, status);

      const updatedInquiry = {
        ...selectedInquiry,
        status,
        updated_at: new Date().toISOString(),
      };

      setSelectedInquiry(updatedInquiry);

      setInquiries(current =>
        current.map(inquiry =>
          inquiry.id === selectedInquiry.id ? updatedInquiry : inquiry
        )
      );
    } catch (err) {
      console.error(err);
      setError("Unable to update inquiry status.");
    } finally {
      setUpdatingStatus(false);
    }
  }
  function handleLogout() {
    logoutAdmin();
    navigate("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] px-5 py-8 md:px-10 lg:px-16">
      {/* Header */}
      <header className="mb-10 flex flex-col justify-between gap-5 border-b border-[var(--line-strong)] pb-6 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--terra)]">
            Synra Studios
          </p>

          <h1 className="font-['DM_Serif_Display'] text-5xl tracking-[-0.04em] md:text-7xl">
            Inquiries
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--body)]">
            Manage project inquiries, review client requirements and track
            conversations from one place.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={loadInquiries}
            className="border border-[var(--line-strong)] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-[var(--peach)]"
          >
            Refresh
          </button>

          <button
            onClick={handleLogout}
            className="border border-[var(--line-strong)] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-[var(--ink)] hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="mb-6 border border-[var(--terra)] bg-[var(--pink)] px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Statistics */}
      <section className="mb-10 grid grid-cols-2 border-l border-t border-[var(--line)] md:grid-cols-3 lg:grid-cols-6">
        <Stat label="Total" value={stats.total} />
        <Stat label="New" value={stats.new} />
        <Stat label="Contacted" value={stats.contacted} />
        <Stat label="Discussion" value={stats.discussion} />
        <Stat label="Quoted" value={stats.quoted} />
        <Stat label="Converted" value={stats.converted} />
      </section>

      {/* Main area */}
      <section className="grid min-h-[600px] border border-[var(--line-strong)] lg:grid-cols-[0.8fr_1.2fr]">
        {/* Inquiry List */}
        <div className="border-b border-[var(--line-strong)] lg:border-b-0 lg:border-r">
          <div className="border-b border-[var(--line)] px-5 py-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[var(--body)]">
              All inquiries
            </p>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-[var(--body)]">
              Loading inquiries...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-6 text-sm text-[var(--body)]">
              No inquiries yet.
            </div>
          ) : (
            <div>
              {inquiries.map(inquiry => {
                const active = selectedInquiry?.id === inquiry.id;

                return (
                  <button
                    key={inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={`block w-full border-b border-[var(--line)] p-5 text-left transition ${
                      active ? "bg-[var(--peach)]" : "hover:bg-[var(--surface)]"
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--terra)]">
                        {inquiry.reference_id}
                      </span>

                      <StatusBadge status={inquiry.status} />
                    </div>

                    <h2 className="text-base font-bold">{inquiry.full_name}</h2>

                    <p className="mt-1 text-xs text-[var(--body)]">
                      {inquiry.company_name}
                    </p>

                    <p className="mt-3 text-[0.68rem] text-[var(--body)]">
                      {formatDate(inquiry.created_at)}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 md:p-8 lg:p-10">
          {!selectedInquiry ? (
            <div className="flex min-h-[500px] items-center justify-center text-sm text-[var(--body)]">
              Select an inquiry to view details.
            </div>
          ) : (
            <>
              {/* Details Header */}
              <div className="mb-8 border-b border-[var(--line)] pb-6">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[var(--terra)]">
                      {selectedInquiry.reference_id}
                    </p>

                    <h2 className="mt-2 font-['DM_Serif_Display'] text-4xl tracking-[-0.03em] md:text-5xl">
                      {selectedInquiry.full_name}
                    </h2>

                    <p className="mt-2 text-sm text-[var(--body)]">
                      {selectedInquiry.company_name}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[var(--body)]">
                      Status
                    </label>

                    <select
                      value={selectedInquiry.status}
                      disabled={updatingStatus}
                      onChange={event =>
                        handleStatusChange(event.target.value as InquiryStatus)
                      }
                      className="min-w-[160px] border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--terra)]"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>
                          {statusLabels[status]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <DetailSection title="Contact information">
                <DetailItem label="Email" value={selectedInquiry.email} />

                <DetailItem
                  label="Phone"
                  value={selectedInquiry.phone || "Not provided"}
                />

                <DetailItem
                  label="Website"
                  value={selectedInquiry.website_url || "Not provided"}
                />

                <DetailItem
                  label="Preferred contact"
                  value={selectedInquiry.contact_preference}
                />

                {selectedInquiry.preferred_time && (
                  <DetailItem
                    label="Preferred time"
                    value={selectedInquiry.preferred_time}
                  />
                )}
              </DetailSection>

              {/* Business */}
              <DetailSection title="Business">
                <DetailItem
                  label="Industry"
                  value={
                    selectedInquiry.custom_industry || selectedInquiry.industry
                  }
                />

                <div className="md:col-span-2">
                  <DetailItem
                    label="Business description"
                    value={selectedInquiry.business_description}
                  />
                </div>
              </DetailSection>

              {/* Services */}
              <DetailSection title="Services requested">
                <div className="flex flex-wrap gap-2 md:col-span-2">
                  {selectedInquiry.services.map(service => (
                    <span
                      key={service}
                      className="border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-2 text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </DetailSection>

              {/* Project */}
              <DetailSection title="Project">
                <DetailItem label="Timeline" value={selectedInquiry.timeline} />

                <DetailItem label="Budget" value={selectedInquiry.budget} />

                <div className="md:col-span-2">
                  <DetailItem
                    label="Project details"
                    value={selectedInquiry.project_details}
                  />
                </div>
              </DetailSection>

              {/* Metadata */}
              <div className="mt-10 border-t border-[var(--line)] pt-5 text-[0.65rem] text-[var(--body)]">
                <p>Created: {formatDate(selectedInquiry.created_at)}</p>

                <p className="mt-1">
                  Updated: {formatDate(selectedInquiry.updated_at)}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-b border-r border-[var(--line)] bg-[var(--surface)] p-5">
      <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--body)]">
        {label}
      </p>

      <p className="mt-2 font-['DM_Serif_Display'] text-4xl">{value}</p>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h3 className="mb-4 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--terra)]">
        {title}
      </h3>

      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[var(--body)]">
        {label}
      </p>

      <p className="whitespace-pre-wrap text-sm leading-6">{value}</p>
    </div>
  );
}
