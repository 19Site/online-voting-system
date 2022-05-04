import { Injectable } from '@nestjs/common';

import { User } from '../users/entities/user.entity';

import { ConfigService } from '@nestjs/config';

import * as Crypto from 'crypto';

import * as bcrypt from 'bcrypt';

import * as Jwt from 'jsonwebtoken';

@Injectable()
export class ActionsService {

    /**
     * constructor 
     */
    constructor(private configService: ConfigService) { }

    /**
     * do login
     */
    async doLogin(hkid: string): Promise<object> {

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

        // access token
        const accessToken = Jwt.sign({

            id: user.id,

            type: 'access_token',

            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2)
        }, this.configService.get<string>('JWT_SECRET'));

        // refresh token
        const refreshToken = Jwt.sign({

            id: user.id,

            type: 'refresh_token',

            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        }, this.configService.get<string>('JWT_SECRET'));

        // return result
        return {

            accessToken: accessToken,

            refreshToken: refreshToken
        };
    }
}
