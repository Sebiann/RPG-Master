module.exports = {
  name: 'remlevel',
  aliases: ['remlvl', 'remlv'],
  usage: '<@User> <Number>',
  description: 'Remove Levels',
  guildOnly: true,
  args: true,
  cooldown: 5,
  execute(message, args) {
    const user = message.mentions.users.first() || message.client.users.get(args[1])
    if(!user) return message.reply('Sie müssen jemanden erwähnen oder seine ID angeben!')

    let userscore = message.client.getScore.get(user.id, message.guild.id)
    if (!userscore) {
      userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, rank: '', title: '', level: 0 }
    }
    if (!isNaN(args[1])){
      for (let i = 0; i < args[1]; i++) {
        userscore.level--
      }
      message.channel.send(`Neuer Level: ${userscore.level}`)
      .then(msg => {
        msg.delete(5000)
      })
    } else {
      message.channel.send('Wieviel soll ich ihn runter leveln?')
      .then(msg => {
        msg.delete(5000)
      })
    }
    message.client.setScore.run(userscore)
  },
};