import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Card } from "@material-tailwind/react";
import Studentform from "../components/Studentform";
import { deleteSiswa, siswas } from "../services/siswa.service";
import { format } from 'date-fns';

const Siswa = () => {
    const [setNewStudent, setSelectedNewStudent] = useState();
    const [editUser, setEdituser] = useState();
    const [selectedSiswa, setSelectedSiswa] = useState(null);
    const [viewDetail, setViewdetail] = useState(false);
    const [dataSiswa, setDataSiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [siswaToEdit, setSiswaToEdit] = useState(null);
    const [detailSiswa, setDetailSiswa] = useState(null);

    useEffect(() => {
        const fetchSiswas = async () => {
            try {
                const data = await siswas();
                setDataSiswa(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSiswas();
    }, []);

    const deleteSelectSiswa = async () => {
        const selectedIds = selectedSiswa.map((siswa) => siswa._id);
        try {
            await Promise.all(selectedIds.map(id => deleteSiswa(id)));
            alert('Data siswa berhasil dihapus!');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Terjadi kesalahan saat menghapus data siswa!');
        }
    };

    const nomorKolom = (rowData, column) => {
        return column.rowIndex + 1;
    };

    const formatTanggal = (date) => {
        if (!date) return '';
        return format(new Date(date), 'dd-MM-yyyy');
    };
    
    const bodyAction = (rowData) => {
        return (
            <div className="flex flex-row">
                <Button label="" icon="pi pi-external-link" className="p-button-warning h-8"
                    onClick={() => {
                        setViewdetail(true);
                        setDetailSiswa(rowData);
                    }}></Button>
                <div className="flex w-full">
                    <button type="submit" label="edit siswa" className="text-xs p-2 border border-cyan-600 w-24 rounded-xl ml-2 text-cyan-600 justify-center font-normal hover:bg-cyan-800 hover:text-slate-50"
                        onClick={() => {
                            setEdituser(true);
                            setSiswaToEdit(rowData);
                        }}
                    >edit siswa</button>
                    <Dialog
                        header="Edit Siswa"
                        visible={editUser}
                        style={{ width: '65vw', minWidth: '40rem' }}
                        onHide={() => setEdituser(false)}
                    >
                        <Studentform data={siswaToEdit} />
                    </Dialog>
                </div>
                <Dialog header="Detail siswa" visible={viewDetail} style={{ width: '50vw' }} onHide={() => setViewdetail(false)}>
                    {detailSiswa && (
                        <div className="flex w-full">
                            <DataTable
                            scrollable scrollW="flex" scrollDirection="right" 
                            className="text-start"
                            value={[detailSiswa]}>
                                <Column field="no" header="No" body={nomorKolom}></Column>
                                <Column field="nama" header="Nama"  style={{minWidth:'15vw'}}></Column>
                                <Column field="nisn" header="NISN" style={{minWidth:'15vw'}}></Column>
                                <Column field="jenis_kelamin" header="Jenis Kelamin" style={{minWidth:'10vw'}}></Column>
                                <Column field="tempat_lahir" header="Tempat lahir" style={{minWidth:'15vw'}}></Column>
                                <Column field="tanggal_lahir" header="Tanggal lahir" body={(rowData) => formatTanggal(rowData.tanggal_lahir)} style={{ minWidth: '15vw' }}></Column>
                                <Column field="nik" header="NIK" style={{minWidth:'15vw'}}></Column>
                                <Column field="telepon" header="Telepon" style={{minWidth:'15vw'}}></Column>
                                <Column field="nilai" header="Nilai Akhir" style={{minWidth:'10vw'}}></Column>
                                <Column field="orangtua.ayah.nama" header="Ayah" style={{minWidth:'15vw'}}></Column>
                                <Column field="orangtua.ibu.nama" header="Ibu" style={{minWidth:'15vw'}}></Column>
                                <Column field="sekolahAsal.nama_sekolah" header="Sekolah Asal" style={{minWidth:'20vw'}}></Column>
                                <Column field="alamat_lengkap" header="Alamat Siswa"  style={{minWidth:'40vw'}}></Column>
                                <Column field="rombel.jurusan" header="Jurusan" style={{minWidth:'20vw'}}></Column>
                            </DataTable>
                        </div>
                    )}
                </Dialog>
            </div>
        );
    }

    const buttonHeader = (
        <Button
            icon="pi pi-trash"
            className="p-button-info"
            onClick={deleteSelectSiswa}
            disabled={!selectedSiswa || !selectedSiswa.length}
        />
    );

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-info" text onClick={() => window.location.reload()} />;
    const paginatorRight = <span></span>

    return (
        <div className='flex w-full mb-4'>
            <div className='flex flex-col w-full mr-3'>
                <div className='flex w-full'>
                    <div className="flex w-full" style={{width:"60vw", height:"3vw"}}>
                        <Button label="Input siswa" className="p-button-info shadow-lg" icon="pi pi-plus" onClick={()=>{setSelectedNewStudent(true)}}></Button>
                        <Dialog 
                            header="Input Siswa" 
                            visible={setNewStudent} 
                            style={{ width: '65vw', minWidth: '40rem' }} 
                            onHide={() => { if (!setNewStudent) return; setSelectedNewStudent(false); }}
                        >
                            <Studentform/>
                        </Dialog>
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <div className="flex flex-col  w-full mt-4">
                        <Card className="w-full rounded-none" title="card 3">
                        <div className="flex w-full mt-2 rounded-lg" style={{ maxHeight: 'calc(200vh - 160px)'}}>
                                <DataTable 
                                value={dataSiswa.siswa}
                                selectionMode={'checkbox'}
                                selection={selectedSiswa}
                                onSelectionChange={(e) => setSelectedSiswa(e.value)}
                                dataKey="_id"
                                rows={100}
                                paginator 
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                                filterDisplay="row"
                                className="w-full text-sm" scrollable scrollHeight="flex" scrollDirection="right" tableStyle={{ minWidth: '80vw',}}>
                                    <Column selectionMode="multiple" header={buttonHeader} headerStyle={{ marginRight: '0' }} style={{maxWidth:"4rem"}}></Column>
                                    <Column  header="No" body={nomorKolom} style={{maxWidth:"4rem"}} sortable></Column>
                                    <Column field="nama" header="Nama" filter filterPlaceholder="Nama.." style={{ minWidth: '12rem' }}></Column>
                                    <Column field="sekolahAsal.nama_sekolah" header="Sekolah Asal" filter filterPlaceholder="Sekolah.." style={{minWidth:'14rem'}}></Column>
                                    <Column field="rombel.jurusan" header="Jurusan" filter filterPlaceholder="Jurusan.." style={{ minWidth: '12rem' }}></Column>
                                    <Column field="" header="" body={bodyAction}></Column>
                                </DataTable>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Siswa;