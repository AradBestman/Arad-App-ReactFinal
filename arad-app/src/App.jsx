import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";

import LayOutComponent from "./Layout/LayOutComponent";
import Router from "./routes/Router";
import useAutoLogin from "./hooks/useAutoLogin";
import { useRef } from "react";

const App = () => {
  useAutoLogin(false)();
  return (
    <LayOutComponent>
      <ToastContainer />
      <Router />
    </LayOutComponent>
  );
};

export default App;
