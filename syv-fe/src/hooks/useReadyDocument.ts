import { useState, useEffect } from "react";

export const useReadyDocument = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  useEffect(() => {
    const onPageLoad = () => {
      setIsDomLoaded(true);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, { passive: true });
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return {
    isDomLoaded,
  };
};
