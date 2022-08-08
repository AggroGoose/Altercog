import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
      setMounted(false);
    };
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#modalPortal"))
    : null;
};

export default ModalPortal;
