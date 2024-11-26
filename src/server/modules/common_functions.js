
const { menuItems } = require('../data/consts')


module.exports.getProducts = async function (lang) {
  try {
    const menuItems_ = menuItems[lang]
    return menuItems_
  } catch (err) {
    console.log(err)
    return []
  }
}

