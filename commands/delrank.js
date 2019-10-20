module.exports = {
  name: 'delrank',
  aliases: [''],
  usage: '<@User>',
  description: 'Delete Rank',
  adminOnly: true,
  guildOnly: true,
  args: true,
  cooldown: 5,
  execute(message, args) {
    const user = message.mentions.users.first() || message.client.users.get(args[0])
    const guilduser = message.guild.member(message.mentions.users.first() || message.client.users.get(args[0]))
    if(!user) return message.reply('Sie müssen jemanden erwähnen oder seine ID angeben!')
      .then(msg => {
        msg.delete(5000)
      })

    let userscore = message.client.getScore.get(user.id, message.guild.id)
    if (!userscore) {
      userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, rank: '', specificrank: '', level: 0 }
    }

    if (userscore.rank !== ''){
      guilduser.removeRole(message.member.guild.roles.find(role => role.name === 'Mensch'))
      guilduser.removeRole(message.member.guild.roles.find(role => role.name === 'Engel'))
      guilduser.removeRole(message.member.guild.roles.find(role => role.name === 'Dämon'))
      guilduser.removeRole(message.member.guild.roles.find(role => role.name === 'Erd-Portal'))
      guilduser.removeRole(message.member.guild.roles.find(role => role.name === 'Himmel-Portal'))
      guilduser.removeRole(message.member.guild.roles.find(role => role.name === 'Höllen-Portal'))
      guilduser.addRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
      userscore.rank = ''
      message.channel.send('Dein Rang ist jetzt Leer')
        .then(msg => {
          msg.delete(5000)
        })
    } else {
      message.channel.send('Dein Rang ist schon Leer')
        .then(msg => {
          msg.delete(5000)
        })
    }
    message.client.setScore.run(userscore)
  },
}
