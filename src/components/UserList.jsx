import { useEffect, useState } from "react";
import { getUserAPI } from "../api/getUserAPI";
import UserInfo from "./UserInfo";

const UserList = () => {
  const [getUsers, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(getUsers);

  useEffect(() => {
    const users = getUserAPI();
    users.then((res) => {
      setUsers(res.data.results);
      setFilteredUsers(res.data.results);
    });
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    result = getUsers.filter((data) => {
      return data.name.first.search(value) !== -1;
    });
    setFilteredUsers(result);
  };

  return (
    <div>
      <input
        onChange={(event) => handleSearch(event)}
        placeholder={"Search Users"}
        type={"text"}
        className={"user-search"}
      />

      {filteredUsers.map((user) => {
        console.log("user", user);
        return (
          <div className="container">
            <div className="user-photo">
              <img src={`${user.picture.thumbnail}`} />
            </div>
            <div className="user-info">
              <UserInfo data={user.name.first + " " + user.name.last} />
              <UserInfo data={user.email} />
            </div>
            <div className="user-location">
              <UserInfo data={user.location.street.name} />
              <UserInfo data={user.location.city + " " + user.location.state} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
