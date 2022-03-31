import { Response, Request } from 'express';
import { Client } from '../entities/Client';
import { getRepository } from 'typeorm';

export const create_client = async (req: Request, res: Response) => {
	const {
		first_name,
		last_name,
		email,
		age,
		card_number,
		balance,
		hair_color,
		family_members,
	} = req.body;
	try {
		const client = Client.create({
			first_name,
			last_name,
			email,
			card_number,
			balance,
			family_members,
			additional_info: {
				age,
				hair_color,
			},
		});

		await client.save();

		res.status(200).json({ client });
	} catch (error) {
		console.log(error);
	}
};

export const delete_client = async (req: any, res: any) => {
	const { client_id } = req.body;
	try {
		const client = await Client.delete(client_id);

		res.status(200).json({ client, message: 'success' });
	} catch (error) {
		console.log(error);
	}
};

export const fetch_clients = async (req: any, res: any) => {
	try {
		const clients = await getRepository(Client)
			.createQueryBuilder('client')
			.leftJoinAndSelect('client.transactions', 'client_id')
			.getMany();

		if (!clients) {
			return res.status(401).json({ errors: [{ msg: 'No Clients found' }] });
		}
		res.status(200).json({ clients, message: 'success' });
	} catch (error) {
		console.log(error);
	}
};
