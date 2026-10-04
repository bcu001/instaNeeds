import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, ShoppingCart, Sun, Moon } from "lucide-react";
import useCartContext from "@/hooks/useCartContext";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import ProfileDropdown from "./ProfileDropdown";
import Logo from "./Logo";

const Navbar = () => {
  const { cartData, openDrawer } = useCartContext();
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        {/* Logo */}
       <Logo/>

        {/* Nav Links */}
        <nav
          className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground"
          aria-label="Main navigation"
        >
          <Link
            to="/products"
            className="px-3 py-1.5 rounded-md hover:text-foreground hover:bg-muted transition-colors"
          >
            Shop
          </Link>
          <Link
            to={isAuthenticated ? "/profile" : "/signin"}
            className="px-3 py-1.5 rounded-md hover:text-foreground hover:bg-muted transition-colors"
          >
            Account
          </Link>
        </nav>

        {/* Search bar */}
        <div className="flex-1 max-w-70 sm:max-w-[320px] ml-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="h-9 w-full rounded-lg border bg-transparent pl-9 pr-3 text-sm placeholder:text-muted-foreground transition-all focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring shadow-xs"
            />
          </form>
        </div>

        {/* Theme Toggle */}
        {/* <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button> */}

        {/* Sign in button if not logged in */}
        {!isAuthenticated ? (
          <Link to="/signin" className="btn btn-outline">
            Sign in
          </Link>
        ) : null}

        {/* Cart Button */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={openDrawer}
            className="btn btn-outline relative "
            aria-label={`Open cart, ${cartData?.totalItems || 0} items`}
          >
            <ShoppingCart size={16} />
            {cartData?.totalItems > 0 && (
              <span
                key={cartData.totalItems}
                className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary text-secondary px-1 text-[11px] font-semibold "
              >
                {cartData.totalItems}
              </span>
            )}
          </button>
        )}

        {/* Profile / Menu */}
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Navbar;
