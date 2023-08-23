import { LocalStorage } from "@/utils/localStorage";
import { createContext, useState } from "react";

export const AuthContext = createContext<{
  userData?: {
    username?: string;
    email?: string;
    _id?: string;
  };
  isLoggedIn: boolean;
  login: (
    userData: { username: string; email: string; _id: string },
    accessToken: string
  ) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  login: (
    userData: { username: string; email: string; _id: string },
    accessToken: string
  ) => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<{
    username?: string;
    email?: string;
    _id?: string;
  }>({});

  const login = (
    {
      username,
      email,
      _id,
    }: {
      username: string;
      email: string;
      _id: string;
    },
    accessToken: string
  ) => {
    setIsLoggedIn(true);
    LocalStorage.set("accessToken", accessToken);
    LocalStorage.set("_id", _id);
    setUserData({ username, email, _id });
  };

  // Function to log out the user
  const logout = () => {
    setIsLoggedIn(false);
    setUserData({});
    LocalStorage.remove("_id");
    LocalStorage.remove("accessToken");
  };

  // Provide the auth methods and state to the components
  const authContextValue = {
    isLoggedIn,
    userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
