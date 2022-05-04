import { Injectable } from '@nestjs/common';

import { User } from '../users/entities/user.entity';

import { CampaignOption } from '../campaign-options/entities/campaign-option.entity';

import { UserCampaignOption } from '../users/entities/user-campaign-option.entity';

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

    /**
     * do vote
     */
    async doVote(token: string, optionId: number): Promise<boolean> {

        // get token data
        const tokenJson = Jwt.verify(token.replace(/^Bearer /, ''), this.configService.get<string>('JWT_SECRET'));

        // user id
        const { id } = tokenJson as any;

        const campaignOption: CampaignOption = await CampaignOption.findOne({

            where: {

                id: optionId
            }
        });

        const u = new UserCampaignOption();

        u.campaign_id = campaignOption.campaign_id;

        u.user_id = id;

        u.campaign_option_id = campaignOption.id;

        await u.save();

        return true;
    }
}
