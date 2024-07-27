import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner className="w-32 h-32" />
      </div>
    </div>
  );
}
