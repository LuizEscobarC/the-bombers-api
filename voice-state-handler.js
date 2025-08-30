// voice-state-handler.js
import { DiscordConfig } from './discord-config.js';

export class VoiceStateHandler {
  constructor(client) {
    this.client = client;
  }

  async handle(oldState, newState) {
    if ([DiscordConfig.TARGET_VOICE_CHANNEL_ID, DiscordConfig.DEEP_WORK_VOICE_CHANNEL_ID, DiscordConfig.FOCUSING_VOICE_CHANNEL_ID, DiscordConfig.ESTUDY_VOICE_CHANNEL_ID].includes(newState.channelId)) {
      const member = newState.member;
      const presence = member.presence;
      const generalChannel = this.client.channels.cache.get(DiscordConfig.GENERAL_CHAT_CHANNEL_ID);

      if (!presence || presence.status === 'offline') {
        if (generalChannel) {
          await generalChannel.send(`👻 <@${member.user.id}> está invisível, não dá pra saber se está jogando!`);
        }
        return;
      }

      let isPlayingGame = false;
      if ([DiscordConfig.BACKGUY_CHAT_ID, DiscordConfig.BACKGUY_CHAT_ID_2, DiscordConfig.DAUZAKER_CHAT_ID].includes(member.user.id)) {
        isPlayingGame = true;
      } else {
        isPlayingGame = presence.activities.some(activity => activity.type === 0);
      }

      if (isPlayingGame) {
        try {
          await newState.setChannel(DiscordConfig.DESTINATION_VOICE_CHANNEL_ID);
          if ([DiscordConfig.BACKGUY_CHAT_ID, DiscordConfig.BACKGUY_CHAT_ID_2, DiscordConfig.DAUZAKER_CHAT_ID].includes(member.user.id)) {
            await generalChannel.send(`🎮 <@${member.user.id}> foi desconectado do canal de voz pq o tio MALETA quis.`);
            await generalChannel.send(`https://tenor.com/view/shocked-ishowspeed-gif-1290931606264393136`);
            await generalChannel.send({
              embeds: [
                {
                  image: {
                    url: 'https://images-ext-1.discordapp.net/external/q-tNDnxZCMTP3RiV6D6lub3Ecu2SWQ7ns43nUJ_6kDo/https/media.tenor.com/ODcA3RsuMQgAAAPo/monkey-selfie.mp4'
                  }
                }
              ]
            });
            return;
          }
          const gameActivity = presence.activities.find(activity => activity.type === 0);
          const gameName = gameActivity ? gameActivity.name : 'um jogo';
          if (generalChannel) {
            await generalChannel.send(`🎮 <@${member.user.id}> foi desconectado do canal de voz por estar jogando **${gameName}**.`);
          }
        } catch (err) {
          console.error('Erro ao mover o usuário:', err);
        }
      }
    }
  }
}
