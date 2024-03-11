import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

function UserProfilePage() {
    // Extract userId from the URL using useParams hook
    const { id } = useParams();

    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div id="main-container">
                <div id="container" className="max-w-xs">
                    {/* Pass the userId to the UserProfile component */}
                    <UserProfile userId={parseInt(id)} />
                </div></div>
        </>
    );
}

export default UserProfilePage;