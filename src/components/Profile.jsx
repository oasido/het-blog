import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComponentLoader from './ComponentLoader';
import NotFound from './NotFound';

const Profile = ({ user }) => {
  const { isAuthenticated, username } = user;
  const { username: usernameParams } = useParams();
  const [userID, setUserID] = useState(null);
  const [userAbout, setUserAbout] = useState(null);
  const [userMemberSince, setUserMemberSince] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('/api/user/' + usernameParams, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { userID, about, memberSince } = await response.json();
      setUserID(userID);
      setUserAbout(about);
      setUserMemberSince(memberSince);
    };
    getUser();

    // eslint-disable-next-line
  }, []);

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
