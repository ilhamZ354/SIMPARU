import { useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Card } from "@material-tailwind/react";
import PieOption from "../components/charts/PieOption";
import BarOption7 from "../components/charts/BarOption7";
import { siswas } from "../services/siswa.service";

const SiswaGuru = () => {
    const [dataSiswa, setDataSiswa] = useState();

    useEffect(() => {
        const fetchSiswas = async () => {
            try {
                const data = await siswas();
                setDataSiswa(data.siswa);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSiswas();
    }, []);
    

    const dataAlamat = {
        data: [ 80, 20, 30, 65,50,33,12, 30],
        kategori: ['Kisaran timur','Kisaran barat','Pulo Bandring', 'Rawang Panca Arga', 'Air joman', 'Meranti', 'Pulo raja', 'Tanjungbalai', ]
    };

    const nomorKolom = (rowData, column) => {
        return column.rowIndex + 1;
    };
    
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-info" text />;
    const paginatorRight = <span></span>;
    
    return (
        <div className='flex w-full mb-4'>
            <div className='flex flex-col w-full mr-3'>
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
                                value={dataSiswa}
                                dataKey="id"
                                rows={10}
                                paginator 
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                                filterDisplay="row"
                                className="w-full text-sm" scrollable scrollHeight="flex" scrollDirection="right" tableStyle={{ minWidth: '80vw',}}>
                                    <Column field="no" header="No" body={nomorKolom}  style={{maxWidth:"4rem"}} sortable></Column>
                                    <Column field="nama" header="Nama" filter filterPlaceholder="Nama.." style={{ maxWidth: '16rem' }}></Column>
                                    {console.log(dataSiswa)}
                                    <Column field="sekolahAsal.nama_sekolah" header="Sekolah asal" style={{minWidth:'14rem'}} filter filterPlaceholder="Sekolah.."></Column>
                                    <Column field="alamat_lengkap" header="Alamat siswa" filter filterPlaceholder="Alamat.." style={{ minWidth: '12rem' }}></Column>
                                    <Column field="rombel.jurusan" header="Jurusan" filter filterPlaceholder="Jurusan"></Column>
                                </DataTable>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiswaGuru;