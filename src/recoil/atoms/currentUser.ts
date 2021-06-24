import { atom } from "recoil";
import { User } from "../../types/User";

export const currentUser = atom<User | undefined>({
  key: 'currentUser',
  default: undefined,
});
