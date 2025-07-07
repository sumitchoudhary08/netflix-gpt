import { useRef, useState } from "react";
import Header from "./Header";
import { validateSignIn } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate("/browse");
      })
      .catch((error) => {
        setErrMsg(error.code + " - " + error.message);
      });
  };

  const updateUserProfile = (user) => {
    updateProfile(user, {
      displayName: name.current.value,
      photoURL:
        "https://media.licdn.com/dms/image/v2/C5603AQEAkqDfHdqi1w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1599803148536?e=1757548800&v=beta&t=K7i7oTOgfBkjwYpWY4Pnsj4C6MrBvOMt1GmInizvoTE",
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
        navigate("/browse");
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          alt="backLogo"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/75b0ed49-75ab-4a63-bd45-37bc2c95cb73/web/IN-en-20250623-TRIFECTA-perspective_ae5833b7-6ce5-4e88-853e-014f38c506f1_large.jpg"
        />
      </div>
      <form
        className="absolute w-3/12 my-36 mx-auto left-0 right-0 p-4 bg-black opacity-80"
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
