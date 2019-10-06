exports.run = (client, message, args) => {
  if (args[0] === 'help') {
    // do help stuff
    message.channel.send('```Help Message```')
    return
  }
  const timeThen = Date.now()

  message.channel.send('_Measuring..._').then(msg => {
    const latency = Date.now() - timeThen
    msg.edit(`Ping is ${latency}ms`)
  })
}

/*
message.channel.send(`The ping is ${Math.floor((Math.random() * 1000) + 1)}ms`)
message.channel.send(":clock1: pong!").catch(console.error);
return
*/