const faker = require('faker');
const fs = require('fs');
const AWS = require('aws-sdk');
const request = require('request');

const s3 = new AWS.S3({
  accessKeyId: ``, //deleted but stored;
  secretAccessKey: `` //deleted but stored;
});

function seedDatabase(i) {
    let fileName = generatesLeadZeroes(i);
    let stream = request(faker.image.city()).on('error', (err) => {console.log(err)}).pipe(fs.createWriteStream('image.jpg'));
    stream.on('close' , () => {
      const fileContent = fs.readFileSync('image.jpg');
      const params = {
        Bucket: 'sharedrentals',
        Key: `${fileName}.jpg`,
        Body: fileContent,
      };
      s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
      })
      console.log(`File uploaded successfully.`);
    });

    stream.on('error', (err) => {
      console.log(err);
    })
};


function generatesLeadZeroes(i) {
  if (i.toString().length !== 3) {
    return i.toString().padStart(3, '0');
  } else {
    return i.toString();
  }
}

let i = 0;

setInterval(() => {
  if (i < 1000) {
    seedDatabase(i);
    i++;
  }
},3000);



