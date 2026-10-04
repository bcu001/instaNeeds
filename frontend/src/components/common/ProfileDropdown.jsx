import useAuth from "@/hooks/useAuth";
import { Link } from "react-router";
import Avatar from "./Avatar";
import { LogOut, Package, Settings, User as UserIcon } from "lucide-react";

const ProfileDropdown = () => {
  const { isAuthenticated, signoutHandler, user } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        role="button"
        aria-label="User menu"
      >
        <Avatar className="size-7 hover:scale-105 transition-transform" />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-lg text-sm text-foreground space-y-0.5"
      >
        {isAuthenticated && user && (
          <li className="menu-title px-3 py-2 border-b border-border mb-1">
            <span className="font-semibold text-foreground truncate block">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground truncate block font-normal">
              {user.email}
            </span>
          </li>
        )}

        {isAuthenticated ? (
          <>
            <li>
              <Link
                to="/order"
                className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 hover:bg-muted font-medium text-foreground transition-colors"
              >
                <Package size={15} className="text-muted-foreground" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 hover:bg-muted font-medium text-foreground transition-colors"
              >
                <UserIcon size={15} className="text-muted-foreground" />
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 hover:bg-muted font-medium text-foreground transition-colors"
              >
                <Settings size={15} className="text-muted-foreground" />
                Settings
              </Link>
            </li>
            <div className="divider my-1 border-border" />
            <li>
              <button
                type="button"
                onClick={signoutHandler}
                className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-error hover:bg-error/10 font-medium transition-colors"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/signin"
                className="flex items-center gap-2 rounded-md px-2.5 py-1.5 hover:bg-muted font-medium text-foreground"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="flex items-center gap-2 rounded-md px-2.5 py-1.5 hover:bg-muted font-medium text-foreground"
              >
                Create account
              </Link>
            </li>
            <div className="divider my-1 border-border" />
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 hover:bg-muted font-medium text-foreground"
              >
                <Settings size={15} className="text-muted-foreground" />
                Settings
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ProfileDropdown;
