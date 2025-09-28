import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";
import ClassPage from "./components/ClassPage";

function App() {
  return (
    <BrowserRouter>
        <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbarPaths = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div style={{ marginTop: 60 }}></div>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/groups/:classId" element={<ClassPage />} />
        <Route
          path="*"
          element={
            <p className="text-center mt-20 text-red-600">Page not found</p>
          }
        />
      </Routes>
    </>
  );
}

export default App;
