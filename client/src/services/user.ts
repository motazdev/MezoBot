import { DataResponse, GetUserRoles } from "@/lib/types";
import { User } from "discord.js";
import request from "./request";

const userService = {
  getUserRoles: ({ guildId, userId }: GetUserRoles): Promise<any> =>
    request.get(`/user/${userId}/${guildId}/roles`),
  getUserData: ({ userId }: { userId: string }): Promise<DataResponse<User>> =>
    request.get(`/user/${userId}`),
};

export default userService;
