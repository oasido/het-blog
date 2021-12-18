import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Settings = ({ user }) => {
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

    fetch('/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <>
      <h1>User Settings</h1>
      <div className="settings">
        <form onSubmit={formHandler}>
          <div className="">
            <img className="user-avatar big" src={`/profile-pictures/${userID}`} alt="user avatar" />
          </div>
          <input onChange={fileHandler} type="file" name="avatar" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
};

export default Settings;
