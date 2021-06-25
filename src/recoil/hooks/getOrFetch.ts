import { useRecoilCallback, useRecoilState } from "recoil";
import { getUser } from "../../services/User";
import { User } from "../../types/User";
import { userListState } from "../atoms/userList";

const useGetOrFetch = () => {
  const [users, setUsers] = useRecoilState(userListState);

  const fetchUser = useRecoilCallback(() => async () => {
    const nextId = Math.floor(Math.random() * users.length) + 50;
    const index = users.findIndex(user => user.id === nextId);
    let user: User;

    if (index > -1) {
      console.log("User already exists", index);
      user = users[index];
    } else {
      console.log("Get new user", nextId);

      user = await getUser(nextId);
      setUsers(() => [...users, user]);
    }

    return {
      id: nextId,
      user
    };
  });

  return fetchUser;
};

export default useGetOrFetch;