import { Person } from '../utils/Person';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Client } from './Client';

@Entity('banker')
export class Banker extends Person {
	@Column({
		unique: true,
		length: 10,
	})
	employee_number: string;

	@ManyToMany(() => Client, {
		cascade: true,
	})
	@JoinTable({
		name: 'banker_clients',
		joinColumn: {
			name: 'banker',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'client',
			referencedColumnName: 'id',
		},
	})
	clients: Client[];
}
