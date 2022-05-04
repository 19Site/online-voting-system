import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus, Query, Headers } from '@nestjs/common';

import { CampaignsService } from './campaigns.service';

import { CreateCampaignDto } from './dto/create-campaign.dto';

import { UpdateCampaignDto } from './dto/update-campaign.dto';

import { Campaign } from './entities/campaign.entity';

import Moment from 'moment';

@Controller('campaigns')
export class CampaignsController {

	/**
	 * constructor
	 */
	constructor(private readonly campaignsService: CampaignsService) { }

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(@Body() createCampaignDto: CreateCampaignDto): Promise<object> {

		try {

			const campaign: Campaign = await this.campaignsService.create(createCampaignDto);

			return {

				ok: true,

				id: campaign.id
			};
		}

		catch (err) {

			throw new HttpException({

				ok: false,

				error: err.message
			}, HttpStatus.OK);
		}
	}

	@Get()
	async findAll(@Query('votable') votable: String, @Headers('Authorization') token: string): Promise<object> {

		// result container
		let campaigns: Campaign[] = [];

		// get votable
		if (+votable === 1) {

			campaigns = await this.campaignsService.findAllVotable(token);
		}

		// get all
		else {

			campaigns = await this.campaignsService.findAll();
		}

		// return
		return {

			ok: true,

			data: campaigns
		};
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<object> {

		const campaign: Campaign = await this.campaignsService.findOne(+id);

		return {

			ok: true,

			data: campaign ? [campaign] : []
		};
	}

	@Patch(':id')
	@UsePipes(new ValidationPipe({ transform: true }))
	async update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto): Promise<object> {

		try {

			const campaign: Campaign = await this.campaignsService.update(+id, updateCampaignDto);

			return {

				ok: true,

				id: campaign.id
			};
		}

		catch (err) {

			throw new HttpException({

				ok: false,

				error: err.message
			}, HttpStatus.OK);
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<object> {

		try {

			const campaign: Campaign = await this.campaignsService.remove(+id);

			return {

				ok: true,

				id: campaign.id
			};
		}

		catch (err) {

			throw new HttpException({

				ok: false,

				error: err.message
			}, HttpStatus.OK);
		}
	}
}
