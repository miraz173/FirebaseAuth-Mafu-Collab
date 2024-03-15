import { useEffect, useState } from "react";
import { Auth } from "./components/auth.js";
import { auth } from "./config/firebase.js";
import { Home } from "./components/home.js";
import { Profile } from "./components/profile.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, [user]);
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home isLoggedIn={user} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// <div>{auth?.currentUser?.email ? <Home /> : <Auth />}</div>;
// console.log(auth?.currentUser?.email);{ console.log(user) }
