import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ฟังก์ชัน logout
  const logout = () => {
    setUser(null);
    console.log("User logged out!");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook ใช้เรียก context
export const useAuthContext = () => {
  return useContext(AuthContext);
};
