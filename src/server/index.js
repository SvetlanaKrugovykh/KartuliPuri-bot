require('dotenv').config()
const { handler } = require('./controllers/switcher')
const { commonStartMenu } = require('./modules/common_menu')
const { isThisGroupId } = require('./modules/bot')
const { bot, globalBuffer, selectedByUser } = require('./globalBuffer')
const { texts } = require('./modules/keyboard')
const { menuItems } = require('./data/consts')
const { sendAcceptedOrder, sayTimePeriod } = require('./controllers/msgSenderMenu')
const { sendOrderToDB } = require('./modules/tlg_to_DB')
const { userSettings } = require('./controllers/userSettings')

bot.on('callback_query', async (callbackQuery) => {
  try {
    const chatId = callbackQuery.message.chat.id
    if (selectedByUser[chatId] === undefined) await userSettings(callbackQuery.message)
    const lang = selectedByUser[chatId]?.language || 'pl'
    if (globalBuffer[chatId] === undefined) globalBuffer[chatId] = {}
    const selectedProducts = globalBuffer[chatId].selectedProducts || []

    if (callbackQuery.data.includes('_time_')) {
      await bot.sendMessage(chatId, sayTimePeriod(callbackQuery.message.chat.id, callbackQuery.data, lang))
    }

    if (callbackQuery.data === 'send_order') {
      console.log('send_order')
      await sendAcceptedOrder(bot, callbackQuery.message, lang)
      await userSettings(callbackQuery.message, 're_read')
      if (!selectedByUser[chatId]?.authorized) await userSettings(callbackQuery.message, 'authorize', lang)
      const response = await sendOrderToDB(chatId, selectedProducts, globalBuffer[chatId].selectedTime, lang)
      await userSettings(callbackQuery.message)
      try {
        const parsedResponse = JSON.parse(response)
        const orderDetails = parsedResponse.ResponseArray[0]
        await bot.sendMessage(chatId, `${texts[lang]['0_15']} ${orderDetails.order_total} PLN`)
      } catch (e) {
        console.log(e)
      }
      globalBuffer[chatId].selectedProducts = []
      globalBuffer[chatId].selectionProductsFlag = false
      globalBuffer[chatId].selectionFlag = false
      globalBuffer[chatId].selectedTime = ''
      return
    }
    if (callbackQuery.data === 'cancel_order') {
      console.log('cancel_order')
      globalBuffer[chatId].selectedProducts = []
      globalBuffer[chatId].selectionProductsFlag = false
      globalBuffer[chatId].selectionFlag = false
      globalBuffer[chatId].selectedTime = ''
      return
    }

    if (callbackQuery.data.startsWith('73_')) {
      let title = texts[lang]['0_7']
      const selectedProduct = callbackQuery.data
      if (globalBuffer[chatId]?.selectAction === 'selection') {
        console.log('selection', selectedProduct)
        globalBuffer[chatId].selectionFlag = true
      }
      if (globalBuffer[chatId]?.selectAction === 'finalize') {
        console.log('finalize', selectedProduct)
        globalBuffer[chatId].selectionFlag = true
        globalBuffer[chatId].selectionProductsFlag = true
        title = texts[lang]['0_8']
        const index = selectedProducts.indexOf(selectedProduct);
        if (index !== -1) {
          selectedProducts.splice(index, 1)
        }
      } else {
        selectedProducts.push(selectedProduct)
      }
      globalBuffer[chatId].selectedProducts = selectedProducts
      console.log(`1_selectedProducts for  ${chatId} is ${globalBuffer[chatId]?.selectedProducts}`)
      const productName = menuItems[lang][selectedProduct].description
      await bot.sendMessage(chatId, `${title} ${productName}`)
    }
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

  if (text === '/start' || (globalBuffer[chatId] === undefined)) {
    console.log(new Date())
    console.log(msg.chat)
    await userSettings(msg)
    await commonStartMenu(bot, msg, true)
  } else {
    await userSettings(msg)
    await handler(bot, msg, undefined)
  }
})

module.exports = { bot }
