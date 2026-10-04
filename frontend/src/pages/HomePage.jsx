import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useAuth from "@/hooks/useAuth";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedProductSection from "./FeaturedProductSection";

const HomePage = () => {
  useDocumentTitle("InstaNeeds – Essentials, delivered");
  const { isAuthenticated, user } = useAuth();
  const [emailInput, setEmailInput] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      navigate(`/signup?email=${encodeURIComponent(emailInput.trim())}`);
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategorySection />

      {/* Featured Products */}
      <FeaturedProductSection />

      {/* ── How it works ────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <section id="how">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              How it works
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              From shelf to your kitchen counter in 3 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs transition-all hover:border-ring">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-foreground border border-border/50">
                1
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Choose
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Browse categories or search for what you need.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs transition-all hover:border-ring">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-foreground border border-border/50">
                2
              </div>
              <h3 className="text-base font-semibold text-foreground">
                We pack
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Your nearest store prepares the order in minutes.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs transition-all hover:border-ring">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-foreground border border-border/50">
                3
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Delivered
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Handed over at your door, fast.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Call to action / Join card ─────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div
          id="join"
          className="rounded-2xl border border-border bg-muted/60 p-8 sm:p-12 text-center transition-all"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {isAuthenticated
              ? `Welcome back, ${user?.name || "Friend"}`
              : "Create your account"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
            {isAuthenticated
              ? "Check your past orders, manage your profile and track every delivery in real-time."
              : "Save addresses, reorder in a tap and track every delivery."}
          </p>

          {!isAuthenticated ? (
            <form
              onSubmit={handleGetStarted}
              className="mx-auto mt-6 flex max-w-sm flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                placeholder="you@example.com"
                aria-label="Email"
                className="h-9 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                className="btn btn-primary h-9 px-5 rounded-lg text-sm font-medium shadow-xs"
              >
                Get started
              </button>
            </form>
          ) : (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/products"
                className="btn btn-primary h-9 px-5 rounded-lg text-sm font-medium"
              >
                Browse products
              </Link>
              <Link
                to="/order"
                className="btn btn-outline h-9 px-5 rounded-lg text-sm font-medium"
              >
                View orders
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
