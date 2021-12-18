import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComponentLoader from './ComponentLoader';
import ProfilePicture from './ProfilePicture';
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
            <ProfilePicture className="user-avatar big" src={`/profile-pictures/${userID}`} />
          </div>
          <div className="profile-content">
            <h1 className="profile-name">{usernameParams}</h1>
            {userAbout ? (
              <p>{userAbout}</p>
            ) : (
              <p>
                <i>Hello world!</i>
              </p>
            )}
          </div>
          <div className="profile-bottom">
            {userMemberSince && <p>Joined on: {userMemberSince}</p>}
            <p>{userMemberSince}</p>
          </div>
        </>
      )}
      {userID === 'UserNotFound' && <NotFound user={usernameParams} />}
    </div>
  );
};

export default Profile;
