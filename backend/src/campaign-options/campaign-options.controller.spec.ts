import { Test, TestingModule } from '@nestjs/testing';
import { CampaignOptionsController } from './campaign-options.controller';
import { CampaignOptionsService } from './campaign-options.service';

describe('CampaignOptionsController', () => {
  let controller: CampaignOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignOptionsController],
      providers: [CampaignOptionsService],
    }).compile();

    controller = module.get<CampaignOptionsController>(CampaignOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
