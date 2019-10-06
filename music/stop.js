exports.run = async (client, message) => {
  message.member.voiceChannel.leave()
}
