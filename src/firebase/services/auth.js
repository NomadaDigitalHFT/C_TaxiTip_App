import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 

export const registerUser = async (email, password, additionalData = {}) => {
  if (!email || !password) {
    throw new Error("Todos los campos son obligatorios.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guarda datos adicionales en Firestore SOLO si se registra correctamente
    const userDocRef = doc(db, "usuarios", user.uid);
    await setDoc(userDocRef, {
      email,
      uid: user.uid,
      ...additionalData, // Guarda más datos como nombre y teléfono
    });

    return user;
  } catch (error) {
    console.error("Error en el registro:", error.message);
    if (error.code === "auth/email-already-in-use") {
      throw new Error("El correo ya está en uso. Intenta con otro.");
    } else if (error.code === "permission-denied") {
      throw new Error("No tienes permisos para registrarte. Verifica las reglas en Firestore.");
    }
    throw new Error("Error durante el registro: " + error.message);
  }
};
