const axios = require(`axios`)
const URL = process.env.URL
const AUTH_TOKEN = process.env.AUTH_TOKEN

async function sendReqToDB(reqType, data, text) {

  let dataString = objToString(reqType, data, text)
  console.log(dataString);

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
    });
    if (!response.status == 200) {
      console.log(response.status)
      return null
    } else {
      if (reqType === '__GetClientPersData__' || reqType === '__GetDeadIP__') {
        return response.data
      } else {
        let answer = response.data.toString()
        console.log(answer.slice(0, 125) + '...')
        return answer;
      }
    }

  } catch (err) {
    console.log(err)
    return null
  }
}

function objToString(reqType, data, text) {

  switch (reqType) {
    case '__CheckTlgClient__':
      return (data.id + '#' + data.name)
    case '___UserRegistration__':
      return (text + '#' + data?.name + '#' + data?.language)
    case '___GetTgUserData__':
      return (text + '#' + data?.name + '#' + data?.language)
    default:
      return (data.id + '#' + text)
  }
}

module.exports = sendReqToDB;