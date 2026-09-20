import { FormEvent, useState } from "react";
import { useLocation } from "wouter";
import { loginAdmin } from "@/services/adminService";
import { saveAdminToken } from "@/services/authService";

export default function AdminLogin() {
  const [, navigate] = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginAdmin(email, password);

      saveAdminToken(response.access_token);
      navigate("/admin/inquiries");
    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (error.response?.status === 403) {
        setError("This admin account has been disabled.");
      } else {
        setError("Unable to connect to the authentication server.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--paper)] px-5 py-10">
      <div className="w-full max-w-md">

        {/* Back to website */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--body)] transition hover:text-[var(--terra)]"
          >
            ← Back to website
          </button>
        </div>

        {/* Brand */}
        <div className="mb-10 text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--terra)]">
            Synra Studios
          </p>

          <h1 className="mt-3 font-['DM_Serif_Display'] text-5xl tracking-[-0.04em]">
            Admin Login
          </h1>

          <p className="mt-3 text-sm text-[var(--body)]">
            Sign in to manage project inquiries.
          </p>
        </div>

        {/* Login Card */}
        <div className="border border-[var(--line-strong)] bg-[var(--surface)] p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.14em]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="username"
                placeholder="admin@synrastudios.com"
                className="w-full border border-[var(--line-strong)] bg-[var(--paper)] px-4 py-3 text-sm outline-none transition focus:border-[var(--terra)]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.14em]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full border border-[var(--line-strong)] bg-[var(--paper)] px-4 py-3 text-sm outline-none transition focus:border-[var(--terra)]"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="border border-[var(--terra)] bg-[var(--pink)] px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                color: "#ffffff",
                backgroundColor: "#292b2d",
              }}
              className="flex w-full items-center justify-center px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "LOGIN →"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[0.65rem] text-[var(--body)]">
          Authorized Synra team members only.
        </p>
      </div>
    </main>
  );
}