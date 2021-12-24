import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ComponentLoader from './ComponentLoader';
import ProfilePicture from './ProfilePicture';
import NotFound from './NotFound';
import { GoLocation, GoOrganization, GoMarkGithub } from 'react-icons/go';
import { FaTwitter } from 'react-icons/fa';
import { UserContext } from './UserContext';

const Profile = () => {
  const user = useContext(UserContext);
  const { isAuthenticated, username } = user;
  const { username: usernameParams } = useParams();
  const [userID, setUserID] = useState(null);
  const [userAbout, setUserAbout] = useState(null);
  const [userMemberSince, setUserMemberSince] = useState(null);
  const [userGithub, setUserGithub] = useState(null);
  const [userTwitter, setUserTwitter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [avatar, setAvatar] = useState(`/profile-pictures/${userID}`);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('/api/user/' + usernameParams, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { userID, about, memberSince, profilePicture, github, twitter, location } = await response.json();
      setUserID(userID);
      setUserAbout(about);
      setUserGithub(github);
      setUserTwitter(twitter);
      setUserLocation(location);
      setUserMemberSince(memberSince);
      setAvatar(`/${profilePicture}`);
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
            <ProfilePicture className="user-avatar big" src={avatar} />
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
            {userMemberSince && (
              <p>
                <GoOrganization />
                Joined on {userMemberSince}
              </p>
            )}
            {userLocation && (
              <p>
                <GoLocation />
                {userLocation}
              </p>
            )}
            {userGithub && (
              <p>
                <GoMarkGithub />
                {userGithub}
              </p>
            )}
            {userTwitter && (
              <p>
                <FaTwitter />
                {userTwitter}
              </p>
            )}
          </div>
        </>
      )}
      {userID === 'UserNotFound' && <NotFound user={usernameParams} />}
    </div>
  );
};

export default Profile;
