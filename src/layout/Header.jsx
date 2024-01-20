import { useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SignUpModal from "../components/signUpModal";
import { UserContext } from "../context/UserProvider";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const signUpRef = useRef(null);

  const openSignUp = () => signUpRef.current.showModal();
  const closeSignUp = () => signUpRef.current.close();

  const signOut = () => {
    //proof of concept -- change to sign user out of firebase
    setUser({});
    console.log("signed out");
    navigate("/");
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

        <button className="nav-link text-decoration-underline m-0 p-0" onClick={signOut}>
          Log Out
        </button>
      </nav>

      {/* MODALS */}
      <SignUpModal ref={signUpRef} close={closeSignUp} />
    </div>
  );
};

export default Header;
