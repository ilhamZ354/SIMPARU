import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from '@material-tailwind/react';
import axios from "axios";
import Cookies from "js-cookie";

const Baru = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Pilih file terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setIsLoading(true);

    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.post(`http://localhost:5000/api/simparu/siswa/upload-excel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('File uploaded successfully:', response.data);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full">
      <div className="grid grid-flow-row w-full mr-4">
        <div className="flex flex-col">
          <div className="flex w-full justify-center">
            <Card className='w-full mb-6 mt-12'>
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center w-10/12 bg-sky-50 rounded-xl mt-6 mb-4">
                  <input 
                    type="file" 
                    accept=".xlsx" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden" 
                    name="file"
                    id="file-input"
                  />
                  {selectedFile && (
                    <span className="text-md font-sans text-green-600 bg-white p-2">{selectedFile.name}</span>
                  )}
                  <label htmlFor="file-input">
                    <Button 
                      label="Choose File" 
                      className="p-button-secondary m-8 h-14 w-44 rounded-full mb-1" 
                      text 
                      onClick={handleChooseFile}
                    />
                  </label>
                  <Button 
                    label="Upload File" 
                    icon="pi pi-upload" 
                    className="p-button-info m-8 h-14 w-64 rounded-full mb-1" 
                    onClick={handleSubmit} 
                    disabled={isLoading}
                  />
                  <span className="text-sm font-sans text-sky-500 mb-2">File format : Excel/xlsx</span>
                  {isLoading && (
                    <div className="flex items-center justify-center mt-4">
                      <ProgressSpinner />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baru;
