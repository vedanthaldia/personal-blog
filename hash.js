const bcrypt = require('bcrypt');
const password = "HaldiDon@123#1";
bcrypt.hash(password, 10).then(console.log);
