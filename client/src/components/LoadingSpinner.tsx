import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}
const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-2 border-b-2 border-gray-200",
        className
      )}
    />
  );
};

export default LoadingSpinner;
