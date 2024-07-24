import React, { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import PhotoProfile from '../../../BACKEND/uploads/images/profil-image2.jpg';
import DropdownProfile from "../components/DropdownProfile";
import styled from 'styled-components';
import { Dropdown } from 'primereact/dropdown';
import Cookies from 'js-cookie';

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
  object-fit: cover;

  &:hover {
    transform: scale(1.1);
    border: 2px solid purple;
    cursor: pointer;
  }
`;

const Navbar = ({ setSiswaData }) => {
  const [selectedTahun, setSelectedTahun] = useState(null);

  const tahun = [
    { name: '2020' },
    { name: '2021' },
    { name: '2022' },
    { name: '2023' },
  ];

  useEffect(() => {
    const fetchDefaultYearData = async () => {
      try {
        const yearToFetch = selectedTahun ? selectedTahun.name : tahun[3].name; 
        const accessToken = Cookies.get('access_token');
        const response = await fetch(`http://localhost:5000/api/simparu/datasiswa/${yearToFetch}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setSiswaData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDefaultYearData();
  }, [selectedTahun], [setSiswaData]); 
  
  

  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);

  return (
    <div className="flex mb-4">
      <Card className="sm:h-10 md:h-14 w-full sm:ml-2 max-w-full p-4 bg-stone-50 rounded-none shadow-none">
        <div className="flex flex-row-reverse -mt-1">
          <ProfileImage src={PhotoProfile} alt="Profile" onClick={() => setOpenProfileDropdown(prev => !prev)} />
          {openProfileDropdown && (<DropdownProfile />)}
          <Dropdown
            value={selectedTahun ?? tahun[3]}
            onChange={(e) => setSelectedTahun(e.value)}
            options={tahun}
            optionLabel="name"
            placeholder="Pilih Tahun"
            className="md:w-32 sm:w-12 h-10 text-xs"
          />
        </div>
      </Card>
    </div>
  );
};

export default Navbar;
