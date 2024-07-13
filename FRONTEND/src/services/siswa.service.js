import axios from 'axios'
import Cookies from 'js-cookie';

const URL = 'http://localhost:5000/api/simparu';

//get all siswa
export const siswas = async (req, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`${URL}/siswa`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

//edit siswa
export const editDataSiswa = async (_id, updatedSiswaData) => {
    try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.patch(`${URL}/siswa/edit/${_id}`, updatedSiswaData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
      });
      if(response){ 
        console.log('berhasil') 
        }else{
            console.log('tidak berhasil')
        }
      return response.data;
    } catch (error) {
      console.error('Failed to edit siswa data:', error);
      throw error;
    }
  };


//delete siswa
export const deleteSiswa = async (id) => {
    try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.delete(`${URL}/siswa/hapus/${id}`, {
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