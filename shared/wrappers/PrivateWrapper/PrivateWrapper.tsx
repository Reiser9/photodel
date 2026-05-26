"use client";

import React from "react";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Preloader } from "@/shared/ui/Preloader";
import { useUserInfo } from "@/features/user";

const PrivateWrapper = ({
    haveRole = "admin",
    children,
}: {
    haveRole: "admin" | "moderator";
    children: React.ReactNode;
}) => {
    const { getShortInfo } = useUserInfo();

    const { data, isPending } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: getShortInfo,
    });

    const { roles } = data || {};

    if (isPending) {
        return <Preloader fill />;
    }

    if (!roles?.includes(haveRole)) {
        return notFound();
    }

    return children;
};

export default PrivateWrapper;
