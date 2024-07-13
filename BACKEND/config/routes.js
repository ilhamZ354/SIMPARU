const { login, 
    logout, 
    regisAdmin, 
    getUsers, 
    getAdmins, 
    getAllUser,
    getProfile,
    getAdminById,
    editAdminById,
    deleteAdminById,
    deleteAllAdmin,
    editPassword, 
    regisUser,
    getUserById,
    editUserById,
    deleteUserById,
    deleteAllUser,
    getImage
} = require ('../controllers/userController');

const {
    inputSiswa,
    getSiswa,
    deleteSiswaById,
    getSiswaById,
    editSiswaById
} = require ('../controllers/siswaController');

const multer = require('multer')

const { verify, verifyOwner, verifyAdmin } = require('./middleware');
const { excelUpload } = require('../controllers/uploadFileExcel');
const { updateProfilePhoto, hapusPhoto } = require('../controllers/uploadPhotoController')
const { upload } = require('../config/middleware')

const BASE_URL = '/api/simparu'

module.exports = (app) => {

    //semua user
    app.post(`${BASE_URL}/login`, login );
    app.post(`${BASE_URL}/logout`,logout );
    app.get(`${BASE_URL}/users`, verify, getUsers );
    app.get(`${BASE_URL}/user/me`, verify, getProfile );
    app.patch(`${BASE_URL}/password/me`, verify, editPassword );
    
    //hanya owner
    app.post(`${BASE_URL}/admin/regis`, verifyOwner, regisAdmin );
    app.get(`${BASE_URL}/admins`, getAdmins );
    app.get(`${BASE_URL}/admin/:id`,verifyOwner, getAdminById );
    app.patch(`${BASE_URL}/admin/edit/:id`,verifyOwner, editAdminById );
    app.delete(`${BASE_URL}/admin/hapus/:id`,verifyOwner, deleteAdminById );
    app.delete(`${BASE_URL}/admin/hapus`,verifyOwner, deleteAllAdmin );

    //hanya admin
    app.post(`${BASE_URL}/user/regis`, verifyAdmin, regisUser );
    app.get(`${BASE_URL}/user`, verifyAdmin, getAllUser );
    app.get(`${BASE_URL}/user/:id`,verifyAdmin, getUserById );
    app.patch(`${BASE_URL}/user/edit/:id`,verifyAdmin, editUserById );
    app.delete(`${BASE_URL}/user/hapus/:id`,verifyAdmin, deleteUserById );
    app.delete(`${BASE_URL}/user/hapus`,verifyAdmin, deleteAllUser );

    //manage siswa
    app.post(`${BASE_URL}/siswa/add`, verifyAdmin, inputSiswa)
    app.get(`${BASE_URL}/siswa`, verifyAdmin, getSiswa)
    app.get(`${BASE_URL}/siswa/:id`, verifyAdmin, getSiswaById)
    app.delete(`${BASE_URL}/siswa/hapus/:id`, verifyAdmin, deleteSiswaById)
    app.patch(`${BASE_URL}/siswa/edit/:id`, verifyAdmin, editSiswaById)

    // upload excel
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    });

    const uploadExcel = multer({ storage: storage });

    app.post(`${BASE_URL}/siswa/upload-excel`, uploadExcel.single('file'), verifyAdmin, excelUpload);

    //upload foto
    app.patch(`${BASE_URL}/upload/foto/:id`, upload, updateProfilePhoto);

    // hapus foto
    app.delete(`${BASE_URL}/hapus/foto/:id`, hapusPhoto)
}

