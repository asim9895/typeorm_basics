import { Person } from '../utils/Person';
import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { Transaction } from './Transactions';
import { Banker } from './Banker';

@Entity('client')
export class Client extends Person {
	@Column()
	balance: number;

	@Column({
		default: true,
		name: 'active',
	})
	is_active: boolean;

	@Column({
		type: 'simple-json',
		nullable: true,
	})
	additional_info: {
		age: number;
		hair_color: string;
	};

	@Column({
		type: 'simple-array',
		default: [],
		nullable: true,
	})
	family_members: object[];

	@OneToMany(() => Transaction, (transaction) => transaction.client)
	transactions: Transaction[];

	@ManyToMany(() => Banker, { onDelete: 'CASCADE' })
	bankers: Banker[];
}
