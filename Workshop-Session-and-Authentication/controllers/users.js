const User = require('../models/user');
const bscrypt = require('bcrypt');

async function addUser(username, password){
    const salt = bscrypt.genSaltSync(10);
    const hashPassword = bscrypt.hashSync(password, salt);

    const user = new User({username, password: hashPassword});
    const status = await user.save();
    console.log(status);
    

}

module.exports = {
    addUser
}