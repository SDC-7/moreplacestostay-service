const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv
const helpers = require('./helpers/helpers.js')

const residences = argv.residences || 0
const filename = argv.output || 'residences.csv'
const stream = fs.createWriteStream(filename)

const createResidence = (i) => {
  const _id = i;
  const residenceName = faker.company.companyName();
  const price = faker.commerce.price();
  const lat = faker.address.latitude();
  const long = faker.address.longitude();
  const url = helpers.generateRandomImage();
  return `${_id},"${residenceName}",${price},${lat},${long},${url}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = residences;
  function writing() {
    let canWrite = true
    do {
      i++
      let residence = createResidence(i);
      if (i === 10000000) {
        writeStream.write(residence, encoding, done)
      } else {
        writeStream.write(residence, encoding)
      }
    } while (i < 10000000 && canWrite)

      if (i < 10000000 && !canWrite) {
        writeStream.once('drain', writing);
      }
    }
    writing();
  }

  stream.write(`_id,residenceName,price,lat,long,url\n`,'utf-8')
  startWriting(stream, 'utf-8', () => {
    stream.end();
  })