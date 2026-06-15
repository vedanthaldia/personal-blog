const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter new admin password: ', (password) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
    } else {
      console.log('\n--- Success! ---');
      console.log('Update your .env file with the following value:');
      const escapedHash = hash.replace(/\$/g, '\\$');
      console.log(`ADMIN_PASSWORD_HASH="${escapedHash}"\n`);
    }
    rl.close();
  });
});
