import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

import { Campaign } from '../../campaigns/entities/campaign.entity';

import { UserCampaignOption } from '../../users/entities/user-campaign-option.entity';

@Entity({ name: 'campaign_options' })
export class CampaignOption extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: true })
    campaign_id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true, type: 'text' })
    description: string;

    @Index()
    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date;

    @Index()
    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Index()
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date;

    @ManyToOne(() => Campaign, campaign => campaign.campaignOptions)
    @JoinColumn({ name: 'campaign_id' })
    campaign: Campaign;

    @OneToMany(() => UserCampaignOption, usersCampaignOption => usersCampaignOption.campaignOption)
    usersCampaignOptions: UserCampaignOption[];
}
