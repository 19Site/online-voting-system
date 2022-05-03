import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampaignOptionsService } from './campaign-options.service';
import { CreateCampaignOptionDto } from './dto/create-campaign-option.dto';
import { UpdateCampaignOptionDto } from './dto/update-campaign-option.dto';

@Controller('campaign-options')
export class CampaignOptionsController {
  constructor(private readonly campaignOptionsService: CampaignOptionsService) {}

  @Post()
  create(@Body() createCampaignOptionDto: CreateCampaignOptionDto) {
    return this.campaignOptionsService.create(createCampaignOptionDto);
  }

  @Get()
  findAll() {
    return this.campaignOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignOptionDto: UpdateCampaignOptionDto) {
    return this.campaignOptionsService.update(+id, updateCampaignOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignOptionsService.remove(+id);
  }
}
