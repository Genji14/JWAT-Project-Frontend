import { IUserLogin } from "@/types";
import { BaseService } from "./BaseService";

class AuthService extends BaseService {
    constructor() {
        super();
    }

    login = (userLogin: IUserLogin) => this.post("/auth/login/", userLogin);
}

export const authService = new AuthService();