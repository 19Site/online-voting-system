import { Test, TestingModule } from '@nestjs/testing';
import { CampaignOptionsService } from './campaign-options.service';

describe('CampaignOptionsService', () => {
  let service: CampaignOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignOptionsService],
    }).compile();

    service = module.get<CampaignOptionsService>(CampaignOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
