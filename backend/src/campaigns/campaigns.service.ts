import { Injectable } from '@nestjs/common';

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

	findAll() {
		return `This action returns all campaigns`;
	}

	findOne(id: number) {
		return `This action returns a #${id} campaign`;
	}

	update(id: number, updateCampaignDto: UpdateCampaignDto) {
		return `This action updates a #${id} campaign`;
	}

	remove(id: number) {
		return `This action removes a #${id} campaign`;
	}
}
