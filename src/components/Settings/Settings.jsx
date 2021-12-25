import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import ProfilePicture from '../ProfilePicture';
import axios from 'axios';
import Input from './Input';

const Settings = () => {
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
            <Input fieldName="Email" />
            <Input fieldName="Bio" isTextArea={true} />
            <Input fieldName="Github" />
            <Input fieldName="Twitter" />
            <Input fieldName="Location" />
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
