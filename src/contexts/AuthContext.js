import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "./../firebase/services/auth";
import { auth } from "./../firebase/firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Actualiza el estado con el usuario actual
    });

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
