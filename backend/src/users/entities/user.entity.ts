import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true, unique: true })
	hkid: string;

	@Index()
	@Column({ name: 'created_at', nullable: true })
	createdAt: Date;

	@Index()
	@Column({ name: 'updated_at', nullable: true })
	updatedAt: Date;

	@Index()
	@Column({ name: 'deleted_at', nullable: true })
	deletedAt: Date;
}
