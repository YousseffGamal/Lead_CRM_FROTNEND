import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/dashboard";
import LoginPage from "./Pages/login/login";
import SignUpPage from "./Pages/SignUp/SignUp";
import ProtectedRoute from './utiliteis/protectedRoute';
import AddLead from "./Pages/AddLead/AddLead";
import BlogsArticles from "./Pages/BlogsArticles/BlogsArticles"
import AddBlog from "./Pages/AddBlog/AddBlog";
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addlead" element={<AddLead />} />
          </Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
          <Route path="/blogsarticles" element={<BlogsArticles />} />
          <Route path="/addblog" element={<AddBlog />} />





        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
