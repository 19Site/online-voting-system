import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CampaignsModule } from './campaigns/campaigns.module';

import { CampaignOptionsModule } from './campaign-options/campaign-options.module';

import { ActionsModule } from './actions/actions.module';

import { ConfigModule } from '@nestjs/config';

@Module({

	imports: [

		ConfigModule.forRoot({

			isGlobal: true,

			envFilePath: ['.env', '.env.example'],
		}),

		TypeOrmModule.forRoot(), UsersModule, CampaignsModule, CampaignOptionsModule, ActionsModule],

	controllers: [AppController],

	providers: [AppService],
})
export class AppModule { }
