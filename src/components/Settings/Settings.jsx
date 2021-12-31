import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import ProfilePicture from '../ProfilePicture';
import axios from 'axios';
import Input from './Input';
import FlashMsg from '../FlashMsg';

const Settings = () => {
  const user = useContext(UserContext);
  const { isAuthenticated, userID, username } = user;

  // set fields automatically
  const [userFields, setUserFields] = useState({
    email: '',
    bio: '',
    github: '',
    twitter: '',
    location: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('/api/user/' + username, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { email, bio, github, twitter, location } = await response.json();
      setUserFields({ email, bio, github, twitter, location });
    };
    getUser();

    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/');
  }

  const [file, setFile] = useState(null);
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();

    const avatarFormData = new FormData();
    avatarFormData.append('avatar', file);

    fetch('/settings/avatar-upload', {
      method: 'POST',
      body: avatarFormData,
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserFields((previousValue) => {
      if (name === 'email') {
        return {
          email: value,
          bio: previousValue.bio,
          github: previousValue.github,
          twitter: previousValue.twitter,
          location: previousValue.location,
          userID,
        };
      } else if (name === 'bio') {
        return {
          email: previousValue.email,
          bio: value,
          github: previousValue.github,
          twitter: previousValue.twitter,
          location: previousValue.location,
          userID,
        };
      } else if (name === 'github') {
        return {
          email: previousValue.email,
          bio: previousValue.bio,
          github: value,
          twitter: previousValue.twitter,
          location: previousValue.location,
          userID,
        };
      } else if (name === 'twitter') {
        return {
          email: previousValue.email,
          bio: previousValue.bio,
          github: previousValue.github,
          twitter: value,
          location: previousValue.location,
          userID,
        };
      } else if (name === 'location') {
        return {
          email: previousValue.email,
          bio: previousValue.bio,
          github: previousValue.github,
          twitter: previousValue.twitter,
          location: value,
          userID: userID,
        };
      }
    });
  };

  const [passwordFields, setPasswordFields] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const handlePasswordChange = (e) => {
    const { value, name } = e.target;

    setPasswordFields((previousValue) => {
      if (name === 'oldPassword') {
        return {
          oldPassword: value,
          newPassword: previousValue.newPassword,
          confirmNewPassword: previousValue.confirmNewPassword,
          userID: userID,
        };
      } else if (name === 'newPassword') {
        return {
          oldPassword: previousValue.oldPassword,
          newPassword: value,
          confirmNewPassword: previousValue.confirmNewPassword,
          userID: userID,
        };
      } else if (name === 'confirmNewPassword') {
        return {
          oldPassword: previousValue.oldPassword,
          newPassword: previousValue.newPassword,
          confirmNewPassword: value,
          userID: userID,
        };
      }
    });
  };

  const [profileResStatus, setProfileResStatus] = useState(null);
  const profileSaveHandler = async (e) => {
    e.preventDefault();

    const response = await fetch('/settings/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userFields),
    });
    const { msg } = await response.json();
    setProfileResStatus(true || false); // if server returns msg, set to true (success)
  };

  const [passChangeResStatus, setPassChangeResStatus] = useState({
    msg: '',
    color: '',
  });
  const PasswordChangeHandler = async (e) => {
    e.preventDefault();

    const response = await fetch('/settings/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordFields),
    });
    const { msg, color } = await response.json();
    setPassChangeResStatus({ msg, color: color });
  };

  return (
    <>
      <h1>User Settings</h1>
      <div className="settings">
        <h2>Public Profile</h2>
        <form className="settings-avatar-form" onSubmit={uploadAvatar}>
          <div className="settings-avatar">
            <ProfilePicture className="user-avatar very-big" src={`/profile-pictures/${userID}`} />
          </div>
          <input onChange={fileHandler} type="file" name="avatar" />
          <button type="submit">Upload</button>
        </form>
        <form onSubmit={profileSaveHandler}>
          <label></label>
          <div className="settings-options">
            <Input value={userFields.email} onChange={handleChange} name="email" type="email" fieldName="Email (not hidden)" />
            <Input value={userFields.bio} onChange={handleChange} name="bio" fieldName="Bio" isTextArea={true} />
            <Input value={userFields.github} onChange={handleChange} name="github" fieldName="Github" />
            <Input value={userFields.twitter} onChange={handleChange} name="twitter" fieldName="Twitter" />
            <Input value={userFields.location} onChange={handleChange} name="location" fieldName="Location" />
          </div>
          <div className="btn-and-response">
            <button className="blue-btn" type="submit">
              Save
            </button>
            {profileResStatus === true && <FlashMsg message="Successfully updated!" color="green" />}
            {profileResStatus === false && <FlashMsg message="Something went wrong, please try again later..." color="red" />}
          </div>
        </form>
      </div>
      <div className="settings">
        <h2>Change Password</h2>
        <form onSubmit={PasswordChangeHandler}>
          <label></label>
          <div className="settings-options">
            <Input value={passwordFields.oldPassword} onChange={handlePasswordChange} type="password" name="oldPassword" fieldName="Current Password" />
            <Input value={passwordFields.newPassword} onChange={handlePasswordChange} type="password" name="newPassword" fieldName="New Password" />
            <Input value={passwordFields.confirmNewPassword} onChange={handlePasswordChange} type="password" name="confirmNewPassword" fieldName="New Password Confirmation" />
          </div>
          <div className="btn-and-response">
            <button className="blue-btn" type="submit">
              Change Password
            </button>
            {<FlashMsg message={passChangeResStatus.msg} color={passChangeResStatus.color} />}
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;
