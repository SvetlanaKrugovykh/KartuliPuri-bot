const { buttonsConfig } = require('../modules/keyboard')
const { globalBuffer } = require('../globalBuffer')
const { menuItems } = require('../data/consts')
const fs = require('fs')
require('dotenv').config()

module.exports.msgSenderMenu = async function (bot, msg) {
  const checkChoices = await checkSelectedPeoplesAndSubdivisions(bot, msg, false)
  const chatId = msg.chat.id
  let title = '📧'
  if (!globalBuffer[chatId]?.selectedGroups && !globalBuffer[chatId]?.selectedPeriod) title = buttonsConfig.chooseSenMessageSettings.title
  if (checkChoices) title = '📧'
  await bot.sendMessage(msg.chat.id, title, {
    reply_markup: {
      keyboard: buttonsConfig.chooseSenMessageSettings.buttons,
      resize_keyboard: true
    }
  })
}

module.exports.sendAcceptedOrder = async function (bot, msg, lang = "en") {
  try {
    if (globalBuffer[msg.chat.id]?.selectedProducts === undefined) {
      await bot.sendMessage(msg.chat.id, texts[lang]['0_13'])
      return false
    }
    const GROUP_ID = process.env.GROUP_ID
    const selectedProducts = globalBuffer[msg.chat.id]?.selectedProducts
    if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) {
      await bot.sendMessage(msg.chat.id, texts[lang]['0_9'])
      return
    }
    const products = selectedProducts
      .map(productId => `<b>${menuItems[lang][productId].description}</b>`)
      .join('\n')

    await bot.sendMessage(GROUP_ID, `Order from ${msg.chat.id}:\n${products}`, { parse_mode: "HTML" })

  } catch (err) {
    console.log(err)
  }
}

module.exports.msgSend = async function (bot, msg) {

  const checkChoices = await checkSelectedGroupsAndPeriod(bot, msg, true)
  if (checkChoices) {
    await createReport(bot, msg)
    globalBuffer[msg.chat.id] = {}
  }
}

async function checkSelectedPeoplesAndSubdivisions(bot, msg, isMessage) {
  const chatId = msg.chat.id
  let result = true
  try {
    console.log(`2_selectedGroups for  ${chatId} is ${globalBuffer[chatId]?.selectedGroups}`)
    if (!globalBuffer[chatId]?.selectedGroups || globalBuffer[chatId]?.selectedGroups?.length === 0) {
      if (isMessage) await bot.sendMessage(chatId, 'Ви не обрали жодної групи')
      result = false
    }

    if (globalBuffer[chatId]?.selectedPeriod === undefined) {
      if (isMessage) await bot.sendMessage(chatId, 'Ви не обрали період')
      result = false
    }
    return result
  } catch (e) {
    console.log(e)
    return false
  }
}