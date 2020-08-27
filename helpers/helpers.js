module.exports.generateRandomImage = function() {
  let first = Math.floor(Math.random() * 9)
  let second = Math.floor(Math.random() * 9)
  let third = Math.floor(Math.random() * 9)
  return `${first}${second}${third}`
}