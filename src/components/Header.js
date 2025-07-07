import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen px-8 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-48 "
        alt="logo"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      />
      {user && (
        <div className="flex p-2">
          <img
            className="w-10 h-10 "
            alt="userLogo"
            src={
              user.photUrl
                ? user.photUrl
                : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            }
          />
          <button className="px-2 font-bold text-white" onClick={handleLogout}>
            (SignOut)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
