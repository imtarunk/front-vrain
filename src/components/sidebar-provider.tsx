import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [state, setState] = useState("expanded");
  const [openMobile, setOpenMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);

  return (
    <SidebarContext.Provider
      value={{
        isMobile,
        state,
        openMobile,
        setOpenMobile,
        setState,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
