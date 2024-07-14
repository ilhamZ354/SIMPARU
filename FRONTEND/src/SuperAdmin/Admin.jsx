import { useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { addAdmin, admins, deletAdmin, editDataAdmin } from "../services/user.service";

const Admin = () => {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [password, setPassword] = useState('');
    const [newAdmin, setNewAdmin] = useState();
    const [editAdmin, setEditAdmin] = useState();
    const [selectedAdmin, setSelectedAdmin] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [dataAdmin, setDataAdmin] = useState([]);
    const [adminToEdit, setAdminToEdit] = useState();
    const [new_password, setNewPassword] = useState('');

    const jabatanOptions = [
        { label: 'Kepala sekolah', value: 'Kepala sekolah' },
        { label: 'Wakil kepala sekolah', value: 'Wakil kepala sekolah' },
        { label: 'Guru', value: 'Guru' },
        { label: 'Kepala lab', value: 'Kepala lab' },
    ];

    const submitAdmin = async (e) => {
        e.preventDefault();
        try {
          const success = await addAdmin(nama, username, email, jabatan, password);
          if (success) {
            setNewAdmin(false);
            alert('Data admin berhasil ditambahkan!');
          } else {
            alert('Data admin gagal ditambahkan!');
          }
        } catch (error) {
          console.error(error);
          alert('Terjadi kesalahan!');
        }
      };

      const fetchAdmins = async () => {
        try {
            const response = await admins();
            setDataAdmin(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const fetchAdmins = async () => {
          try {
            const response = await admins();
            setDataAdmin(response.data);
            console.log(response.data)
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchAdmins();
    }, []);

    const deleteSelectedAdmins = async () => {
        const selectedIds = selectedAdmin.map((admin) => admin._id);
        try {
            await Promise.all(selectedIds.map(id => deletAdmin(id)));
            alert('Data admin berhasil dihapus!');
            fetchAdmins();
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan saat menghapus data admin!');
        }
    };
    
    const nomorKolom = (rowData, column) => {
        return column.rowIndex + 1;
    };


    const submitEditAdmin = async (e) => {
        e.preventDefault();
        try {
            const updatedAdminData = { nama, username, email, jabatan, password, new_password };
            console.log('Submitting data:', updatedAdminData);
            const success = await editDataAdmin(adminToEdit._id, updatedAdminData);
            if (success) {
              setEditAdmin(false);
              alert('Data admin berhasil diperbarui!');
            } else {
              alert('Data admin gagal diperbarui!');
            }
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan!');
        }
    }


    const bodyAction = (rowData) =>{
        return(
            <div className="flex flex-row">
                <div className="flex w-fulll">
                    <button type="submit" label="edit profil" className="text-xs p-2 border border-cyan-600 w-24 rounded-xl ml-2 text-cyan-600 justify-center font-normal hover:bg-cyan-800 hover:text-slate-50" 
                    onClick={()=>
                    {
                        setEditAdmin(true)
                        setAdminToEdit(rowData);
                        setNama(rowData.nama);
                        setUsername(rowData.username);
                        setEmail(rowData.email);
                        setJabatan(rowData.jabatan);
                    }
                    }>edit profil</button>
                    <Dialog 
                            header="Edit Admin" 
                            visible={editAdmin} 
                            style={{ width: '25vw', minWidth: '10rem' }} 
                            onHide={() => { if (!editAdmin) return; setEditAdmin(false); }}
                        >
                            <form onSubmit={submitEditAdmin}>
                            <div className="flex flex-column justify-center">
                                <div className='grid grid-flow-row justify-start w-full'>
                                <label htmlFor="Name">Nama</label>
                                    <div className='w-72'>
                                        <InputText 
                                            keyfilter="text" 
                                            placeholder="Nama" 
                                            className="w-72 h-10" 
                                            id="name" 
                                            aria-describedby="name-help" 
                                            value={nama}
                                            onChange={(e) => setNama(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="Username" className="mt-4">Username</label>
                                    <div className='w-72'>
                                        <InputText 
                                            keyfilter="text" 
                                            placeholder="Username" 
                                            className="w-72 h-10" 
                                            id="username" 
                                            aria-describedby="username-help" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="Email" className="mt-4">Email</label>
                                    <div className='w-72'>
                                        <InputText 
                                            keyfilter="email" 
                                            placeholder="Email" 
                                            className="w-72 h-10" 
                                            id="email" 
                                            aria-describedby="email-help" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="Jabatan" className="mt-4">Jabatan</label>
                                    <div className='w-72'>
                                        <Dropdown 
                                            value={jabatan} 
                                            options={jabatanOptions} 
                                            onChange={(e) => setJabatan(e.value)} 
                                            placeholder="Jabatan" 
                                            className="w-72 h-10" 
                                            id="jabatan" 
                                        />
                                    </div>
                                    <label htmlFor="Password" className="mt-4">Old Password</label>
                                    <div className='w-72'>
                                        <InputText 
                                            keyfilter="text" 
                                            placeholder="Password" 
                                            className="w-72 h-10" 
                                            id="old_password" 
                                            type="password" 
                                            aria-describedby="password-help" 
                                            value={password ?? ''}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="newPassword" className="mt-4"> New Password</label>
                                    <div className='w-72'>
                                        <InputText 
                                            keyfilter="text" 
                                            placeholder="newPassword" 
                                            className="w-72 h-10" 
                                            id="newPassword" 
                                            type="newPassword" 
                                            aria-describedby="password-help" 
                                            value={new_password}
                                            onChange={(e)=> setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center mt-6'>
                                <div className="w-full">
                                    <Button 
                                        label='Simpan'  
                                        className='p-button-info w-full h-10 shadow-xl drop-shadow-lg' 
                                    />
                                </div>
                            </div>
                            </form>
                        </Dialog>
                </div>
            </div>
        );
    }

    const leftContents = (
        <Button
            icon="pi pi-trash"
            className="p-button-info"
            onClick={deleteSelectedAdmins}
            disabled={!selectedAdmin || !selectedAdmin.length}
        />
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

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-info" text onClick={() => window.location.reload()}/>;
    const paginatorRight = <p></p>

    return (
        <div className='flex w-full mb-4'>
            <div className='grid grid-flow-row w-full mr-3'>
                <div className='flex'>
                    <div className="flex w-full" style={{width:"60vw", height:"3vw"}}>
                        <Button label="Input Admin" className="p-button-info shadow-lg" icon="pi pi-plus" onClick={()=>{setNewAdmin(true)}}></Button>
                        <Dialog 
                            header="Input User" 
                            visible={newAdmin} 
                            style={{ width: '25vw', minWidth: '10rem' }} 
                            onHide={() => { if (!newAdmin) return; setNewAdmin(false); }}
                        >
                            <form onSubmit={submitAdmin}>
                            <div className="flex flex-column justify-center">
                                <div className='grid grid-flow-row justify-start w-full'>
                                <label htmlFor="Name">Nama</label>
                                    <div className='w-72'>
                                        <InputText 
                                            keyfilter="text" 
                                            placeholder="Name" 
                                            className="w-72 h-10" 
                                            id="name" 
                                            aria-describedby="name-help" 
                                            value={nama}
                                            onChange={(e) => setNama(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="Username" className="mt-4">Username</label>
                                    <div className='w-72'>
                                        <InputText 
                                            keyfilter="text" 
                                            placeholder="Username" 
                                            className="w-72 h-10" 
                                            id="username" 
                                            aria-describedby="username-help" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="Email" className="mt-4">Email</label>
                                    <div className='w-72'>
                                        <InputText 
                                            keyfilter="email" 
                                            placeholder="Email" 
                                            className="w-72 h-10" 
                                            id="email" 
                                            aria-describedby="email-help" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="Jabatan" className="mt-4">Jabatan</label>
                                    <div className='w-72'>
                                        <Dropdown 
                                            value={jabatan} 
                                            options={jabatanOptions} 
                                            onChange={(e) => setJabatan(e.value)} 
                                            placeholder="Jabatan" 
                                            className="w-72 h-10" 
                                            id="position" 
                                        />
                                    </div>
                                    <label htmlFor="Password" className="mt-4">Password</label>
                                    <div className='w-72'>
                                        <InputText 
                                            keyfilter="text" 
                                            placeholder="Password" 
                                            className="w-72 h-10" 
                                            id="password" 
                                            type="password" 
                                            aria-describedby="password-help" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center mt-6'>
                                <div className="w-full">
                                    <Button 
                                        label='Simpan'  
                                        className='p-button-info w-full h-10 shadow-xl drop-shadow-lg' 
                                    />
                                </div>
                            </div>
                            </form>
                        </Dialog>
                    </div>
                </div>
                <Toolbar right={rightContents} left={leftContents} className="bg-sky-800" />
                <div className="flex w-ful mb-4" style={{ maxHeight: 'calc(200vh - 160px)'}}>
                    <DataTable 
                    value={dataAdmin.users}
                    selectionMode={'checkbox'}
                    selection={selectedAdmin}
                    onSelectionChange={(e) => setSelectedAdmin(e.value)}
                    dataKey="_id"
                    rows={5}
                    paginator 
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                    className="w-full text-sm shadow-md" scrollable scrollHeight="flex" scrollDirection="right" tableStyle={{ minWidth: '80vw',}}>
                        <Column selectionMode="multiple" style={{maxWidth:'4rem'}}></Column>
                        <Column header="No" body={nomorKolom} sortable style={{maxWidth:'3rem'}}></Column>
                        <Column field="nama" header="Nama" style={{minWidth:'8em'}}></Column>
                        <Column field="username" header="Username"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="jabatan" header="Jabatan"></Column>
                        <Column field="" header="" body={bodyAction}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Admin;