

export interface NewUserPayload {
    username: string;
    email: string;
    password: string;
    birthday: string;
    phone: string;
    gender: string;
    referral_code?: string;
}

export type LoginFormPayload = {
    email: string;
    password: string;
};