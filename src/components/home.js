import React from "react";
import { StickyNavbar } from "./profile.js";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";
import { Navigate } from "react-router-dom";

// console.log(auth?.currentUser?.email);

export function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const jobsCollectionRef = collection(db, "Jobs");

    const getJobs = async () => {
      try {
        const data = await getDocs(jobsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          Id: doc.id,
        }));
        setJobs(filteredData);
        // console.log(filteredData);
        console.log(
          filteredData ? filteredData[1].Requirements.join(", ") : "loading"
        );
      } catch (err) {
        console.error(err);
      }
    };

    getJobs();
  }, []);

  const apply = (job) => {
    console.log(job);
  };

  return (
    <div className="justify-center text-center">
      <h1 className="font-bold text-lg">Jobs</h1>

      <div className="p-4 justify-center text-center">
        {jobs.map((job) => {
          const handleApply = () => {
            apply(job);
          };

          return (
            <div key={job.Id} className="m-auto p-4 my-4 bg-blue-400">
              <h2>{job.Title}</h2>
              <p>{job.Salary}</p>
              <p>{job ? job.Requirements.join(", ") : "loading"}</p>
              <button
                onClick={handleApply}
                className="bg-cyan-200 mt-2 px-2 py-1 rounded-lg"
              >
                Apply
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Home() {
  const [user, setUser] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, [user]);

  if (!user) {
    return <Navigate to="/" />;
  }

  console.log(user ? user.uid : "logged");

  return (
    <div>
      <StickyNavbar />
      This is Home page
      <Jobs />
    </div>
  );
}