require("dotenv").config();
const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const PREFIX = "$";

client.on("messageCreate", (message) => {
    console.log(`[${message.author.username}]: ${message.content}`);
    if (message.author.bot) {
        return;
    }
    
    if (
        message.content.toLowerCase() === "hi" ||
    message.content.toLowerCase() === "hello" ||
    message.content.toLowerCase() === "hey"
  ) {
    message.reply(
      `Hi ${message.author.username}! Welcome to Mutant-Age Camel Club. We happy to have you here with us. `
    );
  } else {
    message.reply(
      `Hi ${message.author.username}! This is Mutant-Age Camel Club! We are happy to have you here`
    );
  }

  if (
    message.content.toLowerCase().includes("hey bot") ||
    message.content.toLowerCase().includes("general kenobi")
  ) {
    message.channel.send("Hello there!");
  }

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .substring(/\s+/);

    if (CMD_NAME === "kick") {
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.channel.send(
          "You do not have enough permissions to use this command"
        );
      if (args.length < 1)
        return message.channel.send("Please provide a User ID");
      const member = message.guide.cache.get(args[0]);

      if (member) {
        member
          .kick()
          .then((message) =>
            message.channel.send(
              `${member} kicked user due to server rules and regulation violaition!!`
            )
          )
          .catch((err) =>
            message.channel.send(
              `You do not have enough permission to kick out a user`
            )
          );
      } else {
        message.channel.send("No user with such ID here!");
      }
    }

    if (CMD_NAME === "ban") {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "You do not have enough permissions to use this command"
        );
      if (args.length < 1)
        return message.channel.send("Please provide a User ID");
      const member = message.guide.cache.get(args[0]);

      if (member) {
        member
          .ban()
          .then((message) =>
            message.channel.send(
              `${member} Banned user due to server rules and regulation violaition!!`
            )
          )
          .catch((err) =>
            message.channel.send(
              `You do not have enough permission to ban out a user`
            )
          );
      } else {
        message.channel.send("No user with such ID here!");
      }
    }
  }

  if (message.content == "$listCommands") {
    const exampleEmbed = new MessageEmbed()
      .setColor("#ffd046")
      .setTitle("Server Commands")
      .setDescription(
        "Here you can see the list of the commands used on the server: "
      )
      .addFields(
        { name: "`$rules`", value: "Rules and Regulations" },
        { name: "`$about`", value: "About Server" },
        { name: "`$like`", value: "Likes the current message" },
        { name: "`$dislike`", value: "Dislikes the current message" },
        { name: "`$lucky-number`", value: "Returns a lucky number" }
      );
    message.channel.send({ embeds: [exampleEmbed] });
  }

  if (message.content == "$like") {
    message.react("👍");
  }

  if (message.content == "$rules") {
    message.react("💯");
    const exampleEmbed = new MessageEmbed()
      .setColor("#ffd046")
      .setTitle("Server Rules and Regulations")
      .setDescription(
        `Welcome to MACC’s Discord Community! We are
        happy to have you and excited you’re here.. But, before you get to meet our community and other special people like you, there are some important rules you
        are expected to follow as part of our community.`
      )
      .addFields(
        {
          name: "Safety and Harassment",
          value: `This Discord server is a safe environment for all users and as such harassment is not allowed. Harassment includes, but is not limited to: offensive verbal or written comments about someone's race, religion, gender/gender identity, sexual orientation, physical appearance, and economic or social status. The use of offensive or discriminatory language is not permitted. Jokes or memes at the expense of anything listed above or bullying of any sort will not be tolerated. There are people here from many different
            backgrounds so please be respectful of others.
            The rules about harassment and bullying apply to both
            text and voice channels. Additionally, harassing
            community members via DM is not allowed and should be reported immediately. While interactions outside of our server are outside of our control, behavior which starts to affect the MACC Community will be dealt with
            accordingly.`,
        },
        {
          name: "Appropriate Content",
          value:
            "MACC is a safe community with members of all ages. Do not share or reference pornographic or highly suggestive content. Graphic violence, illegal activity or any other NSFW content shared via links, images, videos, gifs or emotes will be removed immediately. Be sensible of the minors in our community.",
        },
        {
          name: "Channel Usage",
          value: `Everything has its place! Please keep chat relevant to the channel you are in. For example, support requests should take place in our support channel, feedback should be given in our feedback channel, and so on. Please make use of our off-topic and random channels for anything that doesn't fit into another channel!
            Self promotion and link spamming, including to other
            Discord servers, is not allowed.`,
        },
        {
          name: "Getting Support",
          value: `Providing support to you is very important to us! No
            matter the request and questions, our support
            channel is here to help. The admins and mods reserve the right to ban/kick/mute per discretion. If you feel maltreated, open a ticket and the admins will resolve the issue.`,
        },

        {
          name: "Moderators and Admins",
          value: `The moderators and admins are members of the community who have been selected by staff. They are Problem solving experts  who help others in their own time. Please be respectful and patient with them - they are trying their best to help!
            Spamming our support channel or harassing our Support Team or Moderators  will result in an immediate mute. While they're here to help, they will be unable to do so if you do not conduct yourself in an appropriate manner.
            We want everyone to have an enjoyable experience in the MACC Community as such breaking any of these rules can result in a ban, at the discretion of the staff`,
        },

        {
          name: "Bots and commands ",
          value: `Do not abuse the bots and commands. Do not take advantage of the leveling system or participant within the community with bad faith. Staff have low tolerance of the offense. 

            Don’t forget to have fun in the MACC community.`,
        }
      );
    message.channel.send({ embeds: [exampleEmbed] });
  }

  if (message.content == "$about") {
    message.react("📃");
    message.channel.send(`WELCOME TO THE MUTANT AGE CAMEL CLUB! 
        MACC is a collection of 10,000 Mutant Camel NFTs—unique digital collectibles Roaming around the Ethereum blockchain. Your Mutant Camel is your membership card. Keep it safe, it grants you membership perks.`);
  }

  if (message.content == "$dislike") {
    message.react("👎");
  }

  if (message.content == "$lucky-number") {
    message.react("😍");
    let randomNumber = getRandomNumber(0, 1000);
    message.reply(`Your new lucky number is ${randomNumber}.`);
  }
});

client.on("guildMemberAdd", (member) => {
  const channelId = "ID";
  const welcomeMessage = `Hey <@${member.id}>! Welcome to  Mutant-Age Camel Club! \n See commands list by typing: $listCommands`;
  member.guild.channels.fetch(channelId).then((channel) => {
    channel.send(welcomeMessage);
  });
});


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });

client.login("TOKEN");