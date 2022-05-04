import { Injectable } from '@nestjs/common';

import { IsNull, LessThan, MoreThan } from 'typeorm';

import { CreateCampaignDto } from './dto/create-campaign.dto';

import { UpdateCampaignDto } from './dto/update-campaign.dto';

import { Campaign } from './entities/campaign.entity';

import { CampaignOption } from '../campaign-options/entities/campaign-option.entity';

import { ConfigService } from '@nestjs/config';

import * as Jwt from 'jsonwebtoken';

@Injectable()
export class CampaignsService {

	/**
	 * constructor 
	 */
	constructor(private configService: ConfigService) { }

	/**
	 * create
	 */
	async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {

		const campaign: Campaign = new Campaign();

		Object.assign(campaign, {

			...createCampaignDto
		});

		await campaign.save();

		return campaign;
	}

	/**
	 * get all
	 */
	async findAll(): Promise<Campaign[]> {

		const campaigns: Campaign[] = await Campaign.find({

			relations: ['campaignOptions'],

			where: {

			}
		});

		return campaigns;
	}

	/**
	 * get all votable
	 */
	async findAllVotable(token: string): Promise<Campaign[]> {

		// get token data
		const tokenJson = Jwt.verify(token.replace(/^Bearer /, ''), this.configService.get<string>('JWT_SECRET'));

		// user id
		const { id } = tokenJson as any;

		const campaigns: Campaign[] = await Campaign.find({

			relations: ['campaignOptions'],

			where: {

				startAt: LessThan(new Date()),

				endAt: MoreThan(new Date())
			}
		});

		const coll: any[] = [];

		campaigns.forEach(campaign => {

			campaign.campaignOptions.forEach(option => coll.push(option))
		});

		const rawData: any[] = await Campaign.query(`
			select
				count(id) as count,
				a.campaign_option_id,
				sum(if(a.user_id = ?,1,0)) as has_me
			from
				users_campaign_options a
			where
				a.campaign_option_id in (?) and
				a.deleted_at is null
			group by
				a.campaign_option_id
		`, [id, coll.map(m => m.id)]);

		coll.forEach(col => {

			col.voteCount = 0;

			col.hasMe = 0;

			const countData = rawData.find(m => m.campaign_option_id === col.id);

			if (countData) {

				col.voteCount = countData.count;

				col.hasMe = +countData.has_me;
			}
		});

		return campaigns;
	}

	/**
	 * get one
	 */
	async findOne(id: number): Promise<Campaign> {

		const campaign: Campaign = await Campaign.findOne({

			relations: ['campaignOptions'],

			where: {

				id: id
			}
		});

		return campaign;
	}

	/**
	 * update
	 */
	async update(id: number, updateCampaignDto: UpdateCampaignDto): Promise<Campaign> {

		const campaign: Campaign = await this.findOne(id);

		if (typeof campaign === 'undefined') {

			throw new Error('campaign not found');
		}

		Object.assign(campaign, {

			...updateCampaignDto
		});

		await campaign.save();

		return campaign;
	}

	/**
	 * delete
	 */
	async remove(id: number): Promise<Campaign> {

		const campaign: Campaign = await this.findOne(id);

		if (typeof campaign === 'undefined') {

			throw new Error('campaign not found');
		}

		await campaign.softRemove();

		return campaign;
	}
}
