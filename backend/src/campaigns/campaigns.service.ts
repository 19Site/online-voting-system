import { Injectable } from '@nestjs/common';

import { IsNull, LessThan, MoreThan } from 'typeorm';

import { CreateCampaignDto } from './dto/create-campaign.dto';

import { UpdateCampaignDto } from './dto/update-campaign.dto';

import { Campaign } from './entities/campaign.entity';

import { CampaignOption } from '../campaign-options/entities/campaign-option.entity';

@Injectable()
export class CampaignsService {

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
	async findAllVotable(): Promise<Campaign[]> {

		const campaigns: Campaign[] = await Campaign.find({

			relations: ['campaignOptions'],

			where: {

				startAt: LessThan(new Date()),

				endAt: MoreThan(new Date())
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
