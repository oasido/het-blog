import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import ProfilePicture from '../ProfilePicture';
import axios from 'axios';
import Input from './Input';

const Settings = () => {
  const [userFields, setUserFields] = useState({
    email: '',
    bio: '',
    github: '',
    twitter: '',
    location: '',
  });

  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { isAuthenticated, userID } = user;

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
        };
      } else if (name === 'bio') {
        return {
          email: previousValue.email,
          bio: value,
          github: previousValue.github,
          twitter: previousValue.twitter,
          location: previousValue.location,
        };
      } else if (name === 'github') {
        return {
          email: previousValue.email,
          bio: previousValue.bio,
          github: value,
          twitter: previousValue.twitter,
          location: previousValue.location,
        };
      } else if (name === 'twitter') {
        return {
          email: previousValue.email,
          bio: previousValue.bio,
          github: previousValue.github,
          twitter: value,
          location: previousValue.location,
        };
      } else if (name === 'location') {
        return {
          email: previousValue.email,
          bio: previousValue.bio,
          github: previousValue.github,
          twitter: previousValue.twitter,
          location: value,
        };
      }
    });
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    console.log('Saved');
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
        <form onSubmit={saveHandler}>
          <label></label>
          <div className="settings-options">
            <Input value={userFields.email} onChange={handleChange} name="email" fieldName="Email" />
            <Input value={userFields.bio} onChange={handleChange} name="bio" fieldName="Bio" isTextArea={true} />
            <Input value={userFields.github} onChange={handleChange} name="github" fieldName="Github" />
            <Input value={userFields.twitter} onChange={handleChange} name="twitter" fieldName="Twitter" />
            <Input value={userFields.location} onChange={handleChange} name="location" fieldName="Location" />
          </div>
          <button className="blue-btn" type="submit">
            Save
          </button>
        </form>
      </div>
      <div className="settings">
        <h2>Change Password</h2>
        <form>
          <label></label>
          <div className="settings-options">
            <Input type="password" fieldName="Current Password" />
            <Input type="password" fieldName="Confirm Password" />
            <Input type="password" fieldName="New Password" />
          </div>
          <button className="blue-btn" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
