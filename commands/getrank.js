const Discord = require('discord.js')
const SQLite = require('better-sqlite3')
const sql = new SQLite('./rpg.sqlite')

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
      userscore = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, rank: '', specificrank: '', level: 0 }
    }

    const rankCounts = new Discord.Collection()

    if (userscore.rank === ''){
      const ranklist = sql.prepare('SELECT rank FROM scores;')

      for (const {rank} of ranklist.iterate()) {
        if (!rankCounts.has(rank)) {
          rankCounts.set(rank, 0)
        }
        rankCounts.set(rank, rankCounts.get(rank) + 1)
      }

      console.log(rankCounts)

      let humans = rankCounts.get('Mensch')
      let angels = rankCounts.get('Engel')
      let demons = rankCounts.get('Dämon')
      if (humans == null) {humans = 0}
      if (angels == null) {angels = 0}
      if (demons == null) {demons = 0}
      let totalranks = humans + angels + demons
      let temp
      let chancehumans = Math.round(humans/totalranks*100)
      let chanceangels = Math.round(angels/totalranks*100)
      let chancedemons = Math.round(demons/totalranks*100)
      let randNum = Math.round(Math.random()*100)

      console.log(randNum)
      console.log(`Humans: ${humans} and Angels: ${angels} and Demons: ${demons}`)

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
      }

      if(chancehumans > chanceangels && chancehumans > chancedemons){
        temp = chancehumans
        if(chanceangels > chancedemons){
          chancehumans = chancedemons
          chancedemons = temp
        } else {
          chancehumans = chanceangels
          chanceangels = temp
        }
      } else if(chanceangels > chancehumans && chanceangels > chancedemons){
        temp = chanceangels
        if(chancehumans > chancedemons){
          chanceangels = chancedemons
          chancedemons = temp
        } else {
          chanceangels = chancehumans
          chancehumans = temp
        }
      } else {
        temp = chancedemons
        if(chancedemons > chancehumans){
          chanceangels = chancehumans
          chancehumans = temp
        } else {
          chancedemons = chanceangels
          chanceangels = temp
        }
      }
      if (randNum < chancehumans) {
        userscore.rank = 'Mensch'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Mensch'))
        userscore.level = 1
      } else if (randNum < chancehumans + chanceangels) {
        userscore.rank = 'Engel'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Engel'))
        userscore.level = 1
      } else if (randNum > chancehumans + chanceangels) {
        userscore.rank = 'Dämon'
        message.member.removeRole(message.member.guild.roles.find(role => role.name === 'Neue Seele'))
        message.member.addRole(message.member.guild.roles.find(role => role.name === 'Dämon'))
        userscore.level = 1
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
