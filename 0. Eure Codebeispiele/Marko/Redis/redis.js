const Redis = require("ioredis");
const redis = new Redis();

async function run() {
  await redis.rpush("warteliste", "Coders", "Bay");
  const kunde = await redis.lpop("warteliste");
  console.log("Nächster Kunde:", kunde);
  redis.quit();
}

run();
