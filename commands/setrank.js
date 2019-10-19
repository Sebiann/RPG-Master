module.exports = {
  name: 'setrank',
  aliases: [''],
  usage: '<@User> <Rang>',
  description: 'Setze den Rang',
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

    if (userscore.rank === ''){
      userscore.rank = args[1]
      message.channel.send(`Dein Rang ist jetzt ${userscore.rank}`)
        .then(msg => {
          msg.delete(5000)
        })
    } else {
      message.channel.send(`Dein Rang war ${userscore.rank}`)
        .then(msg => {
          msg.delete(5000)
        })
      userscore.rank = args[1]
      message.channel.send(`Dein Rang ist jetzt ${userscore.rank}`)
        .then(msg => {
          msg.delete(5000)
        })
    }
    message.client.setScore.run(userscore)
  },
}
