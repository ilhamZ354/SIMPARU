const mongoose = require('mongoose')
const encrypt = require('../helper/bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const penggunaSchema = new Schema({
    nama: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        default: 'guru',
        required: true,
    },
    jabatan: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photourl: {
        type: String,
    },
    saran: {
        type: Schema.Types.ObjectId,
        ref: 'Saran',
    },
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
    ],
    },
    {
        timestamps: true,
    }
);

//method regis
penggunaSchema.statics.signup = async function(nama, username, email, jabatan, level, password) {
      // validasi
        if (!email || !password) {
            throw Error('Semua data harus di isi')
        }
        if (!validator.isEmail(email)) {
            throw Error('Email not valid')
        }

        const exists = await this.findOne({ email })

        if (exists) {
            throw Error('Email telah digunakan')
        }

    hash =  await encrypt(password);
    const user = await this.create({ nama, username, email, jabatan, level, password: hash });
    return user
}

//validasi login
penggunaSchema.statics.login = async function (username, password){
    const user = await this.findOne({ username });
    if (!user) throw new Error('Failed to login');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Failed to login');
  
    return user;

  };

// generate token
penggunaSchema.methods.generateToken = async function() {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.ACCESS_TOKEN);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  };
  

module.exports = mongoose.model('Pengguna', penggunaSchema)