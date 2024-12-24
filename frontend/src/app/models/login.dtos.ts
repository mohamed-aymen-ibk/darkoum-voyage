export interface LoginDtoRequest {
    email: string;
    password: string;
}

export interface LoginDtoResponse {
    token: string;
    userDetails: {
        id: number;
        name: string;
        email: string;
        phoneNumber: string;
        role: string;
        createdAt: string;
        updatedAt: string;
        active: boolean;
    };
}