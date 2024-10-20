const { buttonsConfig } = require('../modules/keyboard')
const { globalBuffer } = require('../globalBuffer')

module.exports.reports = async function (bot, msg) {
  const checkChoices = await checkSelectedGroupsAndPeriod(bot, msg, false)
  const chatId = msg.chat.id
  let title = '📊'
  if (!globalBuffer[chatId]?.selectedGroups && !globalBuffer[chatId]?.selectedPeriod) title = buttonsConfig.chooseReportSettings.title
  if (checkChoices) title = '📊'
  await bot.sendMessage(msg.chat.id, title, {
    reply_markup: {
      keyboard: buttonsConfig.chooseReportSettings.buttons,
      resize_keyboard: true
    }
  })
}

module.exports.everyDayOrWeek = async function (bot, msg) {
  await bot.sendMessage(msg.chat.id, buttonsConfig.choiceTypeOfPeriodInReport.title, {
    reply_markup: {
      keyboard: buttonsConfig.choiceTypeOfPeriodInReport.buttons,
      resize_keyboard: true
    }
  })
}


module.exports.getReport = async function (bot, msg) {

  const checkChoices = await checkSelectedGroupsAndPeriod(bot, msg, true)
  if (checkChoices) {
    await createReport(bot, msg)
    globalBuffer[msg.chat.id] = {}
  }
}

module.exports.getNetReport = async function (bot, msg, dayOrWeek = 'day') {

  if (globalBuffer[msg.chat.id]?.selectedPeriod === undefined) {
    await bot.sendMessage(msg.chat.id, 'Ви не обрали період')
    return
  }
  await createNetReport(bot, msg, dayOrWeek)
  globalBuffer[msg.chat.id] = {}
}

async function checkSelectedGroupsAndPeriod(bot, msg, isMessage) {
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