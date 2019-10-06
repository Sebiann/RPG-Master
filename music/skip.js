exports.run = async (client, message) => {
  let dispatcher = client.voiceDispatchers.get(message.channel.guild.id)
  // console.log(dispatcher)
  dispatcher.end('Skip')
}
