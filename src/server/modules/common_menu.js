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
  let lang_ = selectedByUser_?.language || 'pl'
  let authorized = false
  try {
    const response = await sendReqToDB('__CheckTlgClient__', selectedByUser_, msg.chat.id)
    console.log('CheckTlgClient:', response)
    authorized = response?.includes("authorized")
    const parsedResponse = JSON.parse(response)
    lang_ = parsedResponse.ResponseArray?.[0]?.language || 'pl'
  } catch (err) {
    console.log(err)
  }
  if (authorized) {
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

    const collectedMessages = []

    const handleMessage = async (message) => {
      if (message.text) {
        collectedMessages.push({ type: 'text', content: message.text })
      } else if (message.photo) {
        const fileId = message.photo[message.photo.length - 1].file_id
        collectedMessages.push({ type: 'photo', fileId })
      } else if (message.document) {
        const fileId = message.document.file_id
        collectedMessages.push({ type: 'document', fileId })
      } else if (message.audio) {
        const fileId = message.audio.file_id
        collectedMessages.push({ type: 'audio', fileId })
      } else if (message.voice) {
        const fileId = message.voice.file_id
        collectedMessages.push({ type: 'voice', fileId })
      }
    }

    bot.on('message', async (message) => {
      if (message.chat.id === chatId) {
        await handleMessage(message)
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 30000))

    for (const message of collectedMessages) {
      if (message.type === 'text') {
        await bot.sendMessage(GROUP_ID, `Message from ${msg.chat.first_name} ${msg.chat.last_name} (ID: ${msg.chat.id}):\n${message.content}`, { parse_mode: "HTML" })
      } else {
        await bot.sendMessage(GROUP_ID, `Message from ${msg.chat.first_name} ${msg.chat.last_name} (ID: ${msg.chat.id}):`, { parse_mode: "HTML" })
        if (message.type === 'photo') {
          await bot.sendPhoto(GROUP_ID, message.fileId)
        } else if (message.type === 'document') {
          await bot.sendDocument(GROUP_ID, message.fileId)
        } else if (message.type === 'audio') {
          await bot.sendAudio(GROUP_ID, message.fileId)
        } else if (message.type === 'voice') {
          await bot.sendVoice(GROUP_ID, message.fileId)
        }
      }
    }

    await bot.sendMessage(chatId, texts[lang]['0_4'], { parse_mode: "HTML" })

  } catch (err) {
    console.log(err)
    await bot.sendMessage(msg.chat.id, texts[lang]['0_5'])
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
      await bot.sendMessage(msg.chat.id, texts[lang]['0_6'])
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
    await bot.sendMessage(msg.chat.id, texts[lang]['0_5'])
  }
}




