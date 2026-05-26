export type RegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    isAdult: boolean;
    isProfessional: boolean;
    password: string;
};

export type RegisterResponse = {
    user: RegisterData & {
        id: number;
        phone: string;
        isVerified: boolean;
        createdAt: Date;
    };
    accessToken: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type LoginResponse = RegisterResponse;

export type VerifyCode = { code: string };

export type RecoveryData = {
    email: string;
};

export type RecoveryVerifyData = RecoveryData & {
    code: string;
};

export type RecoveryChangeData = RecoveryVerifyData & {
    password: string;
};

export type ChangePasswordData = {
    oldPassword: string;
    newPassword: string;
};
