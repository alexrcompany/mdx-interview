import UsersList from "../components/UserList";

function UsersPage() {
    return (
        <>
            <div id="main-container">
                <div id="container" className="max-w-sm">
                
                <h2 className="text-base font-semibold leading-7 text-gray-900">Users</h2>
                    <UsersList />
                </div></div>
        </>
    );

};

export default UsersPage;