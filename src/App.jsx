import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import { Result } from "./pages/result";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";
import Repository from "./pages/repository";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Result />} />
        <Route path="/:owner/:repo/readme" element={<Repository />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </Router>
  )
}