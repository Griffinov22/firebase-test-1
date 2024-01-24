import { forwardRef, useContext } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { UserContext } from "../context/UserProvider";

const SignUpModal = forwardRef(function SignUpModal({ close }, ref) {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const openGoogle = () => {
    signInWithPopup(auth, provider)
      .then((_data) => {
        //if successful sign-in close the modal
        close();
      })
      .catch((err) => {
        console.log("error signing in user: ", err);
      });
  };

  return (
    <dialog ref={ref} className="m-auto">
      <h2>Sign in With Google:</h2>
      <div className="d-flex flex-column align-content-center my-3 text-nowrap mx-auto row-gap-3" style={{ width: "min-content" }}>
        <button className="btn btn-outline-primary" onClick={openGoogle}>
          Google 🌍
        </button>
        <button className="btn btn-outline-warning" onClick={close}>
          Go Back
        </button>
      </div>
    </dialog>
  );
});

export default SignUpModal;
