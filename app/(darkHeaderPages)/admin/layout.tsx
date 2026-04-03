import React from "react";

import { PrivateWrapper } from "@/shared/wrappers/PrivateWrapper";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return <PrivateWrapper haveRole="ADMIN">{children}</PrivateWrapper>;
};

export default AdminLayout;
