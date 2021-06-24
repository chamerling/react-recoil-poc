import { selector } from "recoil";
import { userListState } from "../atoms/userList";

export const onlineUsers = selector<number>({
  key: "onlineUsers",
  get: (({ get }) => get(userListState).filter(user => user.online).length)
});