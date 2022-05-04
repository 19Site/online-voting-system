import { Injectable } from '@nestjs/common';

import { IsNull } from 'typeorm';

import { CreateCampaignOptionDto } from './dto/create-campaign-option.dto';

import { UpdateCampaignOptionDto } from './dto/update-campaign-option.dto';

import { CampaignOption } from './entities/campaign-option.entity';

@Injectable()
export class CampaignOptionsService {

	/**
	 * create
	 */
	async create(createCampaignOptionDto: CreateCampaignOptionDto): Promise<CampaignOption> {

		const campaignOption: CampaignOption = new CampaignOption();

		Object.assign(campaignOption, {

			...createCampaignOptionDto,

			createdAt: new Date(),

			updatedAt: new Date()
		});

		await campaignOption.save();

		return campaignOption;
	}

	/**
	 * get all
	 */
	async findAll(): Promise<CampaignOption[]> {

		const campaignOptions: CampaignOption[] = await CampaignOption.find({

			where: {

				deletedAt: IsNull()
			}
		});

		return campaignOptions;
	}

	/**
	 * get one
	 */
	async findOne(id: number): Promise<CampaignOption> {

		const campaignOption: CampaignOption = await CampaignOption.findOne({

			where: {

				id: id,

				deletedAt: IsNull()
			}
		});

		return campaignOption;
	}

	/**
	 * update
	 */
	async update(id: number, updateCampaignOptionDto: UpdateCampaignOptionDto): Promise<CampaignOption> {

		const campaignOption: CampaignOption = await this.findOne(id);

		if (typeof campaignOption === 'undefined') {

			throw new Error('campaign option not found');
		}

		Object.assign(campaignOption, {

			...updateCampaignOptionDto,

			updatedAt: new Date()
		});

		await campaignOption.save();

		return campaignOption;
	}

	/**
	 * delete
	 */
	async remove(id: number): Promise<CampaignOption> {

		const campaignOption: CampaignOption = await this.findOne(id);

		if (typeof campaignOption === 'undefined') {

			throw new Error('campaign option not found');
		}

		Object.assign(campaignOption, {

			deletedAt: new Date()
		});

		await campaignOption.save();

		return campaignOption;
	}
}
