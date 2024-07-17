import axios from 'axios'
import Cookies from 'js-cookie';

const URL = 'http://localhost:5000/api/simparu';


//buat saran
export const buatSaran = async (requestBody) => {
    const accessToken = Cookies.get('access_token');
  
    try {
      const response = await axios.post(`${URL}/saran/send`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 200) {
        return true;
      } else {
        console.error(response);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };


//get me saran
export const saranMe = async (req, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`${URL}/saran/me`, {
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

  //get all saran
export const getSarans = async (req, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`${URL}/sarans`, {
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

  //hapus saran
export const deleteSaran = async (id, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.delete(`${URL}/saran/delete/${id}`, {
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