import { Person } from '../utils/Person';
import {
	Entity,
	Column,
	BaseEntity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Client } from './Client';

export enum transactionTypes {
	DEPOSIT = 'deposit',
	WITHDRAWL = 'withdrawl',
}

@Entity('transaction')
export class Transaction extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	amount: number;

	@Column({
		type: 'enum',
		enum: transactionTypes,
	})
	type: string;

	@ManyToOne(() => Client, (client) => client.transactions, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({
		name: 'client_id',
	})
	client: Client;
}
