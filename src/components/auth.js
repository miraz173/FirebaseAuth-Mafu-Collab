import { useState } from "react";
import { Navigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [haveAcc, sethaveAcc] = useState(true);

  console.log(auth?.currentUser?.email);

  const googleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);

      // Get the newly created user's UID
      const { uid } = userCredential.user;

      console.log(userCredential);
      // Write user data to Firestore under the `/users` collection
      await setDoc(doc(db, "Users", email), {
        name: username,
        email: email,
        uid: uid,
        cgpa: 3.56,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const SignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the newly created user's UID
      const { uid } = userCredential.user;

      console.log(userCredential);
      // Write user data to Firestore under the `/users` collection
      await setDoc(doc(db, "Users", email), {
        name: username,
        email: email,
        uid: uid,
        cgpa: 3.56,
      });

      console.log("User created successfully");
      window.alert("User created successfully");
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error creating user: ${errorCode} - ${errorMessage}`);
      alert(`Error creating user: ${errorMessage}`);
    }
  };

  const logIn = async () => {
    try {
      if (!auth.currentUser) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("hi " + auth?.currentUser?.email + " logged in");
      } else if (auth.currentUser) {
        console.log("hi " + auth?.currentUser?.email + " already logged in");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }
  };

  // Redirect to "/home" if the user is authenticated
  if (auth?.currentUser?.email) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <div className="justify-center w-[35vw] m-auto mt-10">
        <div className="w-full m-auto lg:max-w-2xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            <p>{haveAcc ? "Log In" : "Sign Up"}</p>
          </h1>
          <div className="mt-5">
            {!haveAcc && (
              <div className="mb-2">
                <label htmlFor="username" className="sr-only">
                  RUET username
                </label>
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full min-w-0 rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6"
                  placeholder="Enter your username"
                />
              </div>
            )}
            <div className="mb-2">
              <label htmlFor="email" className="sr-only">
                RUET email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full min-w-0 rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
            </div>
            {/* <div className="hidden md:block lg:block w-[0.5%] bg-gray-600"></div> */}
            <div className="mb-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full min-w-0 rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div>
            {haveAcc ? (
              <div>
                <a
                  href="a.com"
                  className="text-xs text-purple-600 hover:underline"
                >
                  Forgote Password?
                </a>
                <button
                  onClick={logIn}
                  type="submit"
                  className="w-full px-4 py-2 mt-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                >
                  Log In
                </button>
                <button
                  onClick={googleSignup}
                  className="w-full mt-2  text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                >
                  <svg
                    height="40"
                    // width="120"
                    className="m-auto"
                    viewBox=" 0 0 120 60"
                  >
                    <path
                      d="M32.377 26.446h-12.52v3.715h8.88c-.44 5.2-4.773 7.432-8.865 7.432a9.76 9.76 0 0 1-9.802-9.891c0-5.624 4.354-9.954 9.814-9.954 4.212 0 6.694 2.685 6.694 2.685l2.6-2.694s-3.34-3.717-9.43-3.717c-7.755 0-13.754 6.545-13.754 13.614 0 6.927 5.643 13.682 13.95 13.682 7.307 0 12.656-5.006 12.656-12.408 0-1.562-.227-2.464-.227-2.464z"
                      fill="#4885ed"
                    />
                    <use xlinkHref="#A" fill="#db3236" />
                    <use xlinkHref="#A" x="19.181" fill="#f4c20d" />
                    <path
                      d="M80.628 23.765c-4.716 0-8.422 4.13-8.422 8.766 0 5.28 4.297 8.782 8.34 8.782 2.5 0 3.83-.993 4.8-2.132v1.73c0 3.027-1.838 4.84-4.612 4.84-2.68 0-4.024-1.993-4.5-3.123l-3.372 1.4c1.196 2.53 3.604 5.167 7.9 5.167 4.7 0 8.262-2.953 8.262-9.147V24.292H85.36v1.486c-1.13-1.22-2.678-2.013-4.73-2.013zm.34 3.44c2.312 0 4.686 1.974 4.686 5.345 0 3.427-2.37 5.315-4.737 5.315-2.514 0-4.853-2.04-4.853-5.283 0-3.368 2.43-5.378 4.904-5.378z"
                      fill="#4885ed"
                    />
                    <path
                      d="M105.4 23.744c-4.448 0-8.183 3.54-8.183 8.76 0 5.526 4.163 8.803 8.6 8.803 3.712 0 6-2.03 7.35-3.85l-3.033-2.018c-.787 1.22-2.103 2.415-4.298 2.415-2.466 0-3.6-1.35-4.303-2.66l11.763-4.88-.6-1.43c-1.136-2.8-3.787-5.14-7.295-5.14zm.153 3.374c1.603 0 2.756.852 3.246 1.874l-7.856 3.283c-.34-2.542 2.07-5.157 4.6-5.157z"
                      fill="#db3236"
                    />
                    <path d="M91.6 40.787h3.864V14.93H91.6z" fill="#3cba54" />
                    <defs>
                      <path
                        id="A"
                        d="M42.634 23.755c-5.138 0-8.82 4.017-8.82 8.7 0 4.754 3.57 8.845 8.88 8.845 4.806 0 8.743-3.673 8.743-8.743 0-5.8-4.58-8.803-8.803-8.803zm.05 3.446c2.526 0 4.92 2.043 4.92 5.334 0 3.22-2.384 5.322-4.932 5.322-2.8 0-5-2.242-5-5.348 0-3.04 2.18-5.308 5.02-5.308z"
                      />
                    </defs>
                  </svg>
                </button>
                <p className="text-xs mt-2">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      sethaveAcc(false);
                    }}
                    className="text-xs text-purple-600 hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <button
                  onClick={SignUp}
                  type="submit"
                  className="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                >
                  SignUp
                </button>

                <button
                  onClick={googleSignup}
                  className="w-full mt-2  text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                >
                  <svg
                    height="40"
                    // width="120"
                    className="m-auto"
                    viewBox=" 0 0 120 60"
                  >
                    <path
                      d="M32.377 26.446h-12.52v3.715h8.88c-.44 5.2-4.773 7.432-8.865 7.432a9.76 9.76 0 0 1-9.802-9.891c0-5.624 4.354-9.954 9.814-9.954 4.212 0 6.694 2.685 6.694 2.685l2.6-2.694s-3.34-3.717-9.43-3.717c-7.755 0-13.754 6.545-13.754 13.614 0 6.927 5.643 13.682 13.95 13.682 7.307 0 12.656-5.006 12.656-12.408 0-1.562-.227-2.464-.227-2.464z"
                      fill="#4885ed"
                    />
                    <use xlinkHref="#A" fill="#db3236" />
                    <use xlinkHref="#A" x="19.181" fill="#f4c20d" />
                    <path
                      d="M80.628 23.765c-4.716 0-8.422 4.13-8.422 8.766 0 5.28 4.297 8.782 8.34 8.782 2.5 0 3.83-.993 4.8-2.132v1.73c0 3.027-1.838 4.84-4.612 4.84-2.68 0-4.024-1.993-4.5-3.123l-3.372 1.4c1.196 2.53 3.604 5.167 7.9 5.167 4.7 0 8.262-2.953 8.262-9.147V24.292H85.36v1.486c-1.13-1.22-2.678-2.013-4.73-2.013zm.34 3.44c2.312 0 4.686 1.974 4.686 5.345 0 3.427-2.37 5.315-4.737 5.315-2.514 0-4.853-2.04-4.853-5.283 0-3.368 2.43-5.378 4.904-5.378z"
                      fill="#4885ed"
                    />
                    <path
                      d="M105.4 23.744c-4.448 0-8.183 3.54-8.183 8.76 0 5.526 4.163 8.803 8.6 8.803 3.712 0 6-2.03 7.35-3.85l-3.033-2.018c-.787 1.22-2.103 2.415-4.298 2.415-2.466 0-3.6-1.35-4.303-2.66l11.763-4.88-.6-1.43c-1.136-2.8-3.787-5.14-7.295-5.14zm.153 3.374c1.603 0 2.756.852 3.246 1.874l-7.856 3.283c-.34-2.542 2.07-5.157 4.6-5.157z"
                      fill="#db3236"
                    />
                    <path d="M91.6 40.787h3.864V14.93H91.6z" fill="#3cba54" />
                    <defs>
                      <path
                        id="A"
                        d="M42.634 23.755c-5.138 0-8.82 4.017-8.82 8.7 0 4.754 3.57 8.845 8.88 8.845 4.806 0 8.743-3.673 8.743-8.743 0-5.8-4.58-8.803-8.803-8.803zm.05 3.446c2.526 0 4.92 2.043 4.92 5.334 0 3.22-2.384 5.322-4.932 5.322-2.8 0-5-2.242-5-5.348 0-3.04 2.18-5.308 5.02-5.308z"
                      />
                    </defs>
                  </svg>
                </button>

                <p className="text-xs mt-2">
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      sethaveAcc(true);
                    }}
                    className="text-xs text-purple-600 hover:underline"
                  >
                    Log In
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
