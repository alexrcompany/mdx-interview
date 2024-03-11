import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import IUserData from '../types/User';
import { useNavigate } from "react-router";

interface UserProfileProps {
    userId: number,
}

/**
 * User Profile 
 */

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
    const [user, setUser] = useState<IUserData | null>(null);

    useEffect(() => {
        retrieveUser();
    }, [userId]);

    const nav = useNavigate();

    const retrieveUser = () => {
        UserDataService.get(userId)
            .then((response: any) => {
                setUser(response.data.user);
            })
            .catch((e: Error) => {
                // Handle error
            });
    };

    const removeUser = () => {
        UserDataService.remove(userId)
            .then((response: any) => {
                setUser(response.data.user);
                console.log(response.data);
            })
            .catch((e: Error) => {
                // Handle error
            });

            nav("/");
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    const cancel = () => {
        nav("/");
    }

    const edit = () => {
        nav("/edit/" + userId);
    }

    return (
        <>
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">User Profile</h2>
                <p className="m-2 text-sm leading-6 text-gray-600">
                    You can modify or delete this profile.
                </p>
                <div className="col-md-6 text-left">
                    <p><span className="font-bold">Username:</span> {user.username}</p>
                    <p><span className="font-bold">E-mail:</span> {user.email}</p>
                    <p><span className="font-bold">First name:</span> {user.firstName}</p>
                    <p><span className="font-bold">Last name:</span> {user.lastName}</p>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={cancel}
                    >
                        Go Back
                    </button>
                    <button
                        className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={removeUser}
                    >
                        Delete
                    </button>
                    <button
                    onClick={edit}
                        className="rounded-md bg-sky-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
