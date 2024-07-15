const jwt = require('jsonwebtoken');
const User = require('../models/penggunaModel');
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


const verifySuperAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user || user.level !== 'super-admin') throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Silakan login terlebih dahulu.' });
  }
};

const verifyKepsek = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await User.findOne({
        _id: decoded._id,
        'tokens.token': token,
      });
      if (!user || user.level !== 'kepala-sekolah') throw new Error();
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
      if (!user || user.level !== 'admin') throw new Error();
      req.token = token;
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send({ error: 'Silakan login terlebih dahulu.' });
    }
  };


  const verifyAdminKepsek = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await User.findOne({
        _id: decoded._id,
        'tokens.token': token,
      });
      if (user.level !=='kepala-sekolah' && user.level !== 'admin') throw new Error();
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
  
module.exports = { verify, verifySuperAdmin, verifyAdminKepsek, verifyKepsek, verifyAdmin, upload };