import { IEmbed } from "@/DB/models/Embed";
import { IUser } from "@/DB/models/User";
import { DataResponse, DBUser, DefaultDataResponse } from "@/lib/types";
import { ClientUser, User } from "discord.js";
import request from "./request";
import { IGuild } from "@/DB/models/Guild";

const guildService = {
  getSingleGuild: ({
    guildId,
  }: {
    guildId: string;
  }): Promise<DataResponse<IGuild>> => request.get(`/guild/${guildId}`),
  getGuildStaff: ({
    guildId,
  }: {
    guildId: string;
  }): Promise<DataResponse<DBUser[]>> => request.get(`/guild/${guildId}/staff`),
  getGuildEmbed: ({
    guildId,
    embedTag,
  }: {
    guildId: string;
    embedTag: string;
  }): Promise<DataResponse<IEmbed>> =>
    request.get(`/guild/${guildId}/embed/${embedTag}`),
  getGuildEmbeds: ({
    guildId,
  }: {
    guildId: string;
  }): Promise<DataResponse<IEmbed[]>> => request.get(`/guild/${guildId}/embed`),
  createEmbed: ({
    guildId,
    embedTag,
    data,
  }: {
    guildId: string;
    embedTag: string;
    data: any;
  }): Promise<DefaultDataResponse> =>
    request.post(`/guild/${guildId}/embed/update/${embedTag}`, data),
  addEmbedField: ({
    guildId,
    embedTag,
    data,
  }: {
    guildId: string;
    embedTag: string;
    data: any;
  }): Promise<DefaultDataResponse> =>
    request.post(`/guild/${guildId}/embed/addfield/${embedTag}`, data),
  deleteEmbedField: ({
    guildId,
    embedTag,
    fieldId,
  }: {
    guildId: string;
    embedTag: string;
    fieldId: string;
  }): Promise<DefaultDataResponse> =>
    request.delete(
      `/guild/${guildId}/embed/deletefield/${embedTag}/${fieldId}`
    ),
  getGuildMembers: ({
    guildId,
  }: {
    guildId: string;
  }): Promise<DataResponse<ClientUser[]>> =>
    request.get(`/guild/${guildId}/members`),
  updateGuildSettings: ({
    guildId,
    data,
  }: {
    guildId: string;
    data: { categoryId: string | null; staff_roles: any[] | null };
  }): Promise<DefaultDataResponse> =>
    request.post(`/guild/${guildId}/settings`, data),
  checkBotInGuild: ({
    guildId,
  }: {
    guildId: string;
  }): Promise<DefaultDataResponse> =>
    request.get(`/guild/${guildId}/bot-exist`),
};

export default guildService;
