const Enmap = require('enmap')
const ytdl = require('ytdl-core')

exports.run = async (client, message, args) => {
  if (!message.member.voiceChannel) {
    return message.channel.send('Pls, connect to a Vc first.')
  }
  if (!args[0]) {
    return message.channel.send('Sry, pls input a Url following the command')
  }
  let validate = await ytdl.validateURL(args[0])
  if (!validate) {
    return message.channel.send('Invalid Link')
  }
  // let info = await ytdl.getInfo(args[0]);
  let connection = await message.member.voiceChannel.join()
  let queue = client.queues.get(message.channel.guild.id)
  if (queue === undefined) {
    queue = []
  }
  queue.push(args[0])
  client.queues.set(message.channel.guild.id, queue)
  play(client, message.channel, connection, queue[0])
}

async function play (client, textChannel, connection, song) {
  console.log(song, typeof song)
  const dispatcher = await connection.playStream(ytdl(song, { filter: 'audioonly' }))

  if (client.voiceDispatchers === undefined) {
    client.voiceDispatchers = new Enmap()
  }
  client.voiceDispatchers.set(textChannel.guild.id, dispatcher)

  textChannel.send(`Now playing: **${song}**`)
  dispatcher.on('end', async r => {
    console.log(r, ' reason thing')
    let queue = client.queues.get(textChannel.guild.id)
    queue.shift()
    if (queue[0] !== undefined) {
      console.log(`Starting next track ${queue[0]}`)
      client.queues.set(textChannel.guild.id, queue)
      play(client, textChannel, connection, queue[0])
    } else {
      textChannel.send('Queue empty')
    }
  }).on('error', err => console.error(err))
}
