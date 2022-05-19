import { Log } from '../models/Log';
import Joi from 'Joi';

const validatedschemaLog = Joi.object({
	date: Joi.date().required(),
	send: Joi.number().integer().required(),
	receive: Joi.number().integer().required(),
	transfer: Joi.number().integer().required(),
	userId: Joi.number().integer().required(),
});
export async function createLog(req, res) {
	console.log(req.body);

	try {
		const { error } = validatedschemaLog.validate({ ...req.body });

		if (error?.details[0]?.message) {
			throw new Error(error?.details[0]?.message);
		}
		const newLog = await Log.create({ ...req.body });
		await newLog.save();
		res.status(200).json({ newLog });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function getLog(req, res) {
	const { id } = req.params;
	try {
		const log = await Log.findOne({ where: { id } });
		res.status(200).json({ log });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function getLogs(req, res) {
	const { id } = req.params;
	try {
		const log = await Log.findAll({ where: { userId: id } });
		res.status(200).json({ log });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function deleteLog(req, res) {
	const { id } = req.params;
	try {
		await Log.destroy({ where: { id } });
		res.status(200).json({ message: 'deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}