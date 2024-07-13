import axios from 'axios'
import Cookies from 'js-cookie';

const URL = 'http://localhost:5000/api/simparu';

//delete gambar
export const deletePhoto = async (id) => {
    try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.delete(`${URL}/hapus/foto/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};