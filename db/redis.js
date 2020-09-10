const redis = require("redis");

const options = {
  port: '6379',
  host: '3.86.206.32',
  password: process.env.REDIS_PASSWORD
}

const client = redis.createClient(options);

client.on("ready", function() {
  console.log('redis connected!')
})

client.on("error", function(error) {
  console.error(error);
});

module.exports = () => { return client };

