import { useRef, useState } from "react";
import Header from "./Header";
import { validateSignIn } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { BACK_LOGO, PHOTO_URL } from "../utils/constants.js";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignInToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleButtonClick = () => {
    let message = null;
    if (isSignUp) {
      message = validateSignIn(
        email.current.value,
        password.current.value,
        name.current.value,
        true
      );
    } else {
      message = validateSignIn(email.current.value, password.current.value);
    }
    setErrMsg(message);
    if (message) return;

    if (isSignUp) {
      createUser();
    } else {
      signInUser();
    }
  };

  const createUser = () => {
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        updateUserProfile(user);
      })
      .catch((error) => {
        setErrMsg(error.code + " - " + error.message);
      });
  };

  const signInUser = () => {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        setErrMsg(error.code + " - " + error.message);
      });
  };

  const updateUserProfile = (user) => {
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: PHOTO_URL,
    })
      .then(() => {
        const { uid, email, displayName, photoURL } = auth.currentUser;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoUrl: photoURL,
          })
        );
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  return (
    <div className="">
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          alt="backLogo"
          src={BACK_LOGO}
        />
      </div>
      <form
        className="absolute w-full md:w-3/12 my-36 mx-auto left-0 right-0 p-4 bg-black opacity-80"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className=" font-bold text-white py-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </p>
        {isSignUp && (
          <input
            ref={name}
            type="text"
            placeholder="name"
            className="p-3 my-4 w-full text-black rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="email"
          className="p-3 my-4 w-full rounded-lg"
        />
        <input
          ref={password}
          type="text"
          placeholder="password"
          className="p-3 my-4 w-full rounded-lg"
        />
        <button
          className="p-2 my-6  text-white bg-red-600 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        {errMsg && <p className="text-red-500 py-2">{errMsg}</p>}
        <p
          className="py-4 pointer-events-auto text-white"
          onClick={handleSignInToggle}
        >
          {isSignUp ? (
            <span>
              Already Redistered?{" "}
              <b className="cursor-pointer hover:underline">Sign In</b>
            </span>
          ) : (
            <span>
              New to Netflix?{" "}
              <b className="cursor-pointer hover:underline">Sign up now.</b>
            </span>
          )}
        </p>
      </form>
      Login
    </div>
  );
};

export default Login;
