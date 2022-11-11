import { connect } from '../../config/dbConfig.js';
import { User } from './user.model.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserRepository {
    constructor() {
        connect();
    }

    async signup(user) {
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            let data = await User.create(user);
            console.log(user.password);
            const token = jwt.sign(
                { username: data.username, id: data._id }, 'myPrivateKey',
            );
            return { username: data.username, id: data._id, token };
        } catch (err) {
            console.error('Error::' + err);
            return err;
        }
    }

    async login(user) {
        try {
            let dbUser = await User.findOne({ username: user.username });
            if (!dbUser) {
                throw new Error('User does not exist');
            }
            const isMatch = await bcrypt.compare(user.password, dbUser.password);
            if (!isMatch) {
                throw new Error("User name or password is incorrect");
            }
            const token = jwt.sign(
                { username: dbUser.username, id: dbUser._id }, 'myPrivateKey',
            );
            return { username: dbUser.username, id: dbUser._id, token };
        } catch (err) {
            console.error(err);
            return err;
        }
    }
}