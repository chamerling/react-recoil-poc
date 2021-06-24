import { atom } from "recoil";
import { generateUsers } from "../../services/User";
import { User } from "../../types/User";

export const userListState = atom<User[]>({
  key: 'userListState',
  default: generateUsers(100),
});
