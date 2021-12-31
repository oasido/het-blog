import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [userBio, setUserBio] = useState(null);
  const [userMemberSince, setUserMemberSince] = useState(null);
  const [userGithub, setUserGithub] = useState(null);
  const [userTwitter, setUserTwitter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('/api/user/' + usernameParams, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { userID, bio, memberSince, profilePicture, github, twitter, location } = await response.json();
      setUserID(userID);
      setUserBio(bio);
      setUserGithub(github);
      setUserTwitter(twitter);
      setUserLocation(location);
      setUserMemberSince(memberSince);
      setAvatar(`/${profilePicture}`);
    };
    getUser();

    const getUserPosts = async () => {
      const response = await fetch('/api/user-posts/' + usernameParams, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPosts(data);
    };
    getUserPosts();

    // eslint-disable-next-line
  }, []);

  // posts function
  const handlePosts = (post) => {
    return (
      <div className="blog-preview" key={post._id}>
        <Link to={`/blogs/${post._id}`}>
          <div className="top-bar">
            <ProfilePicture className="author-picture" src={avatar} />
            <div>
              <p className="author-text">{post.author}</p>
              <p className="time-posted">{post.date}</p>
            </div>
            {post.pinned && <div className="blog-pin">📌 Pinned</div>}
          </div>
          <h2 className="blog-title">{post.title}</h2>
          <h4 className="blog-description">{post.description}</h4>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="profile">
        {userID !== 'UserNotFound' && (
          <>
            <div className="profile-picture">
              <ProfilePicture className="user-avatar big" src={avatar} />
            </div>
            <div className="profile-content">
              <h1 className="profile-name">{usernameParams}</h1>
              {userBio ? (
                <p>{userBio}</p>
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
      <div className="profile-posts">
        {!posts.length && <h2>This user hasn't posted anything, yet!</h2>}
        {posts.length >= 1 && <h2>Posts by {usernameParams}</h2>}
      </div>

      {posts.map((post) => handlePosts(post))}
    </>
  );
};

export default Profile;
