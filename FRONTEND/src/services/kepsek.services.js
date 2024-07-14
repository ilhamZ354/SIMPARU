import axios from 'axios'
import Cookies from 'js-cookie';

const URL = 'http://localhost:5000/api/simparu';

//add kepsek
export const regisKepsek = async (nama, username, email, password) => {
    const accessToken = Cookies.get('access_token');
    const requestBody = {
      nama,
      username,
      email,
      password,
    };
  
    try {
      const response = await axios.post(`${URL}/kepsek/regis`, requestBody, {
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


//get kepsek
export const kepsek = async (req, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`${URL}/kepsek`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
    //   console.log(response.data)
      return response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //delete kepsek
export const deleteKepsekData = async () => {
    try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.delete(`${URL}/kepsek/hapus`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};


// edit kepsek
export const editDataKepsek = async (_id, updateKepsekData) => {
    try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.patch(`${URL}/kepsek/edit/${_id}`, updateKepsekData, {
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
      console.error('Failed to edit kepsek data:', error);
      throw error;
    }
  };
