import { useParams } from "react-router";
import UserEdit from "../components/UserEdit";

/**
 *  User Edit Page
 */
function UserEditPage() {

    // Extract userId from the URL using useParams hook
    const { id } = useParams();
    
    // Return the page containing the component for user edition
    return (
        <>
            <div id="main-container">
                <div id="container">
                    <UserEdit userId={id} />
                </div>
            </div>
        </>
    );

};

export default UserEditPage;