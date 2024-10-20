const { buttonsConfig } = require('../modules/keyboard')
const { globalBuffer } = require('../globalBuffer')
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

module.exports.messageCreateScene = async function (bot, msg) {
  try {
    if (globalBuffer[msg.chat.id]?.selectedCustomers === undefined) {
      await bot.sendMessage(msg.chat.id, 'Для можливості відправки повідомлення оберіть отримувача/ів')
      return false
    }
    await bot.sendMessage(msg.chat.id, buttonsConfig["messageCreate"].title, {
      reply_markup: {
        keyboard: buttonsConfig["messageCreate"].buttons,
        resize_keyboard: true,
        one_time_keyboard: false
      }
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports.messageSender = async function (bot, msg, selectedByUser) {
  try {
    const chatId = msg.chat.id
    const selectedSubdivisions = globalBuffer[chatId]?.selectedSubdivisions
    const modifiedSubdivisions = selectedSubdivisions.map(subdivision => subdivision.replace('63_', ''))

    if (globalBuffer[chatId]?.selectedCustomers === undefined
      || globalBuffer[chatId]?.selectedCustomers.length === 0) {
      if (Array.isArray(selectedSubdivisions) && selectedSubdivisions.length > 0) {
        let combinedData = await getCombinedData(chatId, modifiedSubdivisions, selectedSubdivisions, 'finalize')
        if (!Array.isArray(combinedData) || combinedData.length === 0) {
          await bot.sendMessage(chatId, 'Користувачів не знайдено')
          return
        }
        for (const subDivCustomer of combinedData) {
          globalBuffer[chatId]?.selectedCustomers.push(`73_${subDivCustomer.id}`)
        }
      } else {
        await bot.sendMessage(chatId, 'Для можливості відправки повідомлення оберіть отримувача/ів')
        return false
      }
    }
    globalBuffer[chatId].selectedCustomers = [...new Set(globalBuffer[chatId].selectedCustomers)]

    if (!selectedByUser?.OrderBody || selectedByUser?.OrderBody.includes('🔵 Ввести текст відправлення')) {
      await bot.sendMessage(chatId, 'Не заповнен текст відправлення. Операцію скасовано\n', { parse_mode: 'HTML' })
      return false
    }

    const dirPath = process.env.DOWNLOAD_APP_PATH
    globalBuffer[chatId].msgSent = false

    for (const selectedCustomer of globalBuffer[chatId].selectedCustomers) {
      const user = await findUserById(Number(selectedCustomer.replace('73_', '')))
      console.log(user)
      if (user && Number(user.login) > 0) {
        await bot.sendMessage(user.login, selectedByUser?.OrderBody || '🔵 Відправлення:', { parse_mode: 'HTML' })
        if (Array.isArray(selectedByUser?.OrderAttachmentFileNames)) {
          for (const attachmentFileName of selectedByUser.OrderAttachmentFileNames) {
            const fileFullName = `${dirPath}${attachmentFileName}`
            await bot.sendDocument(user.login, fileFullName, { filename: attachmentFileName, caption: attachmentFileName })
          }
        }
      } else {
        await bot.sendMessage(chatId, `Користувача з  ${user?.login} не зареєстровано в системі. Повідомлення не відправлене`)
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    if (Array.isArray(selectedByUser?.OrderAttachmentFileNames)) {
      for (const attachmentFileName of selectedByUser.OrderAttachmentFileNames) {
        const fileFullName = `${dirPath}${attachmentFileName}`
        fs.unlinkSync(fileFullName)
      }
    }

    await bot.sendMessage(chatId, 'Повідомлення відправлено', { parse_mode: 'HTML' })
    globalBuffer[chatId].selectedCustomers = []
    globalBuffer[chatId].selectedSubdivisions = []
    globalBuffer[chatId].OrderAttachmentFileNames = []
    globalBuffer[chatId].msgSent = true

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