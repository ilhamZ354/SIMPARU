const { login, 
    logout, 
    regisAdmin, 
    getAdmins, 
    getProfile,
    getAdminById,
    editAdminById,
    deleteAdminById,
    deleteAllAdmin,
    editPassword, 
    deleteUserById,
    regisKepsek,
    regisSuperAdmin,
    getKepsek,
    deleteKepsek,
    regisGuru,
    getGurus,
    getGuruById,
    editGuruById,
    deleteGuruById,
    deleteAllGuru,
    editKepsek
} = require ('../controllers/userController');

const {
    inputSiswa,
    getSiswa,
    deleteSiswaById,
    getSiswaById,
    editSiswaById
} = require ('../controllers/siswaController');

const multer = require('multer')

const { verify, verifyOwner, verifyAdmin, verifySuperAdmin } = require('./middleware');
const { excelUpload } = require('../controllers/uploadFileExcel');
const { updateProfilePhoto, hapusPhoto } = require('../controllers/uploadPhotoController')
const { upload } = require('../config/middleware')

const BASE_URL = '/api/simparu'

module.exports = (app) => {

    //semua user
    app.post(`${BASE_URL}/login`, login );
    app.post(`${BASE_URL}/logout`,logout );
    app.get(`${BASE_URL}/user/me`, verify, getProfile );
    app.patch(`${BASE_URL}/password/me`, verify, editPassword );
    
    //hanya super admin
    // app.post(`${BASE_URL}/super-admin/regis`, regisSuperAdmin)
    app.post(`${BASE_URL}/kepsek/regis`, verifySuperAdmin, regisKepsek );
    app.get(`${BASE_URL}/kepsek`, verifySuperAdmin, getKepsek );
    app.delete(`${BASE_URL}/kepsek/hapus`, verifySuperAdmin, deleteKepsek );
    app.patch(`${BASE_URL}/kepsek/edit/:id`,verifySuperAdmin, editKepsek );

    app.post(`${BASE_URL}/admin/regis`, verifySuperAdmin, regisAdmin );
    app.get(`${BASE_URL}/admins`, verifySuperAdmin, getAdmins );
    app.get(`${BASE_URL}/admin/:id`,verifySuperAdmin, getAdminById );
    app.patch(`${BASE_URL}/admin/edit/:id`,verifySuperAdmin, editAdminById );
    app.delete(`${BASE_URL}/admin/hapus/:id`,verifySuperAdmin, deleteAdminById );
    app.delete(`${BASE_URL}/admin/hapus`,verifySuperAdmin, deleteAllAdmin );

    app.post(`${BASE_URL}/guru/regis`, verifySuperAdmin, regisGuru );
    app.get(`${BASE_URL}/guru`, verifySuperAdmin, getGurus );
    app.get(`${BASE_URL}/guru/:id`,verifySuperAdmin, getGuruById );
    app.patch(`${BASE_URL}/guru/edit/:id`,verifySuperAdmin, editGuruById );
    app.delete(`${BASE_URL}/guru/hapus/:id`,verifySuperAdmin, deleteGuruById );
    app.delete(`${BASE_URL}/guru/hapus`,verifySuperAdmin, deleteAllGuru );

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

