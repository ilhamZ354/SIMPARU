import axios from 'axios';
import Cookies from 'js-cookie';

const URL = 'http://localhost:5000/api/simparu';

export const uploadPhoto = async (_id, file) => {
  console.log(_id);
    
const formData = new FormData();
formData.append('photo', file);

  try {
    const accessToken = Cookies.get('access_token');
    const response = await axios.patch(`${URL}/upload/foto/${_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response) {
        console.log('gambar berhasil di upload')
    } else {
      console.log('tidak berhasil');
    }
    return response.data;
  } catch (error) {
    console.error('Failed to upload gambar:', error);
    throw error;
  }
};