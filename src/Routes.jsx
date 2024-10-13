import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/dashboard";
import LoginPage from "./Pages/login/login";
import SignUpPage from "./Pages/SignUp/SignUp";
import ProtectedRoute from './utiliteis/protectedRoute';
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          </Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />




        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
