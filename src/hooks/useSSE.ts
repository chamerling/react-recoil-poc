import { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userListState } from "../recoil/atoms/userList";
import { User } from "../types/User";

const useSSE = (path: string) =>  {
  const sse = useRef<EventSource>();
  const [users, setUsers] = useRecoilState(userListState);

  useEffect(() => {
      sse.current = new EventSource(path);
      sse.current.onopen = () => console.log("SSE opened");
      sse.current.close = () => console.log("SSE closed");

      return () => {
        console.log("Close SSE");
        sse.current?.close();
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sse.current) return;

    sse.current.onmessage = e => {
      const sseUser: Partial<User> = JSON.parse(e.data);
      console.log("SSE message", sseUser);
      const userIndex = users.findIndex(user => user.id === sseUser.id);
      console.log(userIndex);

      //const userIndex = users.findIndex(user => user.id === sseUser.id);
      //if (!userIndex) {
      //  return;
      //}
//
      const user = {...users[userIndex]};
//
      user.online = sseUser.online;
//
      setUsers((currentValue) => {
        return [...currentValue.slice(0, userIndex), user, ...currentValue.slice(userIndex + 1)];
      });

//      setUserList((currentValue) => {
//        return [...currentValue, user];
//      });
    };
  }, [setUsers, users]);
};

export default useSSE;