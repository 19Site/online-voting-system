import { Injectable } from '@nestjs/common';

import { User } from '../users/entities/user.entity';

import * as Crypto from 'crypto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ActionsService {

    /**
     * do login
     */
    async doLogin(hkid: string): Promise<User> {

        // hash hkid
        const hashHkid = Crypto.createHash('sha256').update(hkid).digest('base64');;

        // get user
        let user: User = await User.findOne({

            where: {

                hkid: hashHkid
            }
        });

        // create new user
        if (typeof user === 'undefined') {

            user = new User();

            user.hkid = hashHkid;

            await user.save();
        }

        // return result
        return user;
    }
}
