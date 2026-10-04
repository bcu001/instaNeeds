import useAuth from "@/hooks/useAuth";
import { User } from "lucide-react";

const Avatar = ({ className = "" }) => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div
      className={`size-8 rounded-full border border-border bg-muted text-foreground flex items-center justify-center font-semibold text-xs select-none ${className}`}
    >
      {isAuthenticated && user?.name ? (
        user.name[0].toUpperCase()
      ) : (
        <User size={15} className="text-muted-foreground" />
      )}
    </div>
  );
};

export default Avatar;
