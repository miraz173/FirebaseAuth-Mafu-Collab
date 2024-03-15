import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import { Navigate } from "react-router-dom";
import { getDocs, collection, where, query } from "firebase/firestore";

// console.log(auth?.currentUser?.email);

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("logged out\n");
  } catch (err) {
    console.log(err);
  }
};

export function StickyNavbar() {
  return (
    <>
      <nav className="flex justify-between bg-slate-600	h-[10vh] text-white text-sm">
        <div className="item-left flex items-center">
          <img
            src="./RiazPassportSize.jpg"
            alt="logo"
            className="h-8 w-8 ml-4 rounded-full"
          ></img>
          <p className="ml-2">Mafu420</p>
        </div>
        <div className="flex items-center space-x-8 mr-4">
          <a href="/home" className="hover:text-blue-400">
            Home
          </a>
          <a href="/profile" className="hover:text-blue-400">
            Profile
          </a>
          <button
            onClick={logOut}
            className="bg-blue-400 hover:bg-blue-800 px-4 py-1 rounded-md"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export function Personal({ classParams }) {
  return (
    <div
      className={
        classParams +
        " bg-white my-4 pb-4 border-2 border-slate-200 rounded-md drop-shadow-lg"
      }
    >
      <div className="flex justify-center">
        <img
          src="/RiazPassportSize.JPG"
          alt="Personal"
          className="h-24 w-24 mt-4 border-2 rounded-full"
        ></img>
      </div>
      <div className="flex justify-center">
        <p className="text-md text-blue-400">Mafu420</p>
      </div>
      <div className="flex justify-center">
        <p className="text-sm italic">Sec C CR</p>
      </div>
      <div className="flex justify-center mx-8 my-4">
        <p className="text-[10px] italic">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy.
        </p>
      </div>

      <p className="font-semibold text-sm text-left mx-8 mb-2">Skill</p>
      <div className="flex mx-4 my-4 space-x-2 justify-center gap-y-2 flex-wrap text-xs">
        <div className="rounded-xl border-2 px-4 py-[4px] bg-sky-50">
          Python
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-sky-50">C++</div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-emerald-50">
          Leader
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-emerald-50">
          Dealer
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-emerald-50">
          Healer
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-emerald-50">
          Killer
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-emerald-50">
          Filler
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-emerald-50">
          Hunter
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-emerald-50">
          Fighter
        </div>
      </div>

      <Education className={"mt-6"} />

      <p className="font-semibold text-sm text-left mx-8">Interest</p>
      <div className="flex mx-4 my-4 space-x-2 justify-center gap-y-2 flex-wrap text-xs">
        <div className="rounded-xl border-2 px-4 py-[4px] bg-cyan-50">
          Killing
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-cyan-50">
          Stealing
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-cyan-50">
          Cheating
        </div>
        <div className="rounded-xl border-2 px-4 py-[4px] bg-cyan-50">
          Torturing
        </div>
      </div>
    </div>
  );
}

export function BasicInfo({ classParams }) {
  return (
    <div
      className={
        classParams +
        " bg-white border-2 border-slate-200 rounded-md drop-shadow-md"
      }
    >
      <p className="font-semibold text-sm text-left mx-8 my-4">Basic Info</p>
      <div className="flex justify-around text-xs">
        <div>
          <p className="text-slate-600">Email</p>
          <p className="font-medium">mafu@gmail.com</p>

          <p className="mt-4 text-slate-600">Location</p>
          <p className="font-medium">Rajshahi, Bangladesh</p>
        </div>
        <div>
          <p className="text-slate-600">Phone</p>
          <p className="font-medium">0194769420</p>

          <p className="mt-4 text-slate-600">Publications</p>
          <p className="font-medium">69</p>
        </div>
        <div>
          <p className="text-slate-600">Github</p>
          <p className="font-medium italic">github.com/Mafu420</p>

          <p className="mt-4 text-slate-600">LinkedIn</p>
          <p className="font-medium">0194769420</p>
        </div>
      </div>

      <div className="flex space-x-10 mx-8 my-4 text-white text-xs">
        <div className="bg-blue-400 py-2 px-4 ">Download Resume</div>
        <div className="text-black bg-white px-4 py-2 border-2 border-blue-400">
          Edit Profile
        </div>
      </div>
    </div>
  );
}

export function Jobs({ classParams }) {
  return (
    <div
      className={
        classParams +
        " mt-2 bg-white border-2 border-slate-200 rounded-md drop-shadow-lg"
      }
    >
      <p className="font-semibold text-sm text-left mx-8 mt-6">
        Job Experience
      </p>

      <div className="flex pl-8 bg-white border-b-2 border-blue-50">
        <img
          src="./logo512.png"
          alt="logo"
          className="h-16 w-16 my-4 mr-8 border-2 rounded-full"
        ></img>
        <div className="flex flex-col text-xs text-left justify-center">
          <p className="text-blue-400 font-semibold">Fuhrer</p>
          <p className="italic">Großdeutsches Reich</p>
          <p className="text-[10px]"> 1933-1945 | Duetchland</p>
        </div>
      </div>

      <div className="flex pl-8 bg-white border-b-2 border-blue-50">
        <img
          src="./reich.png"
          alt="logo"
          className="h-16 w-16 my-4 mr-8 border-2 rounded-full"
        ></img>
        <div className="flex flex-col text-xs text-left justify-center">
          <p className="text-blue-400 font-semibold">Lance Corporal</p>
          <p className="italic">Heer</p>
          <p className="text-[10px]"> 1914-1918 | Prussen, Duetchland</p>
        </div>
      </div>

      <div className="flex pl-8 bg-white">
        <img
          src="./logo512.png"
          alt="logo"
          className="h-16 w-16 my-4 mr-8 border-2 rounded-full"
        ></img>
        <div className="flex flex-col text-xs text-left justify-center">
          <p className="text-blue-400 font-semibold">Austrian Painter</p>
          <p className="italic">Failed to enter art school</p>
          <p className="text-[10px]"> 1947-1971 | Sandwip, Chattogram</p>
        </div>
      </div>
    </div>
  );
}

export function Projects({ classParams }) {
  return (
    <div
      className={
        classParams +
        " mt-2 bg-white border-2 border-cyan-50 rounded-md drop-shadow-md"
      }
    >
      <p className="font-semibold text-sm text-left mx-8 mt-6">Projects</p>

      <div className="flex pl-8 bg-white border-b-2 border-blue-50">
        <img
          src="./logo512.png"
          alt="logo"
          className="h-16 w-16 my-4 mr-8 border-2 rounded-full"
        ></img>
        <div className="flex flex-col text-xs text-left justify-center">
          <p className="text-blue-400 font-semibold">Adolf Hitler</p>
          <p className="italic">Hitler did nothing wrong</p>
          <p className="text-xs"> 1947-1971 | Sandwip, Chattogram</p>
        </div>
      </div>

      <div className="flex pl-8 bg-white border-b-2 border-blue-50">
        <img
          src="./logo512.png"
          alt="logo"
          className="h-16 w-16 my-4 mr-8 border-2 rounded-full"
        ></img>
        <div className="flex flex-col text-xs text-left justify-center">
          <p className="text-blue-400 font-semibold">Adolf Hitler</p>
          <p className="italic">Hitler did nothing wrong</p>
          <p className="text-xs"> 1947-1971 | Sandwip, Chattogram</p>
        </div>
      </div>

      <div className="flex pl-8 bg-white">
        <img
          src="./logo512.png"
          alt="logo"
          className="h-16 w-16 my-4 mr-8 border-2 rounded-full"
        ></img>
        <div className="flex flex-col text-xs text-left justify-center">
          <p className="text-blue-400 font-semibold">Adolf Hitler</p>
          <p className="italic">Hitler did nothing wrong</p>
          <p className="text-xs"> 1947-1971 | Sandwip, Chattogram</p>
        </div>
      </div>
    </div>
  );
}

export function Education({ classParams }) {
  return (
    <div className={classParams}>
      <p className="font-semibold text-sm text-left mx-8 mt-2">Education</p>

      <div className="flex my-2 px-8 bg-white">
        <img
          src="./ruet.png"
          alt="logo"
          className="h-10 w-10 my-4 mr-4 border-2 rounded-full"
        ></img>
        <div className="flex flex-col text-[11px] text-left justify-center">
          <p className="text-blue-400 font-semibold">
            Rajshahi University of Engineering and Technology
          </p>
          <p className="italic">B.Sc in Engg. in CSE</p>
          <p className="italic text-[10px]">CGPA: 3.32</p>
        </div>
      </div>

      <div className="flex my-2 px-8 bg-white">
        <img
          src="./logo512.png"
          alt="logo"
          className="h-10 w-10 my-4 mr-4 border-2 rounded-full"
        ></img>
        <div className="flex flex-col text-[11px] text-left justify-center">
          <p className="text-blue-400 font-semibold">
            Rajshahi University of Engineering and Technology
          </p>
          <p className="italic">B.Sc in Engg. in CSE</p>
          <p className="italic text-[10px]">CGPA: 3.32</p>
        </div>
      </div>

      <div className="flex my-2 px-8 bg-white">
        <img
          src="./logo512.png"
          alt="logo"
          className="h-10 w-10 my-4 mr-4 border-2 rounded-full"
        ></img>
        <div className="flex flex-col text-[11px] text-left justify-center">
          <p className="text-blue-400 font-semibold">
            Rajshahi University of Engineering and Technology
          </p>
          <p className="italic">B.Sc in Engg. in CSE</p>
          <p className="italic text-[10px]">CGPA: 3.32</p>
        </div>
      </div>
    </div>
  );
}

export function Profile({ classParams }) {
  const [user, setUser] = useState(true);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const profileCollectionRef = collection(db, "Users");

    const getProfile = async () => {
      try {
        const data = await getDocs(
          query(profileCollectionRef),
          where("userEmail", "==", user.email)
        );
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          Id: doc.id,
        }));
        setProfile(filteredData);
        // console.log(filteredData);
        console.log(filteredData ? profile : "loading");
      } catch (err) {
        console.error(err);
      }
    };

    getProfile();
  }, [user.email, profile]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, [user]);

  // console.log(user);
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={classParams + " "}>
      <StickyNavbar />
      <div className="flex flex-row justify-around mx-4">
        <Personal classParams={"w-[32vw] "} />
        <div className="my-4 w-[60vw] ">
          <BasicInfo />
          <Jobs />
          <Projects />
        </div>
      </div>
    </div>
  );
}
