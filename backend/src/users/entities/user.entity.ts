import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

import { UserCampaignOption } from './user-campaign-option.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true, unique: true })
	hkid: string;

	@Index()
	@CreateDateColumn({ name: 'created_at', nullable: true })
	createdAt: Date;

	@Index()
	@UpdateDateColumn({ name: 'updated_at', nullable: true })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ name: 'deleted_at', nullable: true })
	deletedAt: Date;

	@OneToMany(() => UserCampaignOption, usersCampaignOption => usersCampaignOption.user)
	usersCampaignOptions: UserCampaignOption[];
}
