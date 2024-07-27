import { DefaultDataResponse } from "@/lib/types";
import request from "./request";

const newsLetterService = {
  addUser: ({
    email,
  }: {
    email: string;
  }): Promise<DefaultDataResponse> | DefaultDataResponse =>
    request.post(`/newsletter/add`, { email }),
};

export default newsLetterService;
