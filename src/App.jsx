import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import { Result } from "./pages/result";
import { SignUp } from "./pages/signup";
import { SignIn } from "./pages/signin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </Router>
  )
}