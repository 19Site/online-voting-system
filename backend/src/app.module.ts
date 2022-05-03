import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, CampaignsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
