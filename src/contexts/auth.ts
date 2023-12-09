import axios from "axios";
import * as React from "react";

export const AuthContextProvider = ({ children }) => {
 const AuthContext = React.createContext(null);
  const [currentUser, setCurrentUser] = React.useState<string|null>(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };

  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};