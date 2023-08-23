import { useDispatch, useSelector } from "react-redux";
import './FriendIndex.css';
import { getFriendsByUserId, getFriendRequestsByUserId, acceptFriendRequest, deleteFriendship } from "../../store/friendshipsReducer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const FriendIndex = ({ user }) => {
    const dispatch = useDispatch();
    const sessionUserFriends = useSelector(getFriendsByUserId(user.id));
    const sessionUserFriendRequests = useSelector(getFriendRequestsByUserId(user.id));

    const handleAccept = (friendshipId) => {
        dispatch(acceptFriendRequest(friendshipId));
    };

    const handleReject = (friendshipId) => {
        dispatch(deleteFriendship(friendshipId));
    };

    return (
        <div className="friend-index">
            <h3>Friend Requests</h3>
            {sessionUserFriendRequests.length > 0 ? (
                sessionUserFriendRequests.map(friend => (
                    <div key={friend.id} className="friend-item">
                        <Link to={`/users/${friend.id}`} className="friend-link">
                            <img 
                                className="friend-profile-picture" 
                                src={friend.profilePictureUrl} 
                                alt={''} 
                                onError={(e) => {e.target.onerror = null; e.target.src="path_to_default_image.jpg";}}
                            />
                            <span>{friend.firstName} {friend.lastName}</span>
                            <span>{friend.mutualFriendsCount} mutual friends</span>
                        </Link>

                        <button onClick={() => handleAccept(friend.friendshipId)}>Accept</button>
                        <button onClick={() => handleReject(friend.friendshipId)}>Reject</button>
                    </div>
                ))
            ) : (
                <p>No pending friend requests.</p>
            )}

            <h3>Friends</h3>
            {sessionUserFriends.length > 0 ? (
                sessionUserFriends.map(friend => (
                    <Link key={friend.id} to={`/users/${friend.id}`} className="friend-link">
                        <div key={friend.id} className="friend-item">
                            <img 
                                className="friend-profile-picture" 
                                src={friend.profilePictureUrl} 
                                alt={''} 
                                onError={(e) => {e.target.onerror = null; e.target.src="path_to_default_image.jpg";}}
                            />
                            <span>{friend.firstName} {friend.lastName}</span>
                            <span>{friend.mutualFriendsCount} mutual friends</span>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No friends found</p>
            )}
        </div>
    );
};

export default FriendIndex;
