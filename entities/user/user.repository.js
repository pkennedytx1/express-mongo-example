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
            const token = jwt.sign(
                { username: data.username, id: data._id }, 'myPrivateKey',
            );
            return { username: data.username, id: data._id, token };
        } catch (err) {
            console.error('Error::' + err);
            return err;
        }
    }
}