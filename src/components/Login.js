import { useRef, useState } from "react";
import Header from "./Header";
import { validateSignIn } from "../utils/validate";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  //const [showErrorMsg, setshowErrorMsg] = useState(false);
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
            className="p-3 my-4 w-full text-black"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="email"
          className="p-3 my-4 w-full"
        />
        <input
          ref={password}
          type="text"
          placeholder="password"
          className="p-3 my-4 w-full"
        />
        <button
          className="p-3 my-6-2  text-white bg-red-600 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        {setErrMsg && <p className="text-red-500 py-2">{errMsg}</p>}
        <p
          className="py-4 pointer-events-auto text-white"
          onClick={handleSignInToggle}
        >
          {isSignUp ? "Already Redistered? Sign In" : "New to Netflix? Sign Up"}
        </p>
      </form>
      Login
    </div>
  );
};

export default Login;
