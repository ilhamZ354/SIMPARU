import axios from 'axios'
import Cookies from 'js-cookie';

const URL = 'http://localhost:5000/api/simparu';

//get all siswa
export const getSekolahAsal = async (req, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`${URL}/sekolah-asal.json`, {
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