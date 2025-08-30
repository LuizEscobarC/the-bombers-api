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

import dotenv from 'dotenv';
import axios from 'axios';
import { Client, GatewayIntentBits } from 'discord.js';
import { MessageHandler } from './message-handler.js';
import { VoiceStateHandler } from './voice-state-handler.js';

dotenv.config();

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
