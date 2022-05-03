import { Injectable } from '@nestjs/common';
import { CreateCampaignOptionDto } from './dto/create-campaign-option.dto';
import { UpdateCampaignOptionDto } from './dto/update-campaign-option.dto';

@Injectable()
export class CampaignOptionsService {
  create(createCampaignOptionDto: CreateCampaignOptionDto) {
    return 'This action adds a new campaignOption';
  }

  findAll() {
    return `This action returns all campaignOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaignOption`;
  }

  update(id: number, updateCampaignOptionDto: UpdateCampaignOptionDto) {
    return `This action updates a #${id} campaignOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaignOption`;
  }
}
