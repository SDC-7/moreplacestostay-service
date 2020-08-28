const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv
const helpers = require('./helpers/helpers.js')

const residences = argv.residences || 10000000
const filename = argv.output || 'residences.csv'
const stream = fs.createWriteStream(filename)

const createResidence = () => {
  const residenceName = faker.company.companyName();
  const price = faker.commerce.price();
  const lat = faker.address.latitude();
  const long = faker.address.longitude();
  const url = helpers.generateRandomImage();
  return `${residenceName},${price},${lat},${long},${url}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = residences;
  function writing() {
    let canWrite = true
    do {
      i--
      let residence = createResidence();
      if (i === 0) {
        writeStream.write(residence, encoding, done)
      } else {
        writeStream.write(residence, encoding)
      }
    } while (i > 0 && canWrite)

      if (i > 0 && !canWrite) {
        writeStream.once('drain', writing);
      }
    }
    writing();
  }

  stream.write(`residenceName,price,lat,long,url\n`,'utf-8')
  startWriting(stream, 'utf-8', () => {
    stream.end();
  })