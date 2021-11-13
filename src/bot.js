require("dotenv").config();

const { Client, Intents , WebhookClient } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES , Intents.FLAGS.GUILD_MESSAGE_REACTIONS] , 
    
});


   const webhookClient = new WebhookClient({
    id: process.env.WEBHOOK_ID,
    token: process.env.WEBHOOK_TOKEN
   }
 );
 
const PREFIX = "$";

client.on('ready', async() => {
    console.log(`${client.user.tag} has logged in.`);
    const guild = await client.guilds.fetch('908366384721965057');
const channel = guild.channels.cache.get('908715971756298242');
const message = await channel.messages.fetch('908717631018778674');
});



client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content === 'hello') {
        message.reply('hello there!');
    }
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        if (CMD_NAME === 'kick') {
            if (!message.member.permissions.has('KICK_MEMBERS'))
                return message.reply('You do not have permission to use that command');
            if (args.length === 0)
                return message.reply('Please provide an ID');
           // const member = message.guild.members.cache.get(args[0]);
          const a = message.mentions.users.first(); 
          if(a) {
            member= message.guild.members.cache.get(a.id);   
          } else {
            member = message.guild.members.cache.get(args[0]);
          }
          
          //member= message.guild.members.cache.get(a.id);
            if (member) {
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked.`))
                    .catch((err) => message.channel.send('I cannot kick that user :('));
            } else {
                message.channel.send('That member was not found');
            }
        } else if (CMD_NAME === 'ban') {
            if (!message.member.permissions.has("BAN_MEMBERS"))
                return message.reply("You do not have permission to use that command");
            if (args.length === 0) return message.reply("Please provide an ID");

            try {
                const a = message.mentions.users.first(); 
          if(a) {
            member= message.guild.members.cache.get(a.id);   
          } else {
              console.log(args)
            member = message.guild.members.cache.get(args[0]);
          }
                //const user = await message.guild.members.ban(member.id);
                if (member) {
                    member
                        .ban()
                        .then((member) => message.channel.send(`${member} was Banned.`))
                        .catch((err) => message.channel.send('I cannot ban that user :('));
                } else {
                    message.channel.send('That member was not found');
                }

            } catch (err) {
                console.log(err);      
                message.channel.send('An error occured. Either I do not have permissin or the user was not found');

            }
        } else if (CMD_NAME === 'announce') {
            console.log("Args ->", args);
            const msg = args.join('');
            console.log("Msg ->",msg);
            webhookClient.send({
                content: msg,
                avatarURL: 'https://i.imgur.com/AfFp7pu.png',
            });
        }
    }

});

client.on('messageReactionAdd', (reaction, user) => {

    console.log('Hello!');
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    
    if (reaction.message.id === '908717631018778674') {
        switch (name) {
            case '🍎':
            member.roles.add('908719931737116694');
             break;
            case '🍌':
            member.roles.add('908719989144555581');
             break;
            case '🍇':
            member.roles.add('908720033046351973');
             break;
            case '🍑':
            member.roles.add('908720072363745310');
             break;
        }


    }
});


client.on('messageReactionRemove', (reaction, user) => {

    console.log('Hello!');
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '908717631018778674') {
        switch (name) {
            case '🍎':
            member.roles.remove('908719931737116694');
             break;
            case '🍌':
            member.roles.remove('908719989144555581');
             break;
            case '🍇':
            member.roles.remove('908720033046351973');
             break;
            case '🍑':
            member.roles.remove('908720072363745310');
             break;
        }


    }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);






