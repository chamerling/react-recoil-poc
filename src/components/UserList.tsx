import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import UserAvatar from "./UserAvatar";
import { onlineUsers } from "../recoil/selectors/onlineUsers";
import { userListState } from "../recoil/atoms/userList";
import { currentUser } from "../recoil/atoms/currentUser";
import UserDetails from "./UserDetails";
import { User } from "../types/User";

function UserList(): JSX.Element {
  const savedCallback = useRef<() => void>();
  const userList = useRecoilValue<User[]>(userListState);
  const [selectedUser, setSelectedUser] = useRecoilState<User | undefined>(currentUser);
  const onlineUsersCount = useRecoilValue(onlineUsers);
  const [users, setUsers] = useRecoilState(userListState);

  const refreshUserInfo = () => {
    const index = Math.floor(Math.random() * users.length);
    const user = {...users[index]};
    user.online = !user.online;

    const newState = [...users.slice(0, index), user, ...users.slice(index + 1)];
    setUsers(() => newState);
  };

  useEffect(() => {
    // take a look at the setInterval bible https://overreacted.io/fr/making-setinterval-declarative-with-react-hooks/
    savedCallback.current = refreshUserInfo;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }

    const intervalID = setInterval(tick, 500);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
    <div>Online users {onlineUsersCount}</div>
    <div className="list" style={{ display: "flex", flexWrap: "wrap" }}>
      {
        userList.map((user, index) => (
          <div
            style={{ padding: "5px" }}
            key={index}
            onClick={() => setSelectedUser(user)}
          >
            <UserAvatar {...user}/>
          </div>
        ))
      }
    </div>
    <div className="selected">
      {selectedUser && <UserDetails {...selectedUser}/>}
    </div>
    </>
  );
};

export default UserList;