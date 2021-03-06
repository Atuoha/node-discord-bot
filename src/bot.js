if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const axios = require("axios");
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

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

sadWords = ["sad", "depressed", "unhappy", "angry", "miserable"];
encouragements = ["Cheer up!", "Hang in there.", "You are a great person"];

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
      `Hi ${message.author.username}! Welcome to AviatorChain Community We happy to have you here with us. `
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

  if (message.content == "$commands") {
    const exampleEmbed = new MessageEmbed()
      .setColor("#ffd046")
      .setTitle("Server Commands")
      .setDescription(
        "Here you can see the list of the commands used on the server: "
      )
      .addFields(
        { name: "`$rules`", value: "Rules and Regulations" },
        { name: "`$about`", value: "About Server" },
        { name: "`$news`", value: "News pertaining Cryptocurrency" },
        {
          name: "`$price`",
          value:
            " $price <coin_name> <compare_currency> - To get the price of a coin with respect to another coin or currency",
        },
        { name: "`$inspire`", value: "Inspirations" },
        { name: "`$lucky-number`", value: "Returns a lucky number" },
        { name: "`$like`", value: "Likes the current message" },
        { name: "`$dislike`", value: "Dislikes the current message" }
      );
    message.channel.send({ embeds: [exampleEmbed] });
  }

  if (message.content == "$like") {
    message.react("????");
  }

  if (message.content == "$rules") {
    message.react("????");
    const exampleEmbed = new MessageEmbed()
      .setColor("#ffd046")
      .setTitle("Server Rules and Regulations")
      .setDescription(
        `Welcome to AVC???s Discord Community! We are
          happy to have you and excited you???re here.. But, before you get to meet our community and other special people like you, there are some important rules you
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
              Don???t forget to have fun in the MACC community.`,
        }
      );
    message.channel.send({ embeds: [exampleEmbed] });
  }

  // INSPIRE
  if (message.content === "$inspire") {
    message.react("????");
    const encodedURI1 = encodeURI(`https://zenquotes.io/api/random`);
    axios
      .get(encodedURI1)
      .then((response) => {
        message.channel.send(
          response.data[0]["q"] + " -" + response.data[0]["a"]
        );
      })
      .catch((err) => {
        message.channel.send("There was an error. Please try again later.");
      });
  }

//   setInterval(()=>{
//     const encodedURI2 = encodeURI(`https://newsapi.org/v2/everything?q=crypto&apiKey=${process.env.NEWS}&pageSize=1&sortBy=publishedAt&language=en`);
//     axios
//       .get(encodedURI2)
//       .then((response) => {
//         const {
//           title,
//           source: { name },
//           description,
//           url,
//         } = response.data.articles[0];

//         message.react("????");
//         message.channel.send(
//           `Latest news related to crypto:\n
//             Title: ${title}\n
//             Description: ${description}\n
//             Source: ${name}\n
//             Link to full article: ${url}`
//         );
//       })
      
//   },)

  // CRYPTO NEWS
  if (message.content.startsWith("$news")) {
    const encodedURI2 = encodeURI(`https://newsapi.org/v2/everything?q=crypto&apiKey=${process.env.NEWS}&pageSize=1&sortBy=publishedAt&language=en`);
    axios
      .get(encodedURI2)
      .then((response) => {
        const {
          title,
          source: { name },
          description,
          url,
        } = response.data.articles[0];

        message.react("????");
        message.channel.send(
          `Latest news related to crypto:\n
            Title: ${title}\n
            Description: ${description}\n
            Source: ${name}\n
            Link to full article: ${url}`
        );
      })
      .catch((err) => {
        message.channel.send("There was an error. Please try again later.");
      });
  }

  // ENCOURAGEMENT
  if (sadWords.some((word) => message.content.includes(word))) {
    const encouragement =
      encouragements[Math.floor(Math.random() * encouragements.length)];
    message.react("????");
    message.reply(encouragement);
  }

  //   // CRYPTO PRICE
  if (message.content.startsWith("$price")) {
    // Get the params
    const [command, ...args] = message.content.split(" ");

    // Check if there are two arguments present
    if (args.length !== 2) {
       message.reply(
        "You must provide the crypto and the currency to compare with!"
      );
    } else {
      const [coin, vsCurrency] = args;
      // Get crypto price from coingecko API
      const encodedURI3 = encodeURI(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${vsCurrency}`);
       axios
        .get(encodedURI3)
        .then((response) => {
          if (!response.data[coin][vsCurrency]) {
            message.reply(
              "Please check your inputs - Data doesn't exist!. For example: $price bitcoin usd "
            );
          }
          message.react("????");
          message.reply(
            `The current price of 1 ${coin} = ${response.data[coin][vsCurrency]} ${vsCurrency}`
          );
        })
        .catch((err) => {
          message.reply(
            "Please check your inputs. For example: $price bitcoin usd"
          );
        });
    }
  }

  if (message.content == "$about") {
    message.react("????");
    message.channel.send(`WELCOME TO AVIATORCHAIN COMMUNITY! 
          The AviatorChain (AVC) is a decentralized digital asset with a unique protocol ensuring proper declassification
of Airline assets using highly renowned Blockchain technology.`);
  }

  if (message.content == "$dislike") {
    message.react("????");
  }

  if (message.content == "$lucky-number") {
    message.react("????");
    let randomNumber = getRandomNumber(0, 1000);
    message.reply(`Your new lucky number is ${randomNumber}.`);
  }
});

client.on("guildMemberAdd", (member) => {
  const channelId = process.env.ID;
  const welcomeMessage = `Hey <@${member.id}>! Welcome to  AviatorChain Community! \n See commands list by typing: $commands. To view price of cryptocurrency use this format: "$price bitcoin usd" | For new use $news`;
  member.guild.channels.fetch(channelId).then((channel) => {
    channel.send(welcomeMessage);
  });
});

client.login(process.env.TOKEN);
