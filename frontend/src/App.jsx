import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar /> 
        
        <div style={{ paddingTop: '60px' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/profile" element={<ProfilePage />} /> {/* <--- NEW ROUTE */}
            <Route path="/" element={<Dashboard />} /> 
            <Route
              path="*"
              element={
                <p className="text-center mt-20 text-red-600">Page not found</p>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;