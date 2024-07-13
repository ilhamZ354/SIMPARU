const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

module.exports = encrypt ;
