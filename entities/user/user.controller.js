import { UserService } from "./user.service.js";

export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async signup(user) {
        console.log('Controller: signup')
        return await this.userService.signup(user);
    }
}