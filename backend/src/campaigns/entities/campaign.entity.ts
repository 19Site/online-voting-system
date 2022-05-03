import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index } from 'typeorm';

@Entity({ name: 'campaigns' })
export class Campaign extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true, type: 'text' })
    description: string;

    @Index()
    @Column({ name: 'start_at', nullable: true })
    startAt: Date;

    @Index()
    @Column({ name: 'end_at', nullable: true })
    endAt: Date;

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
