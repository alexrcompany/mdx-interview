import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/UserService';
import IUserData from '../types/User';
import IUserUpdateData from '../types/UserUpdate';

interface UserProfileProps {
    userId: number,
}

const UserEdit: React.FC<UserProfileProps> = ({ userId }) => {
    const [user, setUser] = useState<IUserData | null>(null);

    const [formData, setFormData] = useState<IUserUpdateData>({
        firstName: '',
        lastName: '',
    });

    const nav = useNavigate();

    useEffect(() => {
        retrieveUser();
    }, [userId]);

    const retrieveUser = () => {
        UserDataService.get(userId)
            .then((response: any) => {
                console.log(response.data);
                setUser(response.data.user);
                setFormData({firstName: response.data.user.firstName, lastName: response.data.user.lastName});
            })
            .catch((e: Error) => {
                // Handle error
            });
    };

    const cancel = () => {
        nav("/");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    if (!user) {
        return <div>User could not be found...</div>;
    }

    const handleSubmit = (e) => {
        // Prevent default browser behaviour
        e.preventDefault(); 
        // Update over the API
        UserDataService.update(userId, formData)
            .then(() => {
                // Success
            })
            .catch((e: Error) => {
                // Handle error
            });
        nav('/');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className=" pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Edit User</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Username and email cannot be changed once the user is created.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                            <div className="pb-12 text-left">

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                disabled
                                                type="text"
                                                name="username"
                                                id="username"
                                                value={user.username}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            E-mail
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                disabled
                                                type="text"
                                                name="email"
                                                id="enail"
                                                value={user.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={cancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-sky-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </>
    );
}

export default UserEdit;