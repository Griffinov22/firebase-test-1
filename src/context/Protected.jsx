import { useContext, useEffect } from "react";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  //makes sure users are signed in. if not, they will be returned to home
  const { user, setAccessError } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("user blocked");
      setAccessError(true);
      navigate("/");
    }
  }, []);

  return children;
};

export default Protected;
