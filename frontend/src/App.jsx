import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route
            path="*"
            element={
              <p className="text-center mt-20 text-red-600">Page not found</p>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
