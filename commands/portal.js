module.exports = {
  name: 'portal',
  aliases: ['tp'],
  usage: '<Ort>',
  description: 'Öffne ein Portal',
  guildOnly: true,
  args: true,
  cooldown: 5,
  execute(message, args) {
    let userscore = message.client.getScore.get(message.author.id, message.guild.id)
    if (!userscore) {
      userscore = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, rank: '', specificrank: '', level: 0 }
    }
    if (userscore.level >= 35) {
      if (args[1] === 'Erde') {
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Himmel-Portal'))
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Höllen-Portal'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Erd-Portal'))
      } else if (args[1] === 'Himmel' || userscore.rank === 'Engel') {
        if (userscore.rank === 'Mensch') {
          message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Erd-Portal'))
          message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Höllen-Portal'))
          message.member.addRole(message.member.guild.roles.find(role => role.name === 'Himmel-Portal'))
        } else {
          message.channel.send('Geht nicht')
        }
      } else if (args[1] === 'Hölle') {
        if (userscore.rank === 'Mensch' || userscore.rank === 'Dämon') {
          message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Erd-Portal'))
          message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Himmel-Portal'))
          message.member.addRole(message.member.guild.roles.find(role => role.name === 'Höllen-Portal'))
        } else {
          message.channel.send('Geht nicht')
        }
      } else {
        message.channel.send('Wähle entweder Erde, Himmel oder Hölle')
      }
    } else {
      message.channel.send('Du bist noch nicht Level 35')
    }
  },
}
