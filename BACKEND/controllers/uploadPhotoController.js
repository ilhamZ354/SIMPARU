const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');
const { upload } = require('../config/middleware'); // pastikan middleware upload sudah di-import

const updateProfilePhoto = async (req, res) => {
    try {
        // Gunakan middleware upload untuk memproses file upload
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error uploading file' });
            }

            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // Cari user berdasarkan id dari request
            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                // Hapus file yang baru saja diupload jika user tidak ditemukan
                fs.unlinkSync(req.file.path);
                return res.status(404).json({ error: 'User not found' });
            }

            // Jika user sudah memiliki foto profil, hapus foto lama
            if (user.photourl) {
                const oldPhotoPath = path.join(__dirname, '..', 'uploads', 'images', user.photourl);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }

            // Update photourl di database
            const fileName = path.basename(req.file.path);
            user.photourl = `uploads/images/${fileName}`;
            await user.save();

            res.json({ message: 'Profile photo updated successfully', user, fileName });
        });
    } catch (error) {
        console.error('Error updating profile photo:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    updateProfilePhoto
};


const hapusPhoto = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.photourl) {
            return res.status(400).json({ error: 'Photo not found' });
        }

        const photoPath = path.join(__dirname, '..', user.photourl);

        fs.unlink(photoPath, async (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting the photo' });
            }

            user.photourl = '';
            await user.save();

            res.json({ message: 'Photo deleted successfully' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    updateProfilePhoto,
    hapusPhoto
};
