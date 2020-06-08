/* eslint-disable no-inline-comments */
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const client = new Discord.Client();
const fs = require('fs');
const { prefix, token } = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


// Creates DB connection
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});


// DB model
const Mvp = sequelize.define('mvps', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	death: Sequelize.STRING,
});


client.on('ready', () => {
	console.log('Starting MVP List Discord Bot...'); // Indication that program is ready...
	Mvp.sync(); // Creates the model in the database
});


client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();
	const commandArgs = args.join(' ');

	// List all the commands you can use
	if (command === 'bhcommands') {
		client.commands.get('bhcommands').execute(message, args);


	// Countdown timer
	}
	else if (command === 'bhtimer') {
		client.commands.get('bhtimer').execute(message, args);


	// bhadd - Adds a specific MVP/Time of death
	}
	else if (command === 'bhadd') {

		const splitArgs = commandArgs.split(' ');
		const mvpName = splitArgs.shift();
		const deathTime = splitArgs.join(' ');


		try {
			// equivalent to: INSERT INTO tags (name, time) values (?, ?);
			const mvp = await Mvp.create({
				name: mvpName,
				death: deathTime,
			});
			return message.reply('`' + `MVP ${mvp.name} - ${mvp.death} added.` + '`');
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {
				return message.reply('`' + 'That MVP name already exists.' + '`');
			}
			return message.reply('`' + 'Something went wrong with adding that command.' + '`');
		}


		// bhdelete - Deletes a specific MVP
	}
	else if (command === 'bhdelete') {

		const mvpName = commandArgs;
		// equivalent to: DELETE from tags WHERE name = ?;
		const rowCount = await Mvp.destroy({ where: { name: mvpName } });
		if (!rowCount) return message.reply('`' + 'That MVP name does not exist.' + '`');

		return message.reply('`' + `MVP ${mvpName} deleted.` + '`');


		// bhlist - Only prints a specific MVP
	}
	else if (command === 'bhlist') {

		const mvpName = commandArgs;

		// equivalent to: SELECT * FROM tags WHERE name = 'mvpName' LIMIT 1;
		const mvp = await Mvp.findOne({ where: { name: mvpName } });
		if (mvp) {
			return message.channel.send('`' + mvp.get('name') + ': ' + mvp.get('death') + '`');
		}
		return message.reply('`' + `Could not find MVP name: ${mvpName}` + '`');


		// bhedit - Edits time of death of MVPs
	}
	else if (command === 'bhedit') {
		const splitArgs = commandArgs.split(' ');
		const mvpName = splitArgs.shift();
		const deathTime = splitArgs.join(' ');

		// equivalent to: UPDATE tags (time of death) values (?) WHERE name='?';
		const affectedRows = await Mvp.update({ death: deathTime }, { where: { name: mvpName } });
		if (affectedRows > 0) {
			return message.reply('`' + `MVP ${mvpName} - ${deathTime} successfully edited.` + '`');
		}
		return message.reply('`' + `Could not find an mvp with name ${mvpName}.` + '`');


		// List all the MVPs
	}
	else if (command === 'bhlistall') {

		const mvpList = await Mvp.findAll({ attributes: ['name', 'death'] });
		const mvpString = mvpList.map(t => t.name + ': ' + t.death).join(' \n') || '`' + 'No MVPs set.' + '`';
		return message.channel.send('`' + mvpString + '`');
	}
});


client.login(token);