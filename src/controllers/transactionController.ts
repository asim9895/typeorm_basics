import { Client } from '../entities/Client';
import { Transaction, transactionTypes } from '../entities/Transactions';

export const create_transaction = async (req: any, res: any) => {
	const { client_id, amount, type } = req.body;
	try {
		let client = await Client.findOne(client_id);

		if (!client) {
			return res.status(401).json({ errors: [{ msg: 'No Client found' }] });
		}

		const transaction = Transaction.create({
			amount,
			type,
			client,
		});

		await transaction.save();

		if (type === transactionTypes.DEPOSIT) {
			client.balance = client.balance + amount;
		} else if (type === transactionTypes.WITHDRAWL) {
			client.balance = client.balance - amount;
		}

		await client.save();

		res.status(200).json({ client, transaction });
	} catch (error) {
		console.log(error);
	}
};
