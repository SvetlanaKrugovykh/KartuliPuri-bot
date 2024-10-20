const { inputLineScene } = require('../controllers/inputLine')
const { clientAdminMenuStarter } = require('../controllers/clientsAdmin')
require('dotenv').config()
const { buttonsConfig, texts } = require('./keyboard')
const sendReqToDB = require('../modules/tlg_to_DB')
const { users } = require('../users/users.model')
const path = require('path')
const { selectedByUser } = require('../globalBuffer')
const { getProducts } = require('./common_functions')
const geo = require('./geo')


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
  let selectedByUser_ = { ...selectedByUser, language: lang, id: msg.chat.id, name: msg.chat.username + '---' + msg.chat.first_name + ' ' + msg.chat.last_name }
  const response = await sendReqToDB('__CheckTlgClient__', selectedByUser_, msg.chat.id)
  const parsedResponse = JSON.parse(response)
  const lang_ = parsedResponse.ResponseArray?.[0]?.language || 'pl'
  console.log('CheckTlgClient:', response)
  if (response?.includes("authorized")) {
    await module.exports.usersStarterMenu(bot, msg, lang_)
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

module.exports.supportScene = async function (bot, msg) {
  const GROUP_ID = process.env.GROUP_ID
  const lang = selectedByUser[msg.chat.id]?.language || 'pl'
  try {
    const chatId = msg.chat.id
    await bot.sendMessage(chatId, `<i>${texts[lang]['0_2']}\n</i>`, { parse_mode: "HTML" })
    let userInput = await inputLineScene(bot, msg)
    if (userInput.length < 5) {
      await bot.sendMessage(chatId, texts[lang]['0_3'])
      return
    }
    console.log(userInput)
    await bot.sendMessage(GROUP_ID, `Appeal from ${msg.chat.first_name} ${msg.chat.last_name} id ${msg.chat.id} username ${msg.chat.username}` + `\n` + userInput, { parse_mode: "HTML" })
    await bot.sendMessage(chatId, texts[lang]['0_4'], { parse_mode: "HTML" })

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
    console.log(err)
    await bot.sendMessage(msg.chat.id, texts[lang]['0_1'])
  }
}

module.exports.selectProducts = async function (bot, msg, lang = "en") {
  try {
    const cafeLocation = await geo.getCafeLocation()
    const clientLocation = await geo.requestLocation(bot, msg)
    const isWithinRange = await geo.checkDistance(cafeLocation, clientLocation)

    if (!isWithinRange) {
      await bot.sendMessage(msg.chat.id, 'Sorry, you are too far from our café to place an order.')
      return
    }

    const data = await getProducts(lang)

    const productsButtons = {
      title: buttonsConfig["usersStarterMenu"].title[lang],
      options: [{ resize_keyboard: true }],
      buttons: Object.values(data).map(product => [
        { text: `🤽🏿‍♂️ ${product.description}`, callback_data: `73_${product.id}` }
      ])
    }

    await bot.sendMessage(msg.chat.id, productsButtons.title, {
      reply_markup: {
        inline_keyboard: productsButtons.buttons,
        resize_keyboard: true
      }
    })
  } catch (error) {
    console.log(error)
    await bot.sendMessage(msg.chat.id, 'There was an error processing your request.')
  }
}




