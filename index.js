const Discord = require('discord.js');
const client = new Discord.Client();
const Sequelize = require('sequelize');

// Contains the prefix and token values
const { prefix, token } = require('./config.json');


// Creates DB connection
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

// DB model
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	death: Sequelize.STRING
});


client.on('ready', () => {
    console.log('Starting MVP List Discord Bot...'); // Indication that program is ready...
    Tags.sync(); // Creates the model in the database
});


client.on('message', async message => {
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    const commandArgs = args.join(' ');
    
    // List all the commands you can use
    if (command === 'bhcommands') {

        const commandsEmbed = new Discord.MessageEmbed()
        .setColor('#424874')
        .setTitle('List of commands')
        .addFields(
            {name: '1) !bhlistall', value: 'Shows every MVPs time of deaths'},
            {name: '2) !bhlist [MVP Name]', value: 'Prints only specific MVPs time of death'},
            {name: '3) !bhadd [MVP Name] [Time of Death]', value: 'Adds MVP info to the database'},
            {name: '4) !bhedit [MVP Name] [Time of Death]', value: 'Updates MVPs time of death'},
            {name: '5) !bhdelete [MVP Name]', value: 'Deletes a specific MVPs info in the database'},
            {name: '!bhtimer [# of minutes]', value: 'Sets a timer depending on how many minutes user wants'}
        );
        message.channel.send(commandsEmbed);


    // bhadd - Adds a specific MVP/Time of death
    } else if (command === 'bhadd') {

        const splitArgs = commandArgs.split(' ');
        const mvpName = splitArgs.shift();
        const deathTime = splitArgs.join(' ');

        
        try {
            // equivalent to: INSERT INTO tags (name, time) values (?, ?);
            const tag = await Tags.create({
                name: mvpName,
                death: deathTime
            });
            return message.reply('`' + `MVP ${tag.name} - ${tag.death} added.` + '`');
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.reply('`' + 'That MVP name already exists.' + '`');
            } 
            return message.reply('`' + 'Something went wrong with adding that command.' + '`');
        }
       

    // bhdelete - Deletes a specific MVP
    }  else if (command === 'bhdelete') {
        
        const mvpName = commandArgs;
        // equivalent to: DELETE from tags WHERE name = ?;
        const rowCount = await Tags.destroy({ where: { name: mvpName } });
        if (!rowCount) return message.reply('`' + 'That MVP name does not exist.' + '`');
        
        return message.reply('`' + `MVP ${mvpName} deleted.` + '`');
        

    // bhlist - Only prints a specific MVP
    } else if (command === 'bhlist') {

        const mvpName = commandArgs;

        // equivalent to: SELECT * FROM tags WHERE name = 'mvpName' LIMIT 1;
        const tag = await Tags.findOne({ where: { name: mvpName } });
        if (tag) {
            return message.channel.send('`' + tag.get('name') + ': ' + tag.get('death') + '`');
        }
        return message.reply('`' + `Could not find MVP name: ${mvpName}` + '`');


    // bhedit - Edits time of death of MVPs        
    } else if (command === 'bhedit') {
        const splitArgs = commandArgs.split(' ');
        const mvpName = splitArgs.shift();
        const deathTime = splitArgs.join(' ');

        // equivalent to: UPDATE tags (time of death) values (?) WHERE name='?';
        const affectedRows = await Tags.update({ death: deathTime }, { where: { name: mvpName } });
        if (affectedRows > 0) {
            return message.reply('`' + `MVP ${mvpName} - ${deathTime} successfully edited.` + '`');
        }
        return message.reply('`' + `Could not find an mvp with name ${mvpName}.` + '`');


    // List all the MVPs        
    } else if (command === 'bhlistall'){

        const mvpList = await Tags.findAll({ attributes: ['name', 'death']});
        const mvpString = mvpList.map(t => t.name + ': ' +  t.death).join(' \n')|| '`' + 'No MVPs set.' + '`';
        return message.channel.send('`' + mvpString + '`');
    
    } else if (command === 'bhtimer') {
        
        if(isNaN(args[0])){
            message.channel.send('Wrong input!');
        } else {
            message.channel.send('Added timer successfully!');
            setTimeout(function () {
                message.channel.send(`Your ${args[0]} minute/s is up!`)
            }, args[0] * 60000)
        } 
    }
});


client.login(token);