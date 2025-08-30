// message-handler.js
import { GroupData } from './group-data.js';
import { DiscordConfig } from './discord-config.js';

export class MessageHandler {
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
