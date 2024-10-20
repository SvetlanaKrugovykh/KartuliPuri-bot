const { inputLineScene } = require('../controllers/inputLine')
const { clientAdminMenuStarter } = require('../controllers/clientsAdmin')
require('dotenv').config()
const { buttonsConfig } = require('./keyboard')
const sendReqToDB = require('../modules/tlg_to_DB')
const { users } = require('../users/users.model')
const path = require('path')
const { globalBuffer, selectedByUser } = require('../globalBuffer')

module.exports.commonStartMenu = async function (bot, msg) {
  console.log(`/start at ${new Date()} tg_user_id: ${msg.chat.id}`)
  const adminUser = users.find(user => user.id === msg.chat.id)
  if (adminUser) {
    await clientAdminMenuStarter(bot, msg, buttonsConfig["clientAdminStarterButtons"])
  } else {
    const lang = selectedByUser[msg.chat.id]?.language || 'pl'
    await module.exports.userMenu(bot, msg, lang)
  }
}

module.exports.userMenu = async function (bot, msg, lang = "en") {
  const response = await sendReqToDB('__CheckTlgClient__', msg.chat, '')
  if (response?.includes("authorized")) {
    await module.exports.usersStarterMenu(bot, msg, lang)
  } else {
    await module.exports.guestMenu(bot, msg, lang)
  }
}

module.exports.guestMenu = async function (bot, msg, lang = "en") {
  await bot.sendMessage(msg.chat.id, `The chatbot <b>${process.env.BRAND_NAME}</b> is here to welcome you, <b>${msg.chat.first_name} ${msg.chat.last_name}</b>!`, { parse_mode: "HTML" })
  await bot.sendMessage(msg.chat.id, buttonsConfig["guestMenu"].title[lang], {
    reply_markup: {
      keyboard: buttonsConfig["guestMenu"].buttons[lang],
      resize_keyboard: true
    }
  })
}

module.exports.guestChooseLanguageMenu = async function (bot, msg, lang = "en") {
  await bot.sendMessage(msg.chat.id, buttonsConfig["guestChooseLanguage"].title[lang], {
    reply_markup: {
      keyboard: buttonsConfig["guestChooseLanguage"].buttons[lang],
      resize_keyboard: true
    }
  })
}

module.exports.usersStarterMenu = async function (bot, msg, lang = "en") {
  await bot.sendMessage(msg.chat.id, buttonsConfig["usersStarterMenu"].title[lang], {
    reply_markup: {
      keyboard: buttonsConfig["usersStarterMenu"].buttons[lang],
      resize_keyboard: true
    }
  })
}

module.exports.supportScene = async function (bot, msg, isAuthorized) {
  const GROUP_ID = process.env.GROUP_ID
  try {
    const chatId = msg.chat.id
    await bot.sendMessage(chatId, "<i>Leave a text message below .\n</i>", { parse_mode: "HTML" })
    let userInput = await inputLineScene(bot, msg)
    if (userInput.length < 5) {
      await bot.sendMessage(chatId, "You have not left a meaningful message. Please try again")
      return
    }
    console.log(userInput)
    await bot.sendMessage(GROUP_ID, `Appeal from ${msg.chat.first_name} ${msg.chat.last_name} id ${msg.chat.id} username ${msg.chat.username}` + `\n` + userInput, { parse_mode: "HTML" })
    await bot.sendMessage(
      chatId, `Thank you! Your message has been sent.\n Wait for a response within 30 minutes`, { parse_mode: "HTML" })

  } catch (err) {
    console.log(err)
  }
}

module.exports.downloadMenu = async function (bot, msg, lang = "en") {
  try {
    const filePath = path.join(__dirname, '../../../assets/menu', `${lang}.pdf`)
    await bot.sendDocument(msg.chat.id, filePath, {}, {
      filename: `${lang}.pdf`,
      contentType: 'application/pdf'
    })
  } catch (err) {
    console.log(err);
    await bot.sendMessage(msg.chat.id, 'Sorry, there was an error sending the file.')
  }
}








