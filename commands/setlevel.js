module.exports = {
  name: 'setlevel',
  aliases: ['setlvl', 'setlv'],
  usage: '<@User> <Number>',
  description: 'Set Level',
  adminOnly: true,
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
      userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, rank: '', specificrank: '', level: 0 }
    }
    if (!isNaN(args[1])){
      userscore.level = args[1]
      if (userscore.level < 0) {
        userscore.level = 0
      }
      message.channel.send(`Neuer Level: ${userscore.level}`)
        .then(msg => {
          msg.delete(5000)
        })
    } else {
      message.channel.send('Wieviel soll ich ihn leveln?')
        .then(msg => {
          msg.delete(5000)
        })
    }
    message.client.setScore.run(userscore)
  },
}
