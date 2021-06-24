import { atom } from "recoil";
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";
import { UserProps } from "../../components/User";

const users = new Array<UserProps>(100).fill({id: 0, online: false, username: ""}).map((user, i) => (
  {
    ...user,
    ...{ id: i, username: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })},
  }
));

export const userListState = atom<UserProps[]>({
  key: 'userListState',
  default: users,
});
