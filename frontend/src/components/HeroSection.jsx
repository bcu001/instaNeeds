import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-16 pb-12 text-center sm:pt-20 sm:pb-14">
      {/* Pill Badge */}
      <span className="inline-flex items-center rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
        Delivery in about 10 minutes
      </span>

      {/* Main Headline */}
      <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
        Everyday essentials, delivered in minutes.
      </h1>

      {/* Subtitle */}
      <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
        Fresh groceries and household staples from your neighbourhood store,
        straight to your door.
      </p>

      {/* CTA Buttons */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/products"
          className="btn btn-primary h-10 px-6 rounded-lg text-sm font-medium shadow-xs transition-transform active:scale-[0.98]"
        >
          Start shopping
        </Link>
        <a
          href="#how"
          className="btn btn-outline h-10 px-6 rounded-lg text-sm font-medium border-border hover:bg-muted text-foreground transition-all shadow-xs"
        >
          How it works
        </a>
      </div>

      {/* 3-Column Stats */}
      <div className="mt-12 grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-3">
        <div className="group rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-ring hover:shadow-md">
          <b className="block text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            10 min
          </b>
          <span className="mt-1 block text-sm text-muted-foreground">
            Average delivery
          </span>
        </div>

        <div className="group rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-ring hover:shadow-md">
          <b className="block text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            5,000+
          </b>
          <span className="mt-1 block text-sm text-muted-foreground">
            Products in stock
          </span>
        </div>

        <div className="group rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-ring hover:shadow-md">
          <b className="block text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            ₹0
          </b>
          <span className="mt-1 block text-sm text-muted-foreground">
            Delivery over ₹199
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
