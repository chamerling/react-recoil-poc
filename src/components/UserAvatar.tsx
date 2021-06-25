import Identicon from "react-identicons";
import { User } from "../types/User";
import "./user.css";

const UserAvatar = (props: User): JSX.Element => {
  const displayStatusIcon = false;
  return (
    <div className={`user ${props.online ? "online" : "offline"}`}>
      { displayStatusIcon && <div className={`user_status ${props.online ? "online" : "offline"}`}></div> }
      <Identicon string={props.username} size="30"></Identicon>
    </div>
  );
}

export default UserAvatar;