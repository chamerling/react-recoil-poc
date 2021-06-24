import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";
import { User } from "../types/User";

const getUser = (id: number): Promise<User> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getOne(id));
    }, 500);
  });
};

const getOne = (id: number): User => ({ id, username: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals]}), online: false });

const generateUsers = (size = 100): User[] => {
  return new Array<User>(size).fill({id: 0, online: false, username: ""}).map((user, i) => (
    {
      ...user,
      ...getOne(i),
    }
  ));
};

export {
  getUser,
  generateUsers,
};