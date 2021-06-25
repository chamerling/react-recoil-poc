import { selector } from "recoil";
import { userListState } from "../atoms/userList";

export const totalUsersCount = selector<number>({
  key: "totalUsersCount",
  get: (({ get }) => get(userListState).length)
});