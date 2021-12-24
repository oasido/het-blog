import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';
import axios from 'axios';

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

  const formHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('avatar', file);

    fetch('/settings/avatar-upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <>
      <h1>User Settings</h1>
      <div className="settings">
        <form onSubmit={formHandler}>
          <div className="settings-avatar">
            <ProfilePicture className="user-avatar very-big" src={`/profile-pictures/${userID}`} />
          </div>
          <input onChange={fileHandler} type="file" name="avatar" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
};

export default Settings;
