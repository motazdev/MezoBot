export interface DBUser {
  _id: string;
  id: string;
  guildId: string;
  name: string;
  globalName: string;
  role: "user" | "admin";
}
export interface GetUserRoles {
  guildId: string;
  userId: string;
}
export interface DefaultDataResponse {
  success: boolean;
  data: string;
}

export interface DataResponse<T> {
  success: boolean;
  data: T;
}

export interface createDmBodyProps {
  recipient_id: string;
}
