const ProfilePicture = ({ src, className, onClick }) => {
  const addDefaultAvatar = (e) => {
    e.target.src = '/profile-pictures/default.png';
  };

  return (
    <>
      <img onClick={onClick} className={className} src={src} onError={addDefaultAvatar} alt="user avatar" />
    </>
  );
};

export default ProfilePicture;
