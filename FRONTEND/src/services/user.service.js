import axios from 'axios'
import Cookies from 'js-cookie';

const URL = 'http://localhost:5000/api/simparu';

//login
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${URL}/login`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Login failed');
    }
}

//logout
export const logout = async () => {
    try {
        await axios.post(`${URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
        throw new Error('Logout failed');
    }
};

//user me
export const aboutMe = async () => {
    try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.get(`${URL}/user/me`,{
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'About me not found');
    }
}

//user me update password
export const updatePassword = async (passwordData) => {
    try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.patch(`${URL}/password/me`, passwordData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
      });
      if(response){ 
        console.log('berhasil edit password') 
        }else{
            console.log('tidak berhasil')
        }
      return response.data;
    } catch (error) {
      console.error('Failed to edit password:', error);
      throw error;
    }
  };


/* 
FOR OWNER
*/
//add admin
export const addAdmin = async (nama, username, email, jabatan, password) => {
    const accessToken = Cookies.get('access_token');
    const requestBody = {
      nama,
      username,
      email,
      jabatan,
      password,
    };
  
    try {
      const response = await axios.post(`${URL}/admin/regis`, requestBody, {
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


//get all admins
export const admins = async (req, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`${URL}/admins`, {
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

//delete admin
export const deletAdmin = async (id) => {
    try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.delete(`${URL}/admin/hapus/${id}`, {
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


// edit admin
export const editDataAdmin = async (_id, updatedAdminData) => {
    try {
        console.log('Editing admin with ID:', _id);
        console.log('Updated data:', updatedAdminData);
        const accessToken = Cookies.get('access_token');
        const response = await axios.patch(`${URL}/admin/edit/${_id}`, updatedAdminData, {
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
      console.error('Failed to edit admin data:', error);
      throw error;
    }
  };

/* 
FOR OWNER
*/


/* 
FOR ADMIN
*/
//add user
export const addUser = async (nama, username, email, jabatan, password) => {
    const accessToken = Cookies.get('access_token');
    const requestBody = {
      nama,
      username,
      email,
      jabatan,
      password,
    };
  
    try {
      const response = await axios.post(`${URL}/user/regis`, requestBody, {
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

//get all user
export const getUser = async (req, res) => {
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`${URL}/user`, {
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

//delete user
export const deleteUser = async (id) => {
    try {
        const accessToken = Cookies.get('access_token');
        const response = await axios.delete(`${URL}/user/hapus/${id}`, {
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


// edit user
export const editDataUser = async (_id, updatedUserData) => {
    try {
        console.log('Editing user with ID:', _id);
        console.log('Updated user:', updatedUserData);
        const accessToken = Cookies.get('access_token');
        const response = await axios.patch(`${URL}/user/edit/${_id}`, updatedUserData, {
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
      console.error('Failed to edit user data:', error);
      throw error;
    }
  };

/* 
FOR OWNER
*/