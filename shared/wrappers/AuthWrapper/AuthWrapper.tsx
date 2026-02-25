"use client";

import React from "react";
import { redirect } from "next/navigation";

import { useAppSelector } from "@/shared/hooks/useRedux";

import { Preloader } from "@/shared/ui/Preloader";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { authIsLoading } = useAppSelector((state) => state.app);
    const isAuth = useAppSelector((state) => state.user.isAuth);

    if (authIsLoading) {
        return <Preloader fill />;
    }

    if (!isAuth) {
        redirect("/");
    }

    return children;
};

export default AuthWrapper;
