import { atom } from "recoil";
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";
import { User } from "../../types/User";

const users = new Array<User>(100).fill({id: 0, online: false, username: ""}).map((user, i) => (
  {
    ...user,
    ...{ id: i, username: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })},
  }
));

export const userListState = atom<User[]>({
  key: 'userListState',
  default: users,
});
