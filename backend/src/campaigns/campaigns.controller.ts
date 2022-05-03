import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

import { CampaignsService } from './campaigns.service';

import { CreateCampaignDto } from './dto/create-campaign.dto';

import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

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
	findAll() {
		return this.campaignsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.campaignsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
		return this.campaignsService.update(+id, updateCampaignDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.campaignsService.remove(+id);
	}
}
