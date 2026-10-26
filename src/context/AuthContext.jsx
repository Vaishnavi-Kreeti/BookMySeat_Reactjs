import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [loggedInUser, setLoggedInUser] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("loggedInUser") || "null"
            );
        } catch {
            return null;
        }
    });
    function login(user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setLoggedInUser(user);
    }
    function logout() {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    }
    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}
