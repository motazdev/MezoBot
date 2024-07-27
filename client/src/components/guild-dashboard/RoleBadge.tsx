import { cn } from "@/lib/utils";
import { Role } from "discord.js";

const RoleBadge = ({ role, color }: { role: Role; color: string | number }) => {
  return (
    <span
      className="relative inline-block overflow-hidden rounded-full p-px"
      key={role.id}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

      <div
        className={`inline-flex h-full text-white w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-3 py-1 text-xs font-medium  backdrop-blur-3xl`}
      >
        {role.name}
      </div>
    </span>
  );
};

export default RoleBadge;
