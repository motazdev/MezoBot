import { authOptions } from "@/app/utils/auth";
import AddStaffMemberModal from "@/components/guild-dashboard/modals/AddStaffMemberModal";
import PageHeader from "@/components/guild-dashboard/PageHeader";
import StaffTable from "@/components/guild-dashboard/tables/StaffTable";
import guildService from "@/services/guild";
import { getServerSession } from "next-auth";
import { staffColumns } from "./staffColumns";

const Page = async ({ params }: { params: { guildId: string } }) => {
  const staff = await guildService.getGuildStaff({ guildId: params.guildId });
  const session = await getServerSession(authOptions);
  return (
    <div className="py-10">
      <div className="flex flex-col gap-8">
        {/* SOON: Add staff from dashboard */}
        <PageHeader
          title="Staff"
          description="Click on ticket's status to view its details."
          action={<AddStaffMemberModal guildId={params.guildId} />}
        />
        <StaffTable
          columns={staffColumns}
          session={session}
          data={staff.data}
        />
      </div>
    </div>
  );
};

export default Page;
