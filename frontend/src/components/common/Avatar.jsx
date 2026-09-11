import useAuth from "@/hooks/useAuth";
import { User } from "lucide-react";

const Avatar = ({ className }) => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="avatar avatar-placeholder">
      <div
        className={`bg-primary text-neutral-content size-7 rounded-full font-black ${className}`}
      >
        <span className={`text-inherit`}>
          {isAuthenticated ? user.name[0] : <User />}
        </span>
      </div>
    </div>
  );
};

export default Avatar;
