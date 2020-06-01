const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');



//List of death times
var timeOfDeath = ["00:00:00","00:00:01","00:00:02","00:00:03","00:00:04","00:00:05","00:00:06","00:00:07","00:00:08",];


//List of commands
var commands = ["!bhlist", "!bhedit"];



client.on('ready', () => {
    console.log('Starting MVP List Discord Bot...');
});


// Commands
client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
    // List all the commands you can use
    if (command === 'bhcommands') {
        message.channel.send('`' + commands + '`');

    // List all the MVPs
    } else if (command === 'bhlist') {
        const mvpEmbed = new Discord.MessageEmbed()
        .setColor('#bab86c')
        .setTitle('Time of Deaths')
        .addFields(
            { name: 'Memory of Thanatos ', value: 'Time Of Death: ' + timeOfDeath[0]},
            { name: 'Gloom Under Night ', value: 'Time Of Death: ' + timeOfDeath[1]},
            { name: 'Fallen Bishop Hibram ', value: 'Time Of Death: ' + timeOfDeath[2]},
            { name: 'Assassin Cross Eremes ', value: 'Time Of Death: ' + timeOfDeath[3]},
            { name: 'High Priest Margaretha ', value: 'Time Of Death: ' + timeOfDeath[4]},
            { name: 'High Wizard Kathryne ', value: 'Time Of Death: ' +timeOfDeath[5]},
            { name: 'Lord Knight Seyren ', value: 'Time Of Death: ' + timeOfDeath[6]},
            { name: 'Master Smith Howard ', value: 'Time Of Death: ' + timeOfDeath[7]},
            { name: 'Sniper Cecil ', value: 'Time Of Death: ' + timeOfDeath[8]},
        );
        message.channel.send(mvpEmbed);

    // bhadd
    } else if (command === 'bhadd') {
        message.channel.send('Does not do shit yet!');
    
    // bhedit - Edits time of death of MVPs
    }else if (command === 'bhedit') {
        const editEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Which MVP do you want to edit time of death? ')
        .addFields(
            {name: 'Press !0 = Memory of Thanatos: '+ timeOfDeath[0] , value: '================================='},
            {name: 'Press !1 = Gloom Under Night: '+ timeOfDeath[1], value: '================================='},
            {name: 'Press !2 = Fallen Bishop Hibram: '+ timeOfDeath[2], value: '================================='},
            {name: 'Press !3 = Assassin Cross Eremes: '+ timeOfDeath[3], value: '================================='},
            {name: 'Press !4 = High Priest Margaretha: '+ timeOfDeath[4], value: '================================='},
            {name: 'Press !5 = High Wizard Kathryne: '+ timeOfDeath[5], value: '================================='},
            {name: 'Press !6 = Lord Knight Seyren: '+ timeOfDeath[6], value: '================================='},
            {name: 'Press !7 = Master Smith Howard: '+ timeOfDeath[7], value: '================================='},
            {name: 'Press !8 = Sniper Cecil: '+ timeOfDeath[8], value: '================================='},
        );
        message.channel.send(editEmbed);
        message.channel.send('Format is: !0 [Time of Death] = !0 00:01:25');

    // bhdelete 
    }  else if (command === 'bhdelete') {
        message.channel.send('Does not do shit yet!');
    } 

    switch(command) {
        case '0':
            timeOfDeath[0] = args[0];
            message.channel.send('Edited successfully!'); 
            break;
        case '1':
            timeOfDeath[1] = args[0];
            message.channel.send('Edited successfully!'); 
            break;
        case '2':
            timeOfDeath[2] = args[0];
            message.channel.send('Edited successfully!'); 
            break;
        case '3':
            timeOfDeath[3] = args[0];
            message.channel.send('Edited successfully!'); 
            break;         
        case '4':
            timeOfDeath[4] = args[0];
            message.channel.send('Edited successfully!'); 
            break;
        case '5':
            timeOfDeath[5] = args[0];
            message.channel.send('Edited successfully!'); 
            break;  
        case '6':
            timeOfDeath[6] = args[0];
            message.channel.send('Edited successfully!'); 
            break; 
        case '7':
            timeOfDeath[7] = args[0];
            message.channel.send('Edited successfully!'); 
            break;
        case '8':
            timeOfDeath[8] = args[0];
            message.channel.send('Edited successfully!'); 
            break;  
    }
});


client.login(token);
