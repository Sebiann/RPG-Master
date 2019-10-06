const Discord = require('discord.js')

exports.run = (client, message) => {
  const helpmessage = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setTitle('Help:')
    .setAuthor('still in the works')
    .setDescription('This is the Help message')
    .addField('Command List', 'ping\necho\n...', true)
    .addField('Music Command List', 'play\nq add, q list, q remove, q clear\nstop\nvol', true)
    .addField('Admin Command List', 'reload\nmreload', true)
    .setTimestamp()
    .setFooter(message.member.displayName, message.author.avatarURL)
  message.channel.send(helpmessage).catch(console.error)
}
