import "./App.css";
import { AuthProvider } from "./contexs/AuthContex.jsx";
import Authentication from "./pages/Authentication.jsx";
// import Landing from "./pages/Landing.jsx";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import VideoMeet from "./pages/VideoMeet.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/:url" element={<VideoMeet />} />
        </Routes>
      </AuthProvider>{" "}
    </>
  );
}

export default App;
