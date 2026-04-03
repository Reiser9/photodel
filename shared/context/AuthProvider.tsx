"use client";

import React from "react";

type AuthContextProps = {
    loginModal: boolean;
    setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
    registerModal: boolean;
    setRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = React.createContext<AuthContextProps | null>(null);

export const useAuthContext = () => {
    const data = React.useContext(AuthContext);

    if (!data) {
        throw new Error("Can not useAuthContext outside of the AuthProvider");
    }

    return data;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loginModal, setLoginModal] = React.useState(false);
    const [registerModal, setRegisterModal] = React.useState(false);

    return (
        <AuthContext.Provider
            value={{
                loginModal,
                setLoginModal,
                registerModal,
                setRegisterModal,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
