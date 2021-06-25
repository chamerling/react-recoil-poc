import { selectorFamily, useSetRecoilState } from "recoil";
import { getUser } from "../../services/User";
import { User } from "../../types/User";
import { userListState } from "../atoms/userList";

const getOrCreateUser = selectorFamily<User, number>({
  key: "getOrCreateUser",
  get: (id) => async ({ get }) => {
    const setUsers = useSetRecoilState(userListState)
    const userList = get(userListState);

    const index = userList.findIndex(user => user.id === id);
    if (index > -1) {
      console.log("User already exists", index);
      return userList[index];
    }

    console.log("User does not exists locally, fetch it", id);
    const user = await getUser(id);

    setUsers(() => [...userList, user]);

    return user;
  },
});

export default getOrCreateUser;