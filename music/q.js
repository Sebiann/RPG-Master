const ytdl = require('ytdl-core')

exports.run = async (client, message, args) => {

  if (!client.queues.has(message.channel.guild.id)) {    
    client.queues.set(message.channel.guild.id, [])  
  }

  if (!message.member.voiceChannel) {
    return message.channel.send('Pls, connect to a Vc first.')
  }
    
  if (args[0] === 'add') {
    let queue = client.queues.get(message.channel.guild.id)
    let validate = await ytdl.validateURL(args[1])
    if (!validate) {
      return message.channel.send('Invalid Link')
    }
    queue.push(args[1]) // validate pls
    client.queues.set(message.channel.guild.id, queue)
    console.log(client.queues.array())
    return message.channel.send(`Current queue: \n${getFormattedQueue(client.queues.get(message.channel.guild.id))}`)
  }

  if (args[0] === 'remove') {
    let deleteIndex = parseInt(args[1])
    if (!isNaN(deleteIndex)) {
      let queue = client.queues.get(message.channel.guild.id)

      if (queue[deleteIndex]) {
        queue.splice(deleteIndex, 1)
        client.queues.set(message.channel.guild.id, queue)
        return message.channel.send(`${deleteIndex} removed from queue!`)
      }
      return message.channel.send(`${deleteIndex} does not exist in the queue you moron`)// austin was here
    }
    return message.channel.send('Send a fishing proper number you genius')
  }

  if (args[0] === 'clear') {
    client.queues.set(message.channel.guild.id, [])
    return message.channel.send('Queue has been cleared')
  }
    
  if (args[0] === 'list') {
    return message.channel.send(getFormattedQueue(client.queues.get(message.channel.guild.id)))
  }
}

function getFormattedQueue (queue) {
  if (queue.length === 0) {
    return 'Queue is empty'
  }

  let fancyQueue = '```yaml\n'
  for (let i = 0; i < queue.length; i++) {
    const element = queue[i]
    if (i === 0) {
      fancyQueue += `Playing: ${element}\n`
    } else {
      fancyQueue += `${i}: ${element}\n`
    }
  }
  fancyQueue += '```'
  return fancyQueue
}