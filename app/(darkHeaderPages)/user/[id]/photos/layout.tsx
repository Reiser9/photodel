"use client";

import React from "react";
import { useParams } from "next/navigation";

import UserTopInfo from "@/app/(darkHeaderPages)/ui/UserTopInfo";
import { Tabs } from "@/shared/ui/Tabs";

const PhotosLayout = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams();
    
    return (
        <>
            <UserTopInfo />
            <Tabs
                tabs={[
                    { name: "Фотографии", href: `/user/${id}/photos` },
                    { name: "Альбомы", href: `/user/${id}/photos/albums` },
                ]}
            />
            {children}
        </>
    );
};

export default PhotosLayout;
