import { Injectable } from '@nestjs/common';

import { IsNull } from 'typeorm';

import { CreateCampaignDto } from './dto/create-campaign.dto';

import { UpdateCampaignDto } from './dto/update-campaign.dto';

import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {

	/**
	 * create
	 */
	async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {

		const campaign: Campaign = new Campaign();

		Object.assign(campaign, {

			...createCampaignDto,

			createdAt: new Date(),

			updatedAt: new Date()
		});

		await campaign.save();

		return campaign;
	}

	/**
	 * get all
	 */
	async findAll(): Promise<Campaign[]> {

		const campaigns: Campaign[] = await Campaign.find({

			where: {

				deletedAt: IsNull()
			}
		});

		return campaigns;
	}

	/**
	 * get one
	 */
	async findOne(id: number): Promise<Campaign> {

		const campaign: Campaign = await Campaign.findOne({

			where: {

				id: id,

				deletedAt: IsNull()
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

			...updateCampaignDto,

			updatedAt: new Date()
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

		Object.assign(campaign, {

			deletedAt: new Date()
		});

		await campaign.save();

		return campaign;
	}
}
