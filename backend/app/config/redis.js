let redis = require("redis");
let client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
});

client.on("error", (error) => {
    console.log(error);
});

module.exports = client;