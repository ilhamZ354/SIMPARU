const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');

const verify = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Silakan login terlebih dahulu.' });
  }
};


const verifyOwner = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await User.findOne({
        _id: decoded._id,
        'tokens.token': token,
      });
      if (!user || user.role !== 'owner') throw new Error();
      req.token = token;
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send({ error: 'Silakan login terlebih dahulu.' });
    }
  };

  const verifyAdmin = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await User.findOne({
        _id: decoded._id,
        'tokens.token': token,
      });
      if (!user || user.role !== 'admin') throw new Error();
      req.token = token;
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send({ error: 'Silakan login terlebih dahulu.' });
    }
  };


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images/')
        console.log('masuk folder')
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});


const upload = multer({
  storage: storage,
}).single('photo');
  
module.exports = { verify, verifyOwner, verifyAdmin, upload };