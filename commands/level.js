const Discord = require('discord.js')

module.exports = {
  name: 'level',
  aliases: ['lvl'],
  usage: '<@User>',
  description: 'Zeige Levels',
  guildOnly: true,
  args: true,
  cooldown: 5,
  execute(message, args) {
    const user = message.mentions.users.first() || message.client.users.get(args[0])
    if(!user) return message.reply('Sie müssen jemanden erwähnen oder seine ID angeben!')
      .then(msg => {
        msg.delete(5000)
      })

    let userscore = message.client.getScore.get(user.id, message.guild.id)
    if (!userscore) {
      userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, rank: '', title: '', level: 0 }
    }
    const helpmessage = new Discord.RichEmbed()
      .setColor('#FF0000')
      .setTitle('Level Chart')
      .setDescription(`Name: ${args[0]}`)
      .addField('Rang:', `-${userscore.rank}`, inline=true) // eslint-disable-line
      .addField('Level:', `-${userscore.level}`)
      .addField('Titel:', `-${userscore.title}`)
      .setTimestamp()
      .setFooter(message.member.displayName, message.author.avatarURL)
    message.channel.send(helpmessage).catch(console.error)
      .then(msg => {
        msg.delete(10000)
      })
  },
}
