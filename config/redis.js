
// kết nối redis
const redis = require("redis");
require("dotenv").config();

(async () => {
    // const client = createClient({
    //     username: 'default',
    //     password: '*******',
    //     socket: {
    //         host: 'redis-11719.c325.us-east-1-4.ec2.redns.redis-cloud.com',
    //         port: 11719
    //     }
    // });

    const client = redis.createClient()

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();
    console.log("Redis Connected!")

    await client.set("token", "123456789");
    const value = await client.get("token");
    console.log(value);
})();