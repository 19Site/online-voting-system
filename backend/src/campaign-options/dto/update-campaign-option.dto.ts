import { PartialType } from '@nestjs/swagger';
import { CreateCampaignOptionDto } from './create-campaign-option.dto';

export class UpdateCampaignOptionDto extends PartialType(CreateCampaignOptionDto) {}
