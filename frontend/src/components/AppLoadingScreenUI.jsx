
const AppLoadingScreenUI = () => {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      <header className="border-b border-base-300">
        <nav className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex flex-1 items-center gap-2">
            <div className="skeleton h-8 w-8 rounded-lg" />
            <div className="skeleton h-4 w-24 rounded" />
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <div className="skeleton h-4 w-10 rounded" />
            <div className="skeleton h-4 w-14 rounded" />
          </div>

          {/* Search */}
          <div className="hidden px-8 md:block">
            <div className="skeleton h-9 w-40 rounded-lg lg:w-60" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="skeleton h-8 w-8 rounded-full" />
            <div className="skeleton h-9 w-9 rounded-full" />
            <div className="skeleton h-8 w-8 rounded-full" />
          </div>
        </nav>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="flex flex-col items-center pt-16 text-center sm:pt-20 lg:pt-24">
          <div className="skeleton mb-5 h-6 w-36 rounded-full" />

          {/* Heading */}
          <div className="flex w-full flex-col items-center gap-2">
            <div className="skeleton h-8 w-[85%] max-w-2xl rounded-lg sm:h-10 lg:h-12" />
            <div className="skeleton h-8 w-[65%] max-w-xl rounded-lg sm:h-10 lg:h-12" />
          </div>

          {/* Description */}
          <div className="mt-5 flex w-full flex-col items-center gap-2">
            <div className="skeleton h-3.5 w-[85%] max-w-lg rounded" />
            <div className="skeleton h-3.5 w-[60%] max-w-sm rounded" />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="skeleton h-10 w-28 rounded-lg" />
            <div className="skeleton h-10 w-28 rounded-lg" />
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:mx-auto lg:mt-12 lg:max-w-5xl">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex min-h-24 flex-col justify-center gap-2 rounded-xl border border-base-300 p-4 sm:p-5"
            >
              <div className="skeleton h-6 w-24 rounded" />
              <div className="skeleton h-3 w-32 rounded" />
            </div>
          ))}
        </section>

        {/* Categories */}
        <section className="mt-20 pb-12 sm:mt-24 lg:mt-20">
          {/* Section heading */}
          <div className="mb-5 flex items-center justify-between">
            <div className="space-y-2">
              <div className="skeleton h-5 w-36 rounded" />
              <div className="skeleton h-3 w-48 rounded" />
            </div>
            <div className="skeleton h-4 w-16 rounded" />
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border border-base-300 p-3 sm:min-h-32"
              >
                <div className="skeleton h-12 w-12 rounded-lg sm:h-14 sm:w-14" />
                <div className="skeleton h-3 w-24 max-w-full rounded" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AppLoadingScreenUI;
