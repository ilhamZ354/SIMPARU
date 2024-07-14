import React, { useState, useEffect, useRef } from 'react';
import PhotoProfile from '../../../BACKEND/uploads/images/profil-image2.jpg';
import styled from "styled-components";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { logout } from '../services/user.service';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';
import { aboutMe } from '../services/user.service';
import { updatePassword } from '../services/user.service';
import { uploadPhoto } from '../services/uploadImage';
import { deletePhoto } from '../services/imageDelete';

const DropdownProfileContainer = styled.div`
    position: absolute;
    top: 3.5rem;
    right: 1rem;
    width: 16rem;
    height: 22rem;
    border-radius: 0.75rem;
    border-top-right-radius: 0;
    background-color: #fff;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
    box-shadow: 2px 4px 4px 2px rgb(0 0 0 / 0.1), 0 1px 4px 2px rgb(0 0 0 / 0.1);

    &:before{
        content: "";
        top: -1rem;
        right: -1rem;
        width: 10rem;
        height: 10px;
        background-color: #f9fafb;
        translate: rotate(45deg)
    }
`;


const DropdownProfile = () =>{
    const fileInputRef = useRef(null);
    const [thisMe, setThisMe] = useState('');
    const [editPassword, setEditPassword] = useState(false);
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [visible, setVisible] = useState();
    const navigateTo = useNavigate ();
    const [selectedFile, setSelectedFile] = useState(null);

    // const photoImage = imageProfile+thisMe['photourl'];

    useEffect(() => {
        const fetchMe = async () => {
          try {
            const response = await aboutMe();
            setThisMe(response);
            console.log(response)
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchMe();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            Cookies.remove('access_token');
            navigateTo('/'); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataPassword = { old_password, new_password}
        try {
            await updatePassword(dataPassword);
            alert('Password telah berhasil update')
            setEditPassword(false);
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            alert('Harap memasukkan password lama yang valid')
            console.error("Error updating password:", error);
        }
    };


    useEffect(() => {
        const fetchMe = async () => {
          try {
            const response = await aboutMe();
            setThisMe(response);
            console.log(response)
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchMe();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };
    

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };  

    const handleUpload = async () => {
        if (!selectedFile) {
          alert("Pilih gambar terlebih dahulu!");
          return;
    }
    
        try {
            const respon = await uploadPhoto(thisMe['_id'], selectedFile);
            if(respon){
                console.log('gambar di proses')
                console.log('File uploaded successfully:', respon.data);
                alert('Upload gambar berhasil!');
                window.location.reload()
            }else{
                console.log('terjadi kesalahan pada gambar')
            }
            } catch (error) {
            console.error('Error uploading file:', error);
            }
        };


        const deleteImage = async () => {
            try {
                const hapusImage = await deletePhoto(thisMe['_id'])
                if(!hapusImage) { alert('Hapus gambar gagal')}
                alert('Gambar berhasil dihapus!')
                window.location.reload()
            } catch (error) {
                console.error('Error saat menghapus image');
            }
        }

        const imageProfile = `/@fs/D:/T.A/projek/SIMPARU/BACKEND/uploads/images/photo-1720365446216.png`;

    return(
        <DropdownProfileContainer>
                        <div className="grid grid-flow-row auto-rows-max justify-center">
                        <div className="flex justify-center">
                            <img className="shadow-sm mx- my-4"
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                border: '3px solid black',
                                objectFit: 'cover',
                            }}
                                src={PhotoProfile}
                                alt="" />
                        </div>
                        <div className='flex flex-col justify-center absolute'>
                            <Button label='Change' className='p-button-help w-32 h-4 shadow-lg mx-16 my-28 text-sm' onClick={() => setVisible(true)}></Button>
                            <Dialog header="Change Photo Profile" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                            <div className="grid grid-flow-row justify-center">
                                <div className='flex w-96 bg-slate-200 rounded-md justify-center border-b-4'>
                                    <img
                                    style={{
                                        width: '230px',
                                        height: '230px',
                                        objectFit: 'cover'
                                    }}
                                        src={PhotoProfile} 
                                        alt=""
                                    />
                                </div>
                                {/* <span>{photoImage}</span> */}
                                <div className='flex grid-flow-col mt-4 justify-center'>
                                    <div className='w-3/8'>
                                    <input 
                                        type="file" 
                                        accept=".jpg, .jpeg, .png" 
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className="hidden" 
                                        name="photo"
                                        id="photo-input"
                                        />
                                    <Button label='Photo' 
                                            icon="pi pi-trash"
                                            className='p-button-secondary shadow-md h-8 mr-2'
                                            onClick={deleteImage}
                                    />
                                    </div>
                                    <div className='w-5/8'>
                                    {selectedFile && (
                                        <span className="text-md font-sans text-green-600 bg-white">{selectedFile.name}</span>
                                    )}
                                    <label htmlFor="photo-input">
                                    <Button label='Upload Photo' icon="pi pi-upload" className='p-button-help w-64 shadow-md h-8 justify-center'
                                    onClick={handleChooseFile}
                                    />
                                    </label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end mt-6'>
                                <div>
                                    <Button label='Save' icon="pi pi-check" className='p-button-primary h-10 shadow-xl drop-shadow-lg' 
                                    onClick={handleUpload}
                                    />
                                </div>
                            </div>
                            </Dialog>
                        </div>
                    </div>
                        <div className='flex flex-col justify-start m-2'>
                            <div className='w-full border border-b-0 rounded-md pt-2 pb-2'><span className='m-4 p-2 font-bold font-sans text-slate-500'>{thisMe['nama'] ?? thisMe}</span></div>
                            <div className='w-full border border-b-0 rounded-md pt-2 pb-2 text-slate-500'><span className='m-4 p-2 font-bold font-sans'>{thisMe['username'] ?? thisMe}</span></div>

                            <button  label="editPassword" type="submit" className='border border-sky-400 text-sky-400 text-center p-2 rounded-md hover:text-white hover:bg-sky-400' onClick={() => setEditPassword(true)}><i className='pi pi-pencil'></i>  Edit Password</button>
                            <Dialog header="Change Password" visible={editPassword} style={{ width: '25vw' }} onHide={() => {if (!editPassword) return; setEditPassword(false); }}>
                                <form onSubmit={handleSubmit}>
                                <div className="flex flex-column justify-center">
                                    <div className='grid grid-flow-row justify-start w-full'>
                                        <label htmlFor="password">Password</label>
                                        <div className='w-72'>
                                            <InputText 
                                                keyfilter="password" 
                                                placeholder="*****" 
                                                className="w-72 h-10" 
                                                id="password" 
                                                aria-describedby="name-help" 
                                                value={old_password}
                                                onChange={(event) => setOldPassword(event.target.value)}
                                            />
                                        </div>
                                        <label htmlFor="newPassword" className="mt-4">New Password</label>
                                        <div className='w-72'>
                                            <InputText 
                                                keyfilter="newPassword" 
                                                placeholder="*****" 
                                                className="w-72 h-10" 
                                                id="newPassword" 
                                                aria-describedby="name-help" 
                                                value={new_password}
                                                onChange={(event) => setNewPassword(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center mt-6'>
                                    <div className="w-full">
                                        <Button 
                                            label='Simpan'  
                                            className='p-button-info w-full h-10 shadow-xl drop-shadow-lg' 
                                            type="submit"
                                        />
                                    </div>
                                </div>
                            </form>
                                </Dialog>
                            <button type="submit" onClick={handleLogout} className='border border-slate-800 text-slate-700 text-center mt-2 p-2 rounded-md hover:text-white hover:bg-slate-800'><i className='pi pi-power-off'></i>  Logout</button>
                        </div>
        </DropdownProfileContainer>
    );
};

export default DropdownProfile;