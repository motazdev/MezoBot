import userService from "@/services/user";
import { Role } from "discord.js";
import Image from "next/image";
import RoleBadge from "./RoleBadge";

const UserCard = async ({
  userId,
  guildId,
}: {
  userId: string;
  guildId: string;
}) => {
  const userData = await userService.getUserData({ userId });
  const userRolesData = await userService.getUserRoles({ guildId, userId });
  const user = userData.data;
  const userRoles = userRolesData.data.filter(
    (role: Role) => role.name !== "@everyone"
  );
  return (
    <div className="border rounded-md py-5 px-3">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center gap-3">
          <div className="img w-10 h-10 relative">
            <Image
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt="user-avatar"
              fill
              className="rounded-full"
              sizes="100px"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMSP20FAAFIgJW0PRabQAAAABJRU5ErkJggg=="
            />
          </div>
          <p>{user.globalName}</p>
        </div>
        <div className="roles flex flex-col gap-3">
          <p className="font-semibold text-sm">Roles</p>
          <div className="roles-spreading-area grid grid-cols-3 gap-2">
            {userRoles.length ? (
              userRoles.map((role: Role) => {
                return (
                  <RoleBadge
                    role={role}
                    color={role.color.toString(16)}
                    key={role.id}
                  />
                );
              })
            ) : (
              <p className="col-span-3 w-full text-sm text-muted-foreground">
                User Has No Roles
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
