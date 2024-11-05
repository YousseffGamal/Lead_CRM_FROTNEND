import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/dashboard";
import LoginPage from "./Pages/login/login";
import SignUpPage from "./Pages/SignUp/SignUp";
import ProtectedRoute from "./utiliteis/protectedRoute";
import AddLead from "./Pages/AddLead/AddLead";
import BlogsArticles from "./Pages/BlogsArticles/BlogsArticles";
import AddBlog from "./Pages/AddBlog/AddBlog";
// import ClientTable from "./Pages/ClientsPage/clients";
import Profile from "./Pages/profile/profile"
import ClientTable from "./Pages/ClientsPage/ClientsPage";

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute redirectTo="/" roles={["Admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addlead" element={<AddLead />} />
            <Route path="/clientPage" element={<ClientTable />} />
          </Route>
          <Route
            element={<ProtectedRoute redirectTo="/" roles={["Marketer"]} />}
          >
            <Route path="/addblog/:id" element={<AddBlog />} />
            <Route path="/addblog" element={<AddBlog />} />
          </Route>

          <Route
            element={
              <ProtectedRoute redirectTo="/" roles={["Marketer", "Admin"]} />
            }
          >
            <Route path="/blogsarticles" element={<BlogsArticles />} />
          </Route>
          <Route
            element={
              <ProtectedRoute redirectTo="/" roles={["Marketer", "Admin"]} />
            }
          >
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />

          {/* <Route path="/clients" element={<Clients/>}/> */}

        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
