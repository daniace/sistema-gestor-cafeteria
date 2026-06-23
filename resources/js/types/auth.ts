export type User = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    dni: string;
    estado_cuenta_usuario: boolean;
    causa_eliminacion: string | null;
    nombre_rol: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
