import { UserRepository } from "./user.repository.js";
import * as EmailValidator from 'email-validator';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async validateUserData(user) {
        const errors = [];
        if(!user.username) {
            errors.push({
                "username": "Username cannot be empty"
            });
        }
        if (!user.email || !EmailValidator.validate(user.email)) {
            errors.push({
                "email": "Please enter a valid email"
            })
        }
        if (!user.password || !user.password.length > 5) {
            errors.push({
                "password": "Password mus be at least 5 characters"
            });
        }
        console.log(errors);
        return errors
    }

    async signup(user) {
        const errors = await this.validateUserData(user);
        if(errors.length === 0) {
            return await this.userRepository.signup(user);
        }
        return { errors };
    }
}