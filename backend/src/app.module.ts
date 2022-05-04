import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsModule } from './campaigns/campaigns.module';
import { CampaignOptionsModule } from './campaign-options/campaign-options.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, CampaignsModule, CampaignOptionsModule, ActionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
