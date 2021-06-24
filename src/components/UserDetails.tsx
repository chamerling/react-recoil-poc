import { User } from "../types/User";
import UserAvatar from "./UserAvatar";

const UserDetails = (props: User): JSX.Element => {
  return (
    <div style={{ display: "flex" }}>
      <UserAvatar {...props}/>
      <span>{props.username}</span>
    </div>
  );
};

export default UserDetails;