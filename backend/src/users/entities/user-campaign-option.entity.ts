import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index, ManyToOne, JoinColumn, Unique } from 'typeorm';

import { Campaign } from '../../campaigns/entities/campaign.entity';

import { CampaignOption } from '../../campaign-options/entities/campaign-option.entity';

import { User } from '../../users/entities/user.entity';

@Entity({ name: 'users_campaign_options' })
@Unique('user_id_campaign_id_unique', ['user_id', 'campaign_id'])
export class UserCampaignOption extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column({ nullable: true })
	user_id: number;

	@Index()
	@Column({ nullable: true })
	campaign_id: number;

	@Index()
	@Column({ nullable: true })
	campaign_option_id: number;

	@Index()
	@Column({ name: 'created_at', nullable: true })
	createdAt: Date;

	@Index()
	@Column({ name: 'updated_at', nullable: true })
	updatedAt: Date;

	@Index()
	@Column({ name: 'deleted_at', nullable: true })
	deletedAt: Date;

	@ManyToOne(() => User, user => user.usersCampaignOptions)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Campaign, campaign => campaign.usersCampaignOptions)
	@JoinColumn({ name: 'campaign_id' })
	campaign: Campaign;

	@ManyToOne(() => CampaignOption, campaignOption => campaignOption.usersCampaignOptions)
	@JoinColumn({ name: 'campaign_option_id' })
	campaignOption: CampaignOption;
}
