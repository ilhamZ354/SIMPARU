const User = require('../models/penggunaModel')
const bcrypt = require('bcrypt');
const encrypt = require('../helper/bcrypt') 

// regis super admin
const regisSuperAdmin = async (req, res) => {
    const { nama, username, email, jabatan, password } = req.body;
    const level = 'super-admin'

    try {
        const user = await User.signup(nama, username, email, jabatan, level, password);
        res.status(200).json({ user });
        console.log('berhasil input data admin')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//login user
const login = async (req, res) => {

    try {
        const user = await User.login(req.body.username, req.body.password);
        const token = await user.generateToken();

        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.json({status: true, user, token});

      } catch (e) {
        res.status(400).send({
          error: { message: 'Username atau password yang kamu masukkan tidak valid' },
        });
    }
}


//logout
const logout = async(req, res) =>{
    try {
        console.log('Logout request received');
        res.clearCookie('access_token');
        res.status(200).json({ msg: 'Logout berhasil' });
      } catch (e) {
        res.status(400).send(e);
      }
}


//////////////////////////////////// ini untuk kepsek /////////////////////////////////

//regis kepsek
const regisKepsek = async (req, res) => {
    const { nama, username, email, password } = req.body;
    const level = 'kepala-sekolah'
    const jabatan = 'kepala_sekolah'

    try {
        const user = await User.signup(nama, username, email, jabatan, level, password);
        res.status(200).json({ user });
        console.log('berhasil registrasi kepala sekolah')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get kepala sekolah
const getKepsek = async (req, res) => {
    try {
        const users = await User.find({ level:'kepala-sekolah' }).sort({createdAt: -1})
        res.status(200).json({ status:true, users })
    } catch (error) {
        res.status(400).json({ msg : "Data tidak ditemukan" });
    }
  }

// delete kepsek
const deleteKepsek = async (req, res) => {
    if (req.user.level !== 'super-admin') {
        return res.status(403).send({
            error: 'Hanya super admin yang dapat menghapus kepala sekolah',
        });
    }

    try {
        const result = await User.deleteMany({ level: 'kepala-sekolah' });
        if (result.deletedCount === 0) {
            return res.status(404).send({
                message: 'Tidak ada kepala sekolah yang ditemukan untuk dihapus',
            });
        }

        res.send({ message: `${result.deletedCount} kepala sekolah berhasil dihapus` });
    } catch (e) {
        res.status(500).send({
            error: 'Terjadi kesalahan saat menghapus kepala sekolah',
            details: e.message,
        });
    }
};

//edit kepsek
const editKepsek = async (req, res) => {
    if (req.user.level !== 'super-admin') {
        return res.status(400).send({ error: 'Kamu tidak bisa melakukan update' });
    }

    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nama', 'username', 'email', 'password', 'new_password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Update gagal' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.sendStatus(404);
        }

        if (req.body.new_password) {
            if (!req.body.password) {
                return res.status(400).send({ error: 'Old password is required to change password.' });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ error: 'Old password is incorrect.' });
            }

            user.password = await encrypt(req.body.new_password);
            updates.splice(updates.indexOf('new_password'), 1);
            updates.splice(updates.indexOf('password'), 1);
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};
//////////////////////// ini untuk admin //////////////////////////////

// regis admin
const regisAdmin = async (req, res) => {
    const { nama, username, email, jabatan, password } = req.body;
    const level = 'admin'

    try {
        const user = await User.signup(nama, username, email, jabatan, level, password);
        res.status(200).json({ user });
        console.log('berhasil input data admin')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//get all admin
const getAdmins = async (req, res) => {
    try {
        const users = await User.find({ level:'admin' }).sort({createdAt: -1})
        res.status(200).json({ status:true, users })
    } catch (error) {
        res.status(400).json({ msg : "Data tidak ditemukan" });
    }
  }

//get admin by id for owner
const getAdminById = async (req, res) => {
    if (req.user.level !== 'super-admin')
        return res.status(400).send({
          error: 'Data tidak diperbolehkan',
        });
      const _id = req.params.id;
      try {
        const user = await User.findById(_id);
        if (!user) return res.sendStatus(404);
        res.send(user);
      } catch (e) {
        res.sendStatus(400);
      }
}


//edit admin by id for owner
const editAdminById = async (req, res) => {
    if (req.user.level !== 'super-admin') {
        return res.status(400).send({ error: 'Kamu tidak bisa melakukan update' });
    }

    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nama', 'username', 'email', 'password', 'new_password', 'jabatan'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Update gagal' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.sendStatus(404);
        }

        if (req.body.new_password) {
            if (!req.body.password) {
                return res.status(400).send({ error: 'Old password is required to change password.' });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ error: 'Old password is incorrect.' });
            }

            user.password = await encrypt(req.body.new_password);
            updates.splice(updates.indexOf('new_password'), 1);
            updates.splice(updates.indexOf('password'), 1);
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

//delete all admin
const deleteAllAdmin = async (req, res) => {
    if (req.user.level !== 'super-admin') {
        return res.status(400).send({
            error: 'Hanya kepala sekolah yang dapat menghapus admin',
        });
    }

    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).send({ error: 'Id admin tidak valid' });
    }

    try {
        const result = await User.deleteMany({ _id: { $in: ids } });
        if (result.deletedCount === 0) {
            return res.sendStatus(404);
        }

        res.send({ message: `${result.deletedCount} berhasil menghapus` });
    } catch (e) {
        res.status(400).send(e);
    }
};


//delete  admin by id
const deleteAdminById = async(req, res) => {

    if (req.user.level !== 'super-admin')
        return res.status(400).send({
          error: 'Hanya super admin yang dapat menghapus admin',
        });
      const _id = req.params.id;
    
      try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) return res.sendStatus(404);
    
        res.send({ message: 'Admin Deleted' });
      } catch (e) {
        res.sendStatus(400);
      }
}



////////////////////////////// ini untuk guru ////////////////////////////////

// regis guru
const regisGuru = async (req, res) => {
    const { nama, username, email, jabatan, password } = req.body;
    const level = 'guru'

    try {
        const user = await User.signup(nama, username, email, jabatan, level, password);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get all guru
const getGurus = async (req, res) => {
    try {
        const users = await User.find({ level:'guru' }).sort({createdAt: -1})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ msg : "Data tidak ditemukan" });
    }
  }


  //get guru by id
const getGuruById = async (req, res) => {
    if (req.user.level !== 'super-admin')
        return res.status(400).send({
          error: 'Data tidak diperbolehkan',
        });
      const _id = req.params.id;
      try {
        const user = await User.findById(_id);
        if (!user) return res.sendStatus(404);
        res.send(user);
      } catch (e) {
        res.sendStatus(400);
      }
}


//edit guru by Id
const editGuruById = async (req, res) => {
    if (req.user.level !== 'super-admin') {
        return res.status(400).send({ error: 'Kamu tidak bisa melakukan update' });
    }

    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nama', 'username', 'email', 'password', 'new_password', 'jabatan'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Update gagal' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.sendStatus(404);
        }

        if (req.body.new_password) {
            if (!req.body.password) {
                return res.status(400).send({ error: 'Old password is required to change password.' });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ error: 'Old password is incorrect.' });
            }

            user.password = await encrypt(req.body.new_password);
            updates.splice(updates.indexOf('new_password'), 1);
            updates.splice(updates.indexOf('password'), 1);
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

//delete all guru
const deleteAllGuru = async (req, res) => {
    if (req.user.level !== 'super-admin') {
        return res.status(400).send({
            error: 'Hanya admin yang dapat menghapus user',
        });
    }

    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).send({ error: 'Id tidak valid' });
    }

    try {
        const result = await User.deleteMany({ _id: { $in: ids } });
        if (result.deletedCount === 0) {
            return res.sendStatus(404);
        }

        res.send({ message: `${result.deletedCount} berhasil menghapus` });
    } catch (e) {
        res.status(400).send(e);
    }
};


//delete guru 
const deleteGuruById = async(req, res) => {

    if (req.user.level !== 'super-admin')
        return res.status(400).send({
          error: 'hanya super admin yang dapat menghapus guru',
        });
      const _id = req.params.id;
    
      try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) return res.sendStatus(404);
    
        res.send({ message: 'User Deleted' });
      } catch (e) {
        res.sendStatus(400);
      }
}


////////////////// untuk semua pengguna ///////////////////////////////

//get profile me
const getProfile = async (req, res) => {
    try {
        res.send(req.user);
      } catch (e) {
        res.status(400).send(e);
      }
}

//edit password me
const editPassword = async (req, res) => {
    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
        return res.status(400).send({
            error: 'Old password dan new password tidak ada'
        });
    }

    try {
        const isMatch = await bcrypt.compare(old_password, req.user.password);
        if (!isMatch) {
            return res.status(400).send({
                error: 'Old password salah'
            });
        }
        const encryptedPassword = await encrypt(new_password);
        req.user.password = encryptedPassword;
        await req.user.save();
        console.log('berhasil update password')
        res.send({ message: 'Password updated successfully.' });
    } catch (e) {
        res.status(500).send({
            error: 'An error occurred while updating the password.',
            details: e.message
        });
    }
}



// get image
// const getImage = async (req, res) => {
//     const _id = req.params._id
//     try {
//         const image = await User.findById(_id)
//         if(!image) res.send({ msg: 'image not found'})
        
//             const imagePath = path.join(__dirname,image.photourl)
//             res.sendFile(imagePath)
//     } catch (error) {
//         res.sendStatus(400);
//     }
// }
module.exports = { regisSuperAdmin, getKepsek, deleteKepsek, editKepsek, login, logout, regisKepsek, regisAdmin, getGurus, 
    getAdmins, getProfile, getAdminById, editAdminById,
    deleteAllAdmin, deleteAdminById, editPassword, regisGuru, getGuruById, editGuruById,
    deleteGuruById, deleteAllGuru
}