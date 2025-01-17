import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "./Auth/Login";
import { Toaster } from "sonner";
import Signup from "./Auth/Signup";

import { NotFoundPage } from "./NotFoundPage";
import React from "react";

import { BrainViewer } from "./ContentData/BrainViewer";
import Lockdata from "./Auth/Lockdata";
import { MainContent } from "./NavbarBar/MainContent";
import { OriginalTwitter } from "./ContentData/OriginalTwitter";
import { OriginalYoutube } from "./ContentData/OriginalYoutube";
import { OriginalArticle } from "./ContentData/OriginalArticle";
import { OriginalNotes } from "./ContentData/OriginalNotes";
import { OriginalLinks } from "./ContentData/OriginalLinks";
import Privacy from "./ContentData/Privacy";
import Terms from "./ContentData/Terms";


const App: React.FC = () => {
  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const isLoggedin = localStorage.getItem("token") !== null;
    return isLoggedin ? element : <Navigate to="/" />;
  };
  const PublicRoute = ({ element }: { element: JSX.Element }) => {
    const isLoggedin = localStorage.getItem("token");
    return isLoggedin ? <Navigate to="/home" /> : element;
  };
  return (
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<PublicRoute element={<Lockdata />} />} />
          <Route
            path="/signup"
            element={<PublicRoute element={<Signup />} />}
          />
          <Route
            path="/login"
            element={<PublicRoute element={<LoginPage />} />}
          />
          <Route
            path="/home"
            element={<PrivateRoute element={<MainContent />} />}
          />
          <Route
            path="/tweets"
            element={<PrivateRoute element={<OriginalTwitter />} />}
          />
         
          <Route
            path="/youtube"
            element={<PrivateRoute element={<OriginalYoutube/>} />}
          />
           <Route
            path="/privacy"
            element={<PublicRoute element={<Privacy/>} />}
          />

<Route
            path="/tos"
            element={<PublicRoute element={<Terms/>} />}
          />
          <Route
            path="/article"
            element={<PrivateRoute element={<OriginalArticle />} />}
          />
          <Route
            path="/notes"
            element={<PrivateRoute element={<OriginalNotes />} />}
          />
          <Route
            path="/links"
            element={<PrivateRoute element={<OriginalLinks />} />}
          />
          <Route path="/brain/:shareLink" element={<BrainViewer />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
