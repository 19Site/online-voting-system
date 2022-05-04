import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

import { CampaignOptionsService } from './campaign-options.service';

import { CreateCampaignOptionDto } from './dto/create-campaign-option.dto';

import { UpdateCampaignOptionDto } from './dto/update-campaign-option.dto';

import { CampaignOption } from './entities/campaign-option.entity';

@Controller('campaign-options')
export class CampaignOptionsController {

	/**
	 * constructor
	 */
	constructor(private readonly campaignOptionsService: CampaignOptionsService) { }

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(@Body() createCampaignOptionDto: CreateCampaignOptionDto): Promise<object> {

		try {

			const campaignOption: CampaignOption = await this.campaignOptionsService.create(createCampaignOptionDto);

			return {

				ok: true,

				id: campaignOption.id
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
	async findAll(): Promise<object> {

		const campaignOptions: CampaignOption[] = await this.campaignOptionsService.findAll();

		return {

			ok: true,

			data: campaignOptions
		};
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<object> {

		const campaignOption: CampaignOption = await this.campaignOptionsService.findOne(+id);

		return {

			ok: true,

			data: campaignOption ? [campaignOption] : []
		};
	}

	@Patch(':id')
	@UsePipes(new ValidationPipe({ transform: true }))
	async update(@Param('id') id: string, @Body() updateCampaignOptionDto: UpdateCampaignOptionDto): Promise<object> {

		try {

			const campaignOption: CampaignOption = await this.campaignOptionsService.update(+id, updateCampaignOptionDto);

			return {

				ok: true,

				id: campaignOption.id
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

			const campaignOption: CampaignOption = await this.campaignOptionsService.remove(+id);

			return {

				ok: true,

				id: campaignOption.id
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
