module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(process.env.PREFIX) !== 0) return
  // Our standard argument/command name definition.
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command)
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return
  // Run the command
  cmd.run(client, message, args)
}
// some stupid shit Austin added
for (let i = 0; i < 20; i++) {
  console.log(' '.repeat(Math.floor((Math.sin(i) + 10) * 5)) + '*')
}
console.log('weee, sparkles')
