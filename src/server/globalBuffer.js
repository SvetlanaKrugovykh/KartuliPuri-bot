require('dotenv').config()
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
console.log(TELEGRAM_BOT_TOKEN.substring(0, 5))

const TelegramBot = require('node-telegram-bot-api')

const globalBuffer = {}
const selectedByUser = {}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

module.exports = { bot, globalBuffer, selectedByUser }