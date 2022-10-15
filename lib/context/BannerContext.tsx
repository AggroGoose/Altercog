import React, { createContext, useContext, useState } from "react";
import { BannerProps } from "../../addl";

const BannerContext = createContext({ isOpen: false, type: "", message: "" });
const BannerUpdateContext = createContext<
  (type: string, message: string) => void
>(() => {});

export const useBanner = () => {
  return useContext(BannerContext);
};
export const useBannerUpdate = () => {
  return useContext(BannerUpdateContext);
};

export default function BannerProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [infoBanner, setInfoBanner] = useState<BannerProps>({
    isOpen: false,
    type: "",
    message: "",
  });

  const updateBanner = (type: string, message: string) => {
    if (infoBanner.isOpen) {
      setInfoBanner({ isOpen: false, type: "", message: "" });
    } else {
      setInfoBanner({ isOpen: true, type, message });
    }
  };

  return (
    <BannerContext.Provider value={infoBanner}>
      <BannerUpdateContext.Provider value={updateBanner}>
        {children}
      </BannerUpdateContext.Provider>
    </BannerContext.Provider>
  );
}
