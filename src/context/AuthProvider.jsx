import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

    const createUser = (email, password) => { 
        setLoading(true);  
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('auth state changed', currentUser); 
            setUser(currentUser || null);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        createUser,
        user,
        loading,
        signInUser,
        signInWithGoogle,
        signOutUser

    };    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;