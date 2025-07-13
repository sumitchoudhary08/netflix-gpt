import { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptClick = () => {
    dispatch(toggleGptSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoUrl: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //Unsubscribe when campaign unmounts.
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-48 mx-auto md:mx-0 " alt="logo" src={LOGO} />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="px-2 mx-2 my-2 bg-gray-400 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className=" px-2 mx-4 my-2 bg-purple-500 rounded-lg"
            onClick={handleGptClick}
          >
            {showGptSearch ? "HomePage" : "GptSearch"}
          </button>
          <img
            className="w-10 h-10 "
            alt="userLogo"
            src={user.photoUrl ? user.photoUrl : USER_AVATAR}
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
