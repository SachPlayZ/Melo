import CallbackPage from "./CallbackPage";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/callback" element={<CallbackPage />}>
        </Route>
      </Routes>
    </>
  );
}
