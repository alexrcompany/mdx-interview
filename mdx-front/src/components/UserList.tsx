import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";
import IUserData from '../types/User';

/**
 *  User List: This will be used as the main page
 */

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<Array<IUserData>>([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response: any) => {
        setUsers(response.data.users);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  if (users.length === 0) {
    return (<>
      <div>
        <p className="m-2 text-sm leading-6 text-gray-600">
           No users found.
        </p>
      </div>
    </>
    )
  }

  return (
    <>
      <div>
        <p className="m-2 text-sm leading-6 text-gray-600">
          Click in any of the following users to view his or her profile.
        </p>
        <ul className="grid grid-cols-1 gap-4 content-center">
          { /* Iterate over the users in the response */}
          {users &&
            users.map((user) => (
              <li className={"p-2 bg-sky-900 m-1 text-white rounded-2xl border-white font-bold"} key={user.id}>
                <Link to={'/user/' + user.id}>{user.lastName} {user.firstName}</Link>
              </li>
            ))}

        </ul>
      </div>
    </>
  );
};

export default UsersList;
