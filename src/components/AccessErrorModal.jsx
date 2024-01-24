import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserProvider";

const AccessErrorModal = () => {
  const ref = useRef(null);
  const { accessError, setAccessError } = useContext(UserContext);

  useEffect(() => {
    if (accessError) {
      ref.current.showModal();
      setAccessError(false);
      //open error modal for 1

      setTimeout(() => {
        ref.current.close();
      }, 2000);
    }
  }, [accessError]);

  return (
    <dialog id="error-modal" className="border-danger d-block" style={{ top: "20%", marginInline: "auto" }} ref={ref}>
      <h3 className=" text-danger">You are not authorized</h3>
      <p>
        Consider signing in to view <span className="italics">Todos</span>
      </p>
    </dialog>
  );
};

export default AccessErrorModal;
