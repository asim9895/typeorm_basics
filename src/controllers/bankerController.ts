import { Response, Request } from 'express';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';

export const create_banker = async (req: Request, res: Response) => {
	const { first_name, last_name, email, card_number, employee_number } =
		req.body;
	try {
		const banker = Banker.create({
			first_name,
			last_name,
			email,
			card_number,
			employee_number,
		});

		await banker.save();

		res.status(200).json({ banker });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export const connect_banker_to_client = async (req: any, res: any) => {
	const { banker_id, client_id } = req.body;
	try {
		const banker = await Banker.findOne(banker_id);
		const client = await Client.findOne(client_id);

		if (!banker && !client) {
			return res
				.status(401)
				.json({ errors: [{ msg: 'Banker cannot be connected to client' }] });
		}

		banker.clients = [client];

		await banker.save();
		res.status(200).json('banker connected to client');
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
