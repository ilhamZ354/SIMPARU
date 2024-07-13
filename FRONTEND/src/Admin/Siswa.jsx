import { useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import PhotoProfile from '../../../BACKEND/uploads/images/profil-image2.jpg';
import { Card } from "@material-tailwind/react";
import PieOption from "../components/charts/PieOption";
import BarOption7 from "../components/charts/BarOption7";
import Studentform from "../components/Studentform";
import { deleteSiswa, siswas } from "../services/siswa.service";

const Siswa = () => {
    const [setNewStudent, setSelectedNewStudent] = useState();
    const [editUser, setEdituser] = useState();
    const [selectedSiswa, setSelectedSiswa] = useState(null);
    const [viewDetail, setViewdetail] = useState(false);
    const [dataSiswa, setDataSiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [siswaToEdit, setSiswaToEdit] = useState();
    
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

    const dataAlamat = {
        data: [ 80, 20, 30, 65,50,33,12, 30],
        kategori: ['Kisaran timur','Kisaran barat','Pulo Bandring', 'Rawang Panca Arga', 'Air joman', 'Meranti', 'Pulo raja', 'Tanjungbalai', ]
    }

    const bodyAction = (rowData) =>{
        return(
            <div className="flex flex-row">
                <Button label="" icon="pi pi-external-link" className="p-button-warning h-8" 
                 onClick={()=>{
                    setViewdetail(true);
                    setSiswaToEdit(rowData);
                    }
                }></Button>
                <div className="flex w-fulll">
                    <button type="submit" label="edit siswa" className="text-xs p-2 border border-cyan-600 w-24 rounded-xl ml-2 text-cyan-600 justify-center font-normal hover:bg-cyan-800 hover:text-slate-50" 
                    onClick={()=>{
                        setEdituser(true);
                        setSiswaToEdit(rowData);
                        console.log(siswaToEdit)
                    }}
                    >edit profil</button>
                    <Dialog 
                            header="Edit Siswa" 
                            visible={editUser} 
                            style={{ width: '65vw', minWidth: '40rem' }} 
                            onHide={() => { if (!editUser) return; setEdituser(false); }}
                        >
                            <Studentform data={siswaToEdit}/>
                        </Dialog>
                </div>
                <Dialog header="Detail siswa" visible={viewDetail} style={{ width: '50vw' }} onHide={() => {if (!viewDetail) return; setViewdetail(false); }}>
                    <div className="flex w-full">
                        <DataTable 
                        value={dataSiswa.siswa.map(() => dataSiswa[0])}
                        tableStyle={{minWidth:'50rem'}}
                        >
                            <Column field="no" header="no"></Column>
                            <Column field="nama" header="Nama"></Column>
                            <Column field="asal_sekolah" header="Sekolah asal" ></Column>
                            <Column field="alamat" header="Alamat siswa"></Column>
                            <Column field="jurusan" header="Jurusan"></Column>
                        </DataTable>    
                    </div> 
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


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-info" text onClick={() => window.location.reload()}/>;
    const paginatorRight = <Button type="button" icon="pi pi-download" className="p-button-info" text />;
    
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
                    <div className="flex w-full">
                        <div className="flex flex-row gap-4 w-full">
                            <div className="flex w-1/3">
                            <Card className="w-full bg-sky-800 mr-4" title="card 1">
                                <div className="w-full m-2">
                                    <div className="flex flex-col">
                                    <span className='text-white font-sans text-xs ml-3 mt-2'>Grafik jurusan semua siswa</span>
                                        <PieOption
                                        style={{marginTop:'5px'}}
                                    />
                                    </div>
                                </div>
                            </Card>
                            </div>
                            <div className="w-2/3">
                                <Card className="w-full bg-sky-800" title="card 2">
                                    <div className="w-full m-2">
                                            <div className="flex flex-col">
                                            <span className='text-white font-sans text-xs ml-3 mt-2'>Grafik alamat siswa</span>
                                                <BarOption7
                                                style={{marginTop:'2px', height:'250px', width:'90%', marginBottom:'5px'}}
                                                datas={dataAlamat}
                                            />
                                            </div>
                                        </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col  w-full mt-4">
                        <div className="w-full text-slate-400 font-sans">
                            <span>Terakhir update pada : 22/04/2023</span>
                        </div>
                        <Card className="w-full rounded-none" title="card 3">
                        <div className="flex w-full mt-2 rounded-lg" style={{ maxHeight: 'calc(200vh - 160px)'}}>
                                <DataTable 
                                value={dataSiswa.siswa}
                                selectionMode={'checkbox'}
                                selection={selectedSiswa}
                                onSelectionChange={(e) => setSelectedSiswa(e.value)}
                                dataKey="_id"
                                rows={10}
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
                                    {console.log(dataSiswa.siswa)}
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