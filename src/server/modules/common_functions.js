
const sendReqToDB = require("../modules/tlg_to_DB")

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
      default:
        break
    }
    let selectedByUser_ = { ...selectedByUser, language: txtLanguage, id: msg.chat.id, name: msg.chat.username + '---' + msg.chat.first_name + ' ' + msg.chat.last_name }
    const signUpResult = await sendReqToDB('___UserRegistration__', selectedByUser_, msg.chat.id)
    console.log('The signUpResult:', signUpResult);
    return selectedByUser_
  } catch (err) {
    console.log(err)
    return selectedByUser
  }
}

