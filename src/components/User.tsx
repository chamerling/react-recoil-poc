import Identicon from "react-identicons";
import "./user.css";

export type UserProps = {
  id: number;
  username: string;
  online?: boolean;
}

const User = (props: UserProps): JSX.Element => {
  return (
    <div className="user">
      <div className={`user_status ${props.online ? "online" : "offline"}`}></div>
      <Identicon string={props.username} size="30"></Identicon>
    </div>
  );
}

export default User;