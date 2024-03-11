import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataService from '../services/UserService';

function NewUser() {

    const nav = useNavigate();

    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const cancel = () => {
        nav("/");
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (e: any) => {
        // Prevent default browser behaviour
        e.preventDefault();
        // Perform the request
        UserDataService.create(user)
            .then((response: any) => {
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
                        <h2 className="text-base font-semibold leading-7 text-gray-900">New User</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Fill in this form to create a new user using the TASK 2 API
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
                                                value={user.firstName}
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
                                                value={user.lastName}
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
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </>
    );
}

export default NewUser;