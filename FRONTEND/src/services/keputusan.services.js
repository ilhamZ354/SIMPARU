import axios from 'axios'
import Cookies from 'js-cookie';

const URL = 'http://localhost:5000/api/simparu';


//buat keputusan
export const buatKeputusan = async (requestBody) => {
    const accessToken = Cookies.get('access_token');
  
    try {
      const response = await axios.post(`${URL}/keputusan/buat`, requestBody, {
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


//get keputusan By id
export const getKeputusan = async (id, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`${URL}/keputusan/${id}`, {
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

  //get all keputusan
export const getAllKeputusan = async (req, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`${URL}/keputusans`, {
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


//hapus keputusan
export const deleteKeputusan = async (id, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.delete(`${URL}/keputusan/delete/${id}`, {
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