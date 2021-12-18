const ProfilePicture = ({ src, className }) => {
  const addDefaultAvatar = (e) => {
    e.target.src = '/profile-pictures/default.png';
  };

  return (
    <>
      <img className={className} src={src} onError={addDefaultAvatar} alt="user avatar" />
    </>
  );
};

export default ProfilePicture;
