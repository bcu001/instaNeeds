import useAuth from "@/hooks/useAuth";
import { Link } from "react-router";
import Avatar from "./Avatar";

const ProfileDropdown = () => {
  const { isAuthenticated, signoutHandler } = useAuth();
  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-ghost btn-circle text-base-content"
        aria-label="avatar"
      >
        <Avatar />
      </button>
      <ul className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-200 bg-base-100 p-2 shadow-lg">
        {isAuthenticated && (
          <>
            <li>
              <button className="text-error" onClick={signoutHandler}>
                Sign out
              </button>
            </li>
            <li>
              <Link to={"/order"}>Order</Link>
              <Link to={"/profile"}>Profile</Link>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <li>
            <Link className="" to={`/signin`}>
              Sign in
            </Link>
          </li>
        )}
        <li>
            <Link to={"/settings"}>Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
