import { selector } from "recoil";
import { userListState } from "../atoms/userList";

export const onlineUsersCount = selector<number>({
  key: "onlineUsersCount",
  get: (({ get }) => get(userListState).filter(user => user.online).length)
});