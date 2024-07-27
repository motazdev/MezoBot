import { ReactNode } from "react";

interface PageProps {
  title: string;
  description?: string;
  action?: ReactNode;
}
const PageHeader = ({ title, description, action }: PageProps) => {
  return (
    <div className="flex flex-row items-center justify-between pb-10">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      {action}
    </div>
  );
};

export default PageHeader;
