import { UserService } from "./user.service.js";

export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async signup(user) {
        console.log('Controller: signup')
        return await this.userService.signup(user);
    }

    async login(user) {
        console.log('Controller: login')
        return await this.userService.login(user);
    }
}