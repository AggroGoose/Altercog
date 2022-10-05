import { createContext, useContext, useState } from "react";
const BannerContext = createContext();
const BannerUpdateContext = createContext();

const useBanner = () => {
  return useContext(BannerContext);
};
const useBannerUpdate = () => {
  return useContext(BannerUpdateContext);
};

export default function BannerProvider() {
  const [infoBanner, setInfoBanner] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const updateBanner = (type, message) => {
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
