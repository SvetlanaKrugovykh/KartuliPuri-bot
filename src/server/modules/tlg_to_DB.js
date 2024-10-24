const axios = require(`axios`)
const URL = process.env.URL
const AUTH_TOKEN = process.env.AUTH_TOKEN

module.exports.sendReqToDB = async function (reqType, data, text) {

  let dataString = objToString(reqType, data, text)
  console.log(dataString)

  try {
    const response = await axios({
      method: 'post',
      url: URL,
      responseType: 'string',
      headers: {
        Authorization: `${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: {
        Query: `Execute;${reqType};${dataString};End`,
      }
    })
    if (!response.status == 200) {
      console.log(response.status)
      return null
    } else {
      let answer = response.data.toString()
      console.log(answer.slice(0, 125) + '...')
      return answer
    }

  } catch (err) {
    console.log(err)
    return null
  }
}

function objToString(reqType, data, text) {
  switch (reqType) {
    case '__CheckTlgClient__':
    case '___UserRegistration__':
      return `${text}#${data?.name || ''}#${data?.language || ''}`
    case '___CreateOrder__':
      return `${text}#${JSON.stringify(data)}#${data?.language || ''}`
    default:
      return `${data.id || ''}#${text}`
  }
}

module.exports.sendOrderToDB = async (chatId, selectedProducts, selectedTime, lang) => {
  try {
    const data = {
      chatId: chatId,
      selectedProducts: selectedProducts,
      selectedTime: selectedTime,
      language: lang
    }
    const response = await module.exports.sendReqToDB('___CreateOrder__', data, chatId)
    console.log(response)
    return response
  } catch (e) {
    console.log(e)
  }
}

