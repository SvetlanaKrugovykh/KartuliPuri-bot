const Fastify = require('fastify')
require('dotenv').config()
const { handler } = require('./controllers/switcher')
const { commonStartMenu } = require('./modules/common_menu')
const { isThisGroupId } = require('./modules/bot')
const { bot, globalBuffer } = require('./globalBuffer')

const app = Fastify({
  trustProxy: true
})


bot.on('callback_query', async (callbackQuery) => {
  try {
    const chatId = callbackQuery.message.chat.id
    if (globalBuffer[chatId] === undefined) globalBuffer[chatId] = {}
    return
  }
  catch (e) {
    console.log(e)
  }
})


bot.on('message', async (msg) => {

  const chatId = msg.chat.id
  const text = msg.text
  if (await isThisGroupId(bot, chatId, msg)) return

  if (text === '/start') {
    await commonStartMenu(bot, msg)
  } else {
    await handler(bot, msg, undefined)
  }
})

module.exports = { app, bot }
