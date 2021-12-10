import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComponentLoader from './ComponentLoader';
import NotFound from './NotFound';

const Profile = ({ user }) => {
  const { isAuthenticated, username } = user;
  const { username: usernameParams } = useParams();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const findUserID = async () => {
      const response = await fetch('/api/user/' + usernameParams, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { userID } = await response.json();
      setUserID(userID);
    };
    findUserID();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getProfilePicture = async () => {
      const response = await fetch('/profile-picture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID }),
      });
      const body = await response.json();
      setAvatar(body.profilePicture);
    };
    getProfilePicture();
  }, [userID]);

  const [avatar, setAvatar] = useState('');

  const navigate = useNavigate();
  if (isAuthenticated) {
    console.log('logged in');
  }

  return (
    <div className="profile">
      {userID !== 'UserNotFound' && (
        <>
          <div className="profile-picture">
            {!avatar && <ComponentLoader />}
            {avatar && <img className="user-avatar big" src={avatar} alt="user avatar" />}
          </div>
          <h1 className="profile-name">{usernameParams}</h1>
          <p>This is a profile page</p>
          <p>aboutme goes here</p>
        </>
      )}
      {userID === 'UserNotFound' && <NotFound user={usernameParams} />}
    </div>
  );
};

export default Profile;
