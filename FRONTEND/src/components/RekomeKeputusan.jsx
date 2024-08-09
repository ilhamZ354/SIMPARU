import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

const RekomenKeputusan = () => {
  const [rekomendasiData, setRekomendasiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tahun = new Date().getFullYear();
        const accessToken = Cookies.get('access_token');
        const response = await axios.get(`http://localhost:5000/api/simparu/rekomendasi/${tahun}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        setRekomendasiData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <span>Berdasarkan hasil analisa: </span>
  );
};

export default RekomenKeputusan;
