import { Module } from '@nestjs/common';
import { CampaignOptionsService } from './campaign-options.service';
import { CampaignOptionsController } from './campaign-options.controller';

@Module({
  controllers: [CampaignOptionsController],
  providers: [CampaignOptionsService]
})
export class CampaignOptionsModule {}
