import { useContext, useEffect } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  //makes sure users are signed in. if not, they will be returned to home
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      console.log("user blocked");
      navigate("/");
    }
  }, []);

  return children;
};

export default Protected;
