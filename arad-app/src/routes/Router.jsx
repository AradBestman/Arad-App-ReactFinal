import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import LoginPage from "../pages/loginPage/LoginPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import FavoriteCards from "../pages/favoriteCards/FavoriteCards";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Error404Page from "../pages/ErrorPage/ErrorPage";
import AdminPanel from "../pages/Admin/AdminPanel";
import CreateCard from "../components/CreateCard";
import EditCardPage from "../pages/EditPage/EditCardPage";
import MyCards from "../pages/myCards/MyCards";
import GetAllUsers from "../pages/getAllUsers/GetAllUsers";
import AdminDelete from "../pages/Admin/AdminDelete";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";

const AuthenticatedRoute = ({ children }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      alert("Not authorized");
    }
  }, [loggedIn]);
  if (!loggedIn) {
    return <div>You are not allowed to view this page</div>;
  }

  return <>{children}</>;
};

const Example = () => {
  return <div>Hello</div>;
};

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.FAVORITE} element={<FavoriteCards />} />
      <Route path={ROUTES.CREATECARD} element={<CreateCard />} />
      <Route path={`${ROUTES.EDITCARDS}/:id`} element={<EditCardPage />} />
      <Route path={`${ROUTES.EDITPROFILE}/:id`} element={<EditProfile />} />
      <Route path={ROUTES.MYCARDS} element={<MyCards />} />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthenticatedRoute>
            <Profile />
          </AuthenticatedRoute>
        }
      />
      //*Admin Route PaneL//*
      <Route path={ROUTES.ADMIN} element={<AdminPanel />}>
        <Route path="allUsers" element={<GetAllUsers />} />
        <Route path="deleteusers" element={<AdminDelete />} />
      </Route>
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};
export default Router;
