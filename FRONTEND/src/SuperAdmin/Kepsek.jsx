import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { regisKepsek, kepsek, deleteKepsekData, editDataKepsek } from "../services/kepsek.services";

const Kepsek = () => {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newKepsek, setNewKepsek] = useState(false);
    const [editKepsek, setEditKepsek] = useState(false);
    const [dataKepsek, setDataKepsek] = useState({ users: [] });
    const [kepsekToEdit, setKepsekToEdit] = useState(null);
    const [new_password, setNewPassword] = useState('');

    const submitKepsek = async (e) => {
        e.preventDefault();
        try {
            const success = await regisKepsek(nama, username, email, password);
            if (success) {
                setNewKepsek(false);
                alert('Data kepala sekolah berhasil ditambahkan!');
                fetchKepsek();
            } else {
                alert('Data kepala sekolah gagal ditambahkan!');
            }
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan!');
        }
    };

    const deleteKepsek = async (e) => {
        e.preventDefault();
        try {
            const success = await deleteKepsekData();
            if (success) {
                setNewKepsek(false);
                alert('Data kepala sekolah berhasil dihapus!');
                fetchKepsek();
            } else {
                alert('Data kepala sekolah gagal dihapus!');
            }
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan!');
        }
    }


    const fetchKepsek = async () => {
        try {
            const response = await kepsek();
            setDataKepsek(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchKepsek();
    }, []);

    const nomorKolom = (rowData, column) => {
        return column.rowIndex + 1;
    };

    const submitEditKepsek = async (e) => {
        e.preventDefault();
        try {
            const updateKepsekData = { nama, username, email, password, new_password };
            console.log('Submitting data:', updateKepsekData);
            const success = await editDataKepsek(kepsekToEdit._id, updateKepsekData);
            if (success) {
                setEditKepsek(false);
                alert('Data kepala sekolah berhasil diperbarui!');
                fetchKepsek();
            } else {
                alert('Data kepala sekolah gagal diperbarui!');
            }
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan!');
        }
    };

    const bodyAction = (rowData) => {
        return (
            <div className="flex flex-row">
                <div className="flex w-full">
                    <button
                        type="button"
                        className="text-xs p-2 border border-cyan-600 w-24 rounded-xl ml-2 text-cyan-600 justify-center font-normal hover:bg-cyan-800 hover:text-slate-50"
                        onClick={() => {
                            setEditKepsek(true);
                            setKepsekToEdit(rowData);
                            setNama(rowData.nama);
                            setUsername(rowData.username);
                            setEmail(rowData.email);
                        }}
                    >
                        edit profil
                    </button>
                    <Button
                        icon="pi pi-trash"
                        className="bg-red-600 ml-2"
                        onClick={deleteKepsek}
                    ></Button>
                    <Dialog
                        header="Edit Admin"
                        visible={editKepsek}
                        style={{ width: '25vw', minWidth: '10rem' }}
                        onHide={() => setEditKepsek(false)}
                    >
                        <form onSubmit={submitEditKepsek}>
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
                                    <label htmlFor="Password" className="mt-4">Old Password</label>
                                    <div className='w-72'>
                                        <InputText
                                            keyfilter="password"
                                            placeholder="Password"
                                            className="w-72 h-10"
                                            id="old_password"
                                            type="password"
                                            aria-describedby="password-help"
                                            value={password ?? ''}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="newPassword" className="mt-4">New Password</label>
                                    <div className='w-72'>
                                        <InputText
                                            keyfilter="password"
                                            placeholder="New password"
                                            className="w-72 h-10"
                                            id="newPassword"
                                            type="password"
                                            aria-describedby="password-help"
                                            value={new_password}
                                            onChange={(e) => setNewPassword(e.target.value)}
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
    };

    const leftContents = (
        <h2 className="text-white">Kepala Sekolah</h2>
    );

    const leftContents2 = (
        <h2 className="text-white">Riwayat keputusan</h2>
    );

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-info" text onClick={() => window.location.reload()} />;
    const paginatorRight = <p></p>;

    return (
        <div className='flex w-full mb-4'>
            <div className='grid grid-flow-row w-full mr-3'>
                <div className='flex'>
                    <div className="flex w-full" style={{ width: "60vw", height: "3vw" }}>
                        <Button
                            label="Input Kepsek"
                            className="p-button-info shadow-lg"
                            icon="pi pi-plus"
                            onClick={() => setNewKepsek(true)}
                            disabled={dataKepsek.users.length > 0}
                        ></Button>
                        <Dialog
                            header="Input User"
                            visible={newKepsek}
                            style={{ width: '25vw', minWidth: '10rem' }}
                            onHide={() => setNewKepsek(false)}
                        >
                            <form onSubmit={submitKepsek}>
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

                {/* data kepsek */}
                <Toolbar left={leftContents} className="bg-sky-800" />
                <div className="flex w-full mb-4" style={{ maxHeight: 'calc(200vh - 160px)' }}>
                    <DataTable
                        value={dataKepsek.users}
                        dataKey="_id"
                        rows={1}
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        className="w-full text-sm shadow-md"
                        scrollable
                        scrollHeight="flex"
                        scrollDirection="right"
                        tableStyle={{ minWidth: '80vw' }}
                    >
                        <Column field="nama" header="Nama" style={{ minWidth: '8em' }}></Column>
                        <Column field="username" header="Username"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="" header="" body={bodyAction}></Column>
                    </DataTable>
                </div>

                {/* keputusan kepsek */}
                <Toolbar left={leftContents2} className="bg-sky-800" />
                <div className="flex w-full mb-4" style={{ maxHeight: 'calc(200vh - 160px)' }}>
                    <DataTable
                        value={[]}
                        dataKey="_id"
                        rows={10}
                        paginator
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        className="w-full text-sm shadow-md"
                        scrollable
                        scrollHeight="flex"
                        scrollDirection="right"
                        tableStyle={{ minWidth: '80vw' }}
                    >
                        <Column header="No" body={nomorKolom} sortable style={{ maxWidth: '3rem' }}></Column>
                        <Column field="nama" header="Kategori" style={{ minWidth: '8em' }}></Column>
                        <Column field="username" header="Keputusan"></Column>
                        <Column field="email" header="Ditujukan kepada"></Column>
                        <Column field="tanggal" header="Tanggal"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Kepsek;
