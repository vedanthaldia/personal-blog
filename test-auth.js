require('dotenv').config();
const bcrypt = require('bcrypt');

async function test() {
  const password = "HaldiDon@123#1";
  const hash = process.env.ADMIN_PASSWORD_HASH;
  console.log("Hash from env:", hash);
  if (!hash) {
    console.log("No hash found in env");
    return;
  }
  const match = await bcrypt.compare(password, hash);
  console.log("Match:", match);
}

test();
