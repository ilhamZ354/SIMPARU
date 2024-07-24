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

const { getSekolahAsalData } = require ('../controllers/sekolahAsalController')

const multer = require('multer')

const { verify, verifyAdmin, verifySuperAdmin,verifyAdminKepsekGuru, verifyGuru, verifyKepsek } = require('./middleware');
const { excelUpload } = require('../controllers/uploadFileExcel');
const { updateProfilePhoto, hapusPhoto } = require('../controllers/uploadPhotoController')
const { upload } = require('../config/middleware');
const { getDataSiswa } = require('../controllers/dataSiswaController');
const { createSaran, getAllSarans, getSaranMe, updateSaranById, deleteSaranById } = require('../controllers/saranController');
const { createKeputusan, getAllKeputusan, getKeputusanById, updateKeputusanById, deleteKeputusanById } = require('../controllers/keputusanController');
const { getDataPerJurusan } = require('../controllers/dataJurusan');

const BASE_URL = '/api/simparu'

module.exports = (app) => {

    //semua user
    app.post(`${BASE_URL}/login`, login );
    app.post(`${BASE_URL}/logout`,logout );
    app.get(`${BASE_URL}/user/me`, verify, getProfile );
    app.patch(`${BASE_URL}/password/me`, verify, editPassword );

    app.get(`${BASE_URL}/datasiswa/:tahun`, verify, getDataSiswa )
    app.get(`${BASE_URL}/jurusan-tiap-tahun.json`, verify, getDataPerJurusan )
    
    //hanya super admin
    // app.post(`${BASE_URL}/super-admin/regis`, regisSuperAdmin)
    app.post(`${BASE_URL}/kepsek/regis`, verifySuperAdmin, regisKepsek );
    app.get(`${BASE_URL}/kepsek`, verifySuperAdmin, getKepsek );
    app.delete(`${BASE_URL}/kepsek/hapus`, verifySuperAdmin, deleteKepsek );
    app.patch(`${BASE_URL}/kepsek/edit/:id`,verifySuperAdmin, editKepsek );

    app.post(`${BASE_URL}/keputusan/buat`, verifyKepsek, createKeputusan );
    app.get(`${BASE_URL}/keputusans`, verifyAdminKepsekGuru, getAllKeputusan );
    app.get(`${BASE_URL}/keputusan/:id`, verifyAdminKepsekGuru, getKeputusanById );
    app.patch(`${BASE_URL}/keputusan/update/:id`, verifyKepsek, updateKeputusanById );
    app.delete(`${BASE_URL}/keputusan/delete/:id`, verifyKepsek, deleteKeputusanById );

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
    app.get(`${BASE_URL}/siswa`, verifyAdminKepsekGuru , getSiswa)
    app.get(`${BASE_URL}/siswa/:id`, verifyAdmin, getSiswaById)
    app.delete(`${BASE_URL}/siswa/hapus/:id`, verifyAdmin, deleteSiswaById)
    app.patch(`${BASE_URL}/siswa/edit/:id`, verifyAdmin, editSiswaById)

    //guru
    app.post(`${BASE_URL}/saran/send`, verifyGuru, createSaran)
    app.get(`${BASE_URL}/sarans`, verifyAdminKepsekGuru, getAllSarans)
    app.get(`${BASE_URL}/saran/me`, verifyGuru, getSaranMe)
    app.patch(`${BASE_URL}/saran/status-edit/:id`, verifyGuru, updateSaranById)
    app.delete(`${BASE_URL}/saran/delete/:id`, verifyGuru, deleteSaranById );

    //sekolah asal
    app.get(`${BASE_URL}/sekolah-asal.json`, verifyAdminKepsekGuru , getSekolahAsalData)
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

