module.exports = {
  name: 'ping',
  aliases: [''],
  usage: '',
  description: 'Display Ping',
  guildOnly: false,
  args: false,
  cooldown: 10,
  execute(message) {
    const timeThen = Date.now()
    message.channel.send('_Messen..._').then(msg => {
      const latency = Date.now() - timeThen
      msg.edit(`Ping ist ${latency}ms`)
      .then(msg => {
        msg.delete(5000)
      })
    })
  },
};
