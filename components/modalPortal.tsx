import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }: { children: JSX.Element }) => {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    setContainer(document.querySelector("#modalPortal") as HTMLDivElement);

    return () => {
      document.body.style.overflow = "unset";
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;
  if (!container) return null;
  return createPortal(children, container);
};

export default ModalPortal;
