import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import { ScanData } from './ScanData';
import { dateFormat } from '../utils/dates';

export const Log = sequelize.define(
	'log',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		date: {
			type: DataTypes.DATEONLY,
			get: function () {
				return dateFormat(this.getDataValue('paymentDate'));
			},
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		send: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		receive: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
		transfer: {
			type: DataTypes.INTEGER,
			allowNull: false,
			notNull: true,
			notEmpty: true,
		},
	},
	{ timestamps: false }
);

Log.hasMany(ScanData, { sourceKey: 'id', foreingKey: 'logId' });

ScanData.belongsTo(Log, { targetKey: 'id', foreingKey: 'logId' });
