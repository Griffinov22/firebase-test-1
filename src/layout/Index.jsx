import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useContext, useRef } from "react";
import { UserContext } from "../context/UserProvider";
import AccessErrorModal from "../components/AccessErrorModal";

const Index = () => {
  return (
    <>
      <Header />
      <Outlet />
      <AccessErrorModal />
    </>
  );
};

export default Index;
