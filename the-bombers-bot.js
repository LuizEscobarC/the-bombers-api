/**
 * The Bombers Bot
 * Architecture: SOLID, Clean Architecture, Object-Oriented, Clean Code
 * - Domain classes for data/configuration
 * - Application classes for message/voice handling
 * - Main bot orchestrator class
 * - All logic separated by responsibility
 * - Readable, maintainable, not overengineered
 * - Easy to extend and test
 */

require('dotenv').config();
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

// Domain: Group Data
class GroupData {
  static DARIUS_VARIATIONS = [
    'darius','dariuz','dariuzinho','darião','dariao','dari','dariuzin','dariuzito','dariuzinhu','dariuzinhow','dariuzinhe','dariuzinheco','dariuzinovski','dariuzovski','dariuzera','dariuzito',
    'dariuzin','dariuzinhu','dariuzinhow','dariuzinhe','dariuzinheco','dariuzinovski','dariuzovski','dariuzera','dariuzito','dariuzin','dariuzinhu','dariuzinhow','dariuzinhe','dariuzinheco','dariuzinovski','dariuzovski','dariuzera','dariuzito',
    // ... (continue with all original values as needed)
  ];
  static PAULINHO_OFFENSES = [
    'CALADO PAULINHO FAIXA BRANCA SEU INSETO! KKK','NÃO FALA NADA, PAULINHO!','VOCÊ NÃO TEM MORAL AQUI!','SILÊNCIO, PAULINHO!','NÃO ATRAPALHA, PAULINHO!','NÃO TEM VEZ, PAULINHO!','VOCÊ É UM MEME, PAULINHO!','NÃO ENCHE, PAULINHO!','NÃO TEM OPINIÃO, PAULINHO!','VOCÊ É UM ZÉ NINGUÉM!','SÓ OBSERVA, PAULINHO!','NÃO ATRAPALHA OS ADULTOS!','VOCÊ NÃO É BEM-VINDO!','NÃO TEM VEZ, INSETO!','VOCÊ É UM FIASCO!','NÃO TEM RESPEITO, PAULINHO!','VOCÊ É UM FRACASSO!','NÃO TEM CREDIBILIDADE!','VOCÊ É UM PALHAÇO!','NÃO TEM GRAÇA!','VOCÊ É UM MOLEQUE!','NÃO TEM FUTURO!','VOCÊ É UM COVARDE!','NÃO TEM NADA PRA FALAR!','VOCÊ É UM PIPOQUEIRO!','NÃO TEM ARGUMENTO!','VOCÊ É UM FALASTRÃO!','NÃO TEM BASE!','VOCÊ É UM SEM NOÇÃO!','NÃO TEM MORAL!','VOCÊ É UM SEM VERGONHA!','NÃO TEM RESPOSTA!','VOCÊ É UM SEM CLASSE!','NÃO TEM NADA PRA ACRESCENTAR!','VOCÊ É UM SEM LUZ!','NÃO TEM NADA PRA DIZER!','VOCÊ É UM SEM AMIGOS!','NÃO TEM NENHUM RESPEITO!','VOCÊ É UM SEM CARISMA!','NÃO TEM NENHUM VALOR!','VOCÊ É UM SEM PERSONALIDADE!','NÃO TEM NENHUM TALENTO!','VOCÊ É UM SEM GRAÇA!','NÃO TEM NENHUMA IMPORTÂNCIA!','VOCÊ É UM SEM DIGNIDADE!','NÃO TEM NENHUM SENTIDO!','VOCÊ É UM SEM NOÇÃO!','NÃO TEM NENHUM PESO!','VOCÊ É UM SEM PALAVRA!','NÃO TEM NENHUM DESTINO!','VOCÊ É UM SEM RUMO!','NÃO TEM NENHUM OBJETIVO!','VOCÊ É UM SEM PROPÓSITO!','NÃO TEM NENHUM FOCO!','VOCÊ É UM SEM FOCO!','NÃO TEM NENHUM DESTINO!','VOCÊ É UM SEM DIREÇÃO!','NÃO TEM NENHUM LUGAR!','VOCÊ É UM SEM LUGAR!','NÃO TEM NENHUM AMIGO!','VOCÊ É UM SEM AMIGOS!','NÃO TEM NENHUM RESPEITO!','VOCÊ É UM SEM RESPEITO!','NÃO TEM NENHUM AMOR!','VOCÊ É UM SEM AMOR!','NÃO TEM NENHUM SUCESSO!','VOCÊ É UM SEM SUCESSO!','NÃO TEM NENHUM FUTURO!','VOCÊ É UM SEM FUTURO!','NÃO TEM NENHUM DESTINO!','VOCÊ É UM SEM DESTINO!','NÃO TEM NENHUM OBJETIVO!','VOCÊ É UM SEM OBJETIVO!','NÃO TEM NENHUM FOCO!','VOCÊ É UM SEM FOCO!','NÃO TEM NENHUM TALENTO!','VOCÊ É UM SEM TALENTO!','NÃO TEM NENHUMA GRAÇA!','VOCÊ É UM SEM GRAÇA!','NÃO TEM NENHUMA MORAL!','VOCÊ É UM SEM MORAL!','NÃO TEM NENHUMA DIGNIDADE!','VOCÊ É UM SEM DIGNIDADE!','NÃO TEM NENHUMA PERSONALIDADE!','VOCÊ É UM SEM PERSONALIDADE!','NÃO TEM NENHUMA CLASSE!','VOCÊ É UM SEM CLASSE!','NÃO TEM NENHUMA IMPORTÂNCIA!','VOCÊ É UM SEM IMPORTÂNCIA!','NÃO TEM NENHUM PESO!','VOCÊ É UM SEM PESO!','NÃO TEM NENHUM SENTIDO!','VOCÊ É UM SEM SENTIDO!'
    // ... (continue with all original values as needed)
  ];
}

// Domain: Channel and Role IDs
class DiscordConfig {
  static PAULINHO_ID = '1245378178399342642';
  static ROLE_ID_TO_GIVE_CORO_DE_PALHA = '766359258765590559';
  static GENERAL_CHAT_CHANNEL_ID = '1400934141112881315';
  static TARGET_VOICE_CHANNEL_ID = '1397960251088834650';
  static DEEP_WORK_VOICE_CHANNEL_ID = '1397959860280099006';
  static FOCUSING_VOICE_CHANNEL_ID = '1397960014143950848';
  static DESTINATION_VOICE_CHANNEL_ID = '759128055763042304';
  static ESTUDY_VOICE_CHANNEL_ID = '1399807973399728208';
  static BACKGUY_CHAT_ID = '1027295888349s0732570';
  static BACKGUY_CHAT_ID_2 = '1245378178399342642';
  static DAUZAKER_CHAT_ID = '1381818366882s8509494';
}

// Application: Message Handler
class MessageHandler {
  constructor(client) {
    this.client = client;
  }

  async handle(message) {
    if (this.isPaulinhoOffense(message)) {
      const offense = this.getRandom(GroupData.PAULINHO_OFFENSES);
      return await message.channel.send(offense);
    }

    if (this.isDariusMention(message)) {
      try {
        return await message.reply('🚀 EITA BOMBER!🚀');
      } catch (error) {
        console.error('Erro ao responder:', error);
        return await message.reply('🌌 ERRO CÓSMICO! O ZÓRBER travou na dimensão paralela! 🛸💥');
      }
    }

    if (!message.guild || message.author.bot) return;
    if (!message.member.permissions.has('Administrator')) return;

    await this.handleRoleCommands(message);
  }

  isPaulinhoOffense(message) {
    return message.author.id === DiscordConfig.PAULINHO_ID &&
      message.guild &&
      message.channel.id === DiscordConfig.GENERAL_CHAT_CHANNEL_ID;
  }

  isDariusMention(message) {
    return (message.mentions.has(this.client.user) && !message.author.bot) ||
      (message.content && GroupData.DARIUS_VARIATIONS.some(variation => message.content.toLowerCase().includes(variation)));
  }

  async handleRoleCommands(message) {
    const guild = message.guild;
    const role = guild.roles.cache.get(DiscordConfig.ROLE_ID_TO_GIVE_CORO_DE_PALHA);
    if (!role) {
      await message.reply('Cargo não encontrado!');
      return;
    }
    await guild.members.fetch();
    let mentions = [];
    let count = 0;
    const generalChannel = this.client.channels.cache.get(DiscordConfig.GENERAL_CHAT_CHANNEL_ID);

    if (message.content === '!darCargo') {
      for (const member of guild.members.cache.values()) {
        if (!member.roles.cache.has(DiscordConfig.ROLE_ID_TO_GIVE_CORO_DE_PALHA) && !member.user.bot) {
          try {
            await member.roles.add(role);
            mentions.push(`<@${member.user.id}>`);
            count++;
          } catch (e) {
            console.error(`Erro ao adicionar cargo para ${member.user.tag}:`, e);
          }
        }
      }
      await message.reply(`Cargo adicionado para ${count} membros que não tinham!`);
      if (mentions.length > 0 && generalChannel) {
        const chunkSize = 20;
        for (let i = 0; i < mentions.length; i += chunkSize) {
          const chunk = mentions.slice(i, i + chunkSize);
          await generalChannel.send(`Cargo ${role.name} adicionado para: ${chunk.join(', ')}`);
        }
      }
    }

    if (message.content === '!removerCargo') {
      for (const member of guild.members.cache.values()) {
        if (member.roles.cache.has(DiscordConfig.ROLE_ID_TO_GIVE_CORO_DE_PALHA) && !member.user.bot) {
          try {
            await member.roles.remove(role);
            mentions.push(`<@${member.user.id}>`);
            count++;
          } catch (e) {
            console.error(`Erro ao remover cargo para ${member.user.tag}:`, e);
          }
        }
      }
      await message.reply(`Cargo removido de ${count} membros que tinham!`);
      if (mentions.length > 0 && generalChannel) {
        const chunkSize = 20;
        for (let i = 0; i < mentions.length; i += chunkSize) {
          const chunk = mentions.slice(i, i + chunkSize);
          await generalChannel.send(`Cargo ${role.name} removido de: ${chunk.join(', ')}`);
        }
      }
    }
  }

  getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

// Application: Voice State Handler
class VoiceStateHandler {
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

// Main Bot Application
class BombersBot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    });
    this.messageHandler = new MessageHandler(this.client);
    this.voiceStateHandler = new VoiceStateHandler(this.client);
    this.registerEvents();
  }

  registerEvents() {
    this.client.on('messageCreate', async (message) => {
      await this.messageHandler.handle(message);
    });

    this.client.on('voiceStateUpdate', async (oldState, newState) => {
      await this.voiceStateHandler.handle(oldState, newState);
    });
  }

  start() {
    this.client.login(process.env.DISCORD_TOKEN);
  }
}

// Start the bot
const bot = new BombersBot();
bot.start();
