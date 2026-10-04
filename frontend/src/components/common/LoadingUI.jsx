import { Loader2 } from "lucide-react";

const LoadingUI = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LoadingUI;
