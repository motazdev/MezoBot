import RoleBadge from "@/components/guild-dashboard/RoleBadge";
import TicketsTable from "@/components/guild-dashboard/tables/TicketsTable";
import ticketService from "@/services/ticket";
import userService from "@/services/user";
import { Role } from "discord.js";
import Image from "next/image";
import { adminTicketsColumns } from "./adminTicketsColumns";

interface PageProps {
  params: { staffId: string; guildId: string };
}

const Page = async ({ params }: PageProps) => {
  const { guildId, staffId } = params;
  const userData = await userService.getUserData({ userId: staffId });
  const userRoles = await userService.getUserRoles({
    guildId: guildId,
    userId: staffId,
  });
  const userCliamedTickets = await ticketService.claimedTicketsByAdmin({
    adminId: userData.data.id,
  });
  return (
    <div className="flex flex-col gap-6 ">
      <div className="box bg-secondary  rounded-md px-6 py-8">
        <div className="flex flex-row gap-3">
          <div className="userimg w-24 h-24 relative">
            <Image
              src={`https://cdn.discordapp.com/avatars/${userData.data.id}/${userData.data.avatar}.webp`}
              alt="user-avatar"
              fill
              className="rounded-sm"
              sizes="100px"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMSP20FAAFIgJW0PRabQAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="user-info flex flex-col justify-center">
            <p className="font-semibold">{userData.data.globalName}</p>
            <p className="text-xs font-semibold text-gray-400">
              {userData.data.username}
            </p>
            <div className="roles grid grid-cols-3 gap-3 mt-3">
              {userRoles ? (
                userRoles?.data?.map(
                  (role: Role) =>
                    role.name !== "@everyone" && (
                      <RoleBadge role={role} key={role.id} color={role.color} />
                    )
                )
              ) : (
                <p>Loading Roles</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="user-tickets flex flex-col">
        <p className="text-3xl font-bold">Claimed Tickets</p>
        <TicketsTable
          columns={adminTicketsColumns}
          data={userCliamedTickets.data}
        />
      </div>
    </div>
  );
};

export default Page;
