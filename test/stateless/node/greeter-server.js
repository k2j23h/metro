const less = require('./template/less')

module.exports = less((msg, from)=>{
  return `Hello, ${from.name}!`
})