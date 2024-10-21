
const sendReqToDB = require("../modules/tlg_to_DB")
const { menuItems } = require('../data/consts')

module.exports.saveLanguage = async function (bot, msg, menuItem, selectedByUser) {
  try {
    let txtLanguage = 'pl'
    switch (menuItem) {
      case '0_7':
        txtLanguage = 'en'
        break
      case '0_8':
        txtLanguage = 'de'
        break
      case '0_9':
        txtLanguage = 'uk'
        break
      default:
        break
    }
    let selectedByUser_ = { ...selectedByUser, language: txtLanguage, id: msg.chat.id, name: msg.chat.username + '---' + msg.chat.first_name + ' ' + msg.chat.last_name }
    const signUpResult = await sendReqToDB('___UserRegistration__', selectedByUser_, msg.chat.id)
    console.log('The signUpResult:', signUpResult)
    return selectedByUser_
  } catch (err) {
    console.log(err)
    return selectedByUser
  }
}

module.exports.getProducts = async function (lang) {
  try {
    const menuItems_ = menuItems[lang]
    return menuItems_
  } catch (err) {
    console.log(err)
    return []
  }
}