import { Client } from '../entities/Client';
import { DataSource, createConnection } from 'typeorm';
import { Banker } from '../entities/Banker';
import { Transaction } from '../entities/Transactions';

export const postgres_db = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'Asim7648#',
			database: 'type_test_orm',
			entities: [Client, Banker, Transaction],
			synchronize: true,
			logging: false,
		});
		console.log('postgres db connected');
	} catch (error) {
		console.log('database error');
	}
};
