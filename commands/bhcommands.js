const Discord = require('discord.js');


module.exports = {
	name: 'bhcommands',
	description: 'List all available commands',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {

		const commandsEmbed = new Discord.MessageEmbed()
			.setColor('#424874')
			.setTitle('List of commands')
			.addFields(
				{ name: '1) !bhlistall', value: 'Shows every MVPs time of deaths' },
				{ name: '2) !bhlist [MVP Name]', value: 'Prints only specific MVPs time of death' },
				{ name: '3) !bhadd [MVP Name] [Time of Death]', value: 'Adds MVP info to the database' },
				{ name: '4) !bhedit [MVP Name] [Time of Death]', value: 'Updates MVPs time of death' },
				{ name: '5) !bhdelete [MVP Name]', value: 'Deletes a specific MVPs info in the database' },
				{ name: '!bhtimer [# of minutes]', value: 'Sets a timer depending on how many minutes user wants' },
			);
		message.channel.send(commandsEmbed);
	},
};