import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Auth/Navigation";
import Home from "./pages/Home";
import Signup from "./pages/Auth/register";
import Login from "./pages/Auth/Login";
import React from "react";
import ContactUs from "./pages/ContactUs";
// import Jobs from "./pages/Jobs";
// import PostJob from "./pages/PostJob";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* <Route path="/jobs" element={<Jobs />} /> */}
        {/* <Route path="/post-job" element={<PostJob />} /> */}
      </Routes>
    </>
  );
}

export default App;
