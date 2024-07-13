import {React, useState, useRef} from "react";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Toolbar } from 'primereact/toolbar';
import { Card } from '@material-tailwind/react';
import axios from "axios";
import Cookies from "js-cookie";

const Baru = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };
    

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };  

    const handleSubmit = async () => {
        if (!selectedFile) {
          alert("Please select a file first!");
          return;
    }
    
        const formData = new FormData();
        formData.append('file', selectedFile);
    
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
        }
      };

    const [globalFilter, setGlobalFilter] = useState('');


        const leftContents = (
            <div className="flex flex-row">
                <Button
                icon="pi pi-trash"
                className="p-button-info"
            />
                <div className="bg-sky-800 rounded-lg ml-2">
                    <h3 className="font-sans text-center text-xl text-white">Data preview</h3>
                </div>
            </div>
        );
    
        const rightContents = (
            <div className="flex justify-end w-full">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search"
                    />
                </span>
            </div>
        );

        const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-info" text />;
        const paginatorRight = <Button type="button" label="simpan" icon="pi pi-check" className="p-button-info" text />;


        
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
                                        <span className="text-md font-sans text-green-600 bg-white">{selectedFile.name}</span>
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
                        />
                        <span className="text-sm font-sans text-sky-500 mb-2">File format : Excel/xlsx</span>
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
