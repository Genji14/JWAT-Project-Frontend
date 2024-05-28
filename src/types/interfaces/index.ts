export interface ErrorResponse extends Error {
    response: {
        data: {
            message: string;
            status: number;
        };
        status: number;
    };
}

export interface IUserSignIn {
    username: string;
    password: string;
}