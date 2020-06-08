module.exports = {
	name: 'bhtimer',
	description: 'Sets a timer depending on how many minutes user wants',
	execute(message, args) {

		if(isNaN(args[0])) {
			message.channel.send('Wrong input!');
		}
		else {
			message.channel.send('Added timer successfully!');
			setTimeout(function() {
				message.channel.send(`Your ${args[0]} minute/s is up!`);
			}, args[0] * 60000);
		}
	},
};