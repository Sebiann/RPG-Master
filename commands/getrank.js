const Discord = require('discord.js')
const SQLite = require('better-sqlite3')
const sql = new SQLite('./ranks.sqlite')

module.exports = {
  name: 'getrank',
  aliases: [''],
  usage: '',
  description: 'Hol dir Einen Rang',
  guildOnly: true,
  args: false,
  cooldown: 5,
  execute(message) {
    let userscore = message.client.getScore.get(message.author.id, message.guild.id)
    if (!userscore) {
      userscore = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, rank: '', title: '', level: 0 }
    }

    const rankCounts = new Discord.Collection()

    if (userscore.rank === ''){
      const ranklist = sql.prepare('SELECT rank FROM scores;')

      for (const rlist of ranklist.iterate()) {
        if (!rankCounts.has(rlist)) {
          rankCounts.set(rlist, 0)
        }
        rankCounts.set(rlist, rankCounts.get(rlist) + 1)
      }

      console.log(rankCounts)
      /* Need to Fix:
      let humans = rankCounts.get('Mensch')
      let angels = rankCounts.get('Engel')
      let demons = rankCounts.get('Dämon')
      */

      let humans = 33
      let angels = 66
      let demons = 99
      console.log(`Humans: ${humans} and Angels: ${angels} and Demons: ${demons}`)

      let randNum = Math.round(Math.random()*99)
      console.log(randNum)

      if (humans === 0) {
        userscore.rank = 'Mensch'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Mensch'))
      } else if (angels === 0) {
        userscore.rank = 'Engel'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Engel'))
      } else if (demons === 0) {
        userscore.rank = 'Dämon'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Dämon'))
      } else if (randNum > 0 && randNum <= 33) {
        userscore.rank = 'Mensch'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Mensch'))
      } else if (randNum > 33 && randNum <= 66) {
        userscore.rank = 'Engel'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Engel'))
      } else if (randNum > 66 && randNum <= 99) {
        userscore.rank = 'Dämon'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Dämon'))
      } else {
        userscore.rank = 'Mensch'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Mensch'))
      }

      message.channel.send(`Dein Rang ist: ${userscore.rank}`)
        .then(msg => {
          msg.delete(5000)
        })
    } else {
      message.channel.send('Du hast schon ein Rang')
        .then(msg => {
          msg.delete(5000)
        })
    }
    message.client.setScore.run(userscore)
  },
}
