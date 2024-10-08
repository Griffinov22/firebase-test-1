import { useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SignUpModal from "../components/signUpModal";
import { UserContext } from "../context/UserProvider";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const signUpRef = useRef(null);

  const openSignUp = () => signUpRef.current.showModal();
  const closeSignUp = () => signUpRef.current.close();

  const signUserOut = () => {
    //if successful sign-out send to home page
    signOut(getAuth())
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log("signing user out unsucessful: ", err);
      });
  };

  return (
    <div>
      <nav className="w-50 mx-auto nav d-flex justify-content-between align-items-center py-5">
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-muted" : "")}>
          Home
        </NavLink>
        <NavLink to="todos" className={({ isActive }) => (isActive ? "text-muted" : "")}>
          Todos
        </NavLink>
        {/* consider turning these into modals */}
        {user?.photoURL ? (
          <div className="d-flex flex-column align-items-center">
            <img src={user.photoURL} style={{ width: "64px", aspectRatio: "1/1" }} />
            {user.displayName && <p className=" fst-italic">{user.displayName}</p>}
          </div>
        ) : (
          <button className="nav-link text-decoration-underline m-0 p-0" onClick={openSignUp}>
            Sign Up
          </button>
        )}

        <button className="nav-link text-decoration-underline m-0 p-0" onClick={signUserOut}>
          Log Out
        </button>
      </nav>

      {/* MODALS */}
      <SignUpModal ref={signUpRef} close={closeSignUp} />
    </div>
  );
};

export default Header;
