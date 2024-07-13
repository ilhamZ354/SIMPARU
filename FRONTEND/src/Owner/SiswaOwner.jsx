import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Card } from "@material-tailwind/react";
import PieOption from "../components/charts/PieOption";
import BarOption7 from "../components/charts/BarOption7";


const SiswaOwner = () => {
    const [selectedJurusan, setSelectedJurusan] = useState();

    const dataSiswa = [
        {
            "no": 1,
            "nama": "Ilham Zukhri",
            "asal_sekolah": "SMP 1 Medan",
            "alamat": "Medan",
            "jurusan": "Teknik komputer dan jaringan",
        },
        {
            "no": 2,
            "nama": "Budi Santoso",
            "asal_sekolah": "SMP 2 Bandung",
            "alamat": "Bandung",
            "jurusan": "Teknik audio video",
        },
        {
            "no": 3,
            "nama": "Citra Dewi",
            "asal_sekolah": "SMP 3 Surabaya",
            "alamat": "Surabaya",
            "jurusan": "Teknik dan bisnis sepeda motor",
        },
        {
            "no": 4,
            "nama": "Dian Pratama",
            "asal_sekolah": "SMP 4 Jakarta",
            "alamat": "Jakarta",
            "jurusan": "Teknik bodi otomotif",
        },
        {
            "no": 5,
            "nama": "Eka Wulandari",
            "asal_sekolah": "SMP 5 Yogyakarta",
            "alamat": "Yogyakarta",
            "jurusan": "Teknik komputer dan jaringan",
        },
        {
            "no": 6,
            "nama": "Fajar Nugroho",
            "asal_sekolah": "SMP 6 Semarang",
            "alamat": "Semarang",
            "jurusan": "Teknik audio video",
        },
        {
            "no": 7,
            "nama": "Gita Puspita",
            "asal_sekolah": "SMP 7 Palembang",
            "alamat": "Palembang",
            "jurusan": "Teknik dan bisnis sepeda motor",
        },
        {
            "no": 8,
            "nama": "Hariyanto",
            "asal_sekolah": "SMP 8 Makassar",
            "alamat": "Makassar",
            "jurusan": "Teknik bodi otomotif",
        },
        {
            "no": 9,
            "nama": "Indra Wijaya",
            "asal_sekolah": "SMP 9 Bali",
            "alamat": "Bali",
            "jurusan": "Teknik komputer dan jaringan",
        },
        {
            "no":10,
            "nama": "Joko Santoso",
            "asal_sekolah": "SMP 10 Aceh",
            "alamat": "Aceh",
            "jurusan": "Teknik audio video",
        },
        {
            "no": 11,
            "nama": "Kartika Sari",
            "asal_sekolah": "SMP 11 Pontianak",
            "alamat": "Pontianak",
            "jurusan": "Teknik dan bisnis sepeda motor",
        },
        {
            "no": 12,
            "nama": "Lestari Widodo",
            "asal_sekolah": "SMP 12 Manado",
            "alamat": "Manado",
            "jurusan": "Teknik bodi otomotif",
        },
        {
            "no": 13,
            "nama": "Maya Kusuma",
            "asal_sekolah": "SMP 13 Malang",
            "alamat": "Malang",
            "jurusan": "Teknik komputer dan jaringan",
        },
        {
            "no": 14,
            "nama": "Nurul Fadhilah",
            "asal_sekolah": "SMP 14 Padang",
            "alamat": "Padang",
            "jurusan": "Teknik audio video",
        },
        {
            "nama": "Oki Susanto",
            "asal_sekolah": "SMP 15 Pekanbaru",
            "alamat": "Pekanbaru",
            "jurusan": "Teknik dan bisnis sepeda motor",
        },
        {
            "nama": "Putri Amalia",
            "asal_sekolah": "SMP 16 Solo",
            "alamat": "Solo",
            "jurusan": "Teknik bodi otomotif",
        },
        {
            "nama": "Rizky Aditya",
            "asal_sekolah": "SMP 17 Banjarmasin",
            "alamat": "Banjarmasin",
            "jurusan": "Teknik komputer dan jaringan",
        },
        {
            "nama": "Sinta Dewi",
            "asal_sekolah": "SMP 18 Batam",
            "alamat": "Batam",
            "jurusan": "Teknik audio video",
        },
        {
            "nama": "Taufik Hidayat",
            "asal_sekolah": "SMP 19 Jambi",
            "alamat": "Jambi",
            "jurusan": "Teknik dan bisnis sepeda motor",
        },
        {
            "nama": "Umi Kalsum",
            "asal_sekolah": "SMP 20 Balikpapan",
            "alamat": "Balikpapan",
            "jurusan": "Teknik bodi otomotif",
        }
    ];
    

    const dataAlamat = {
        data: [ 80, 20, 30, 65,50,33,12, 30],
        kategori: ['Kisaran timur','Kisaran barat','Pulo Bandring', 'Rawang Panca Arga', 'Air joman', 'Meranti', 'Pulo raja', 'Tanjungbalai', ]
    }


    //jurusan
    const jurusan = [
        {name: "Teknik Komputer dan Jaringan"},
        {name: "Teknik Audio Video"},
        {name: "Teknik dan Bisnis Sepeda Motor"},
        {name: "Teknik Bodi Otomotif"},
    ]
    const FilterJurusan = (
        <Dropdown value={selectedJurusan} onChange={(e) => setSelectedJurusan(e.value)} options={jurusan} optionLabel="name" 
        placeholder="Jurusan" className="md:w-32 sm:w-12 h-10 text-xs" />
    )

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-info" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" className="p-button-info" text />;
    
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
                                    <Column selectionMode="multiple" headerStyle={{ marginRight: '0' }} style={{maxWidth:"4rem"}}></Column>
                                    <Column field="no"  header="No" style={{maxWidth:"4rem"}} sortable></Column>
                                    <Column field="nama" header="Nama" filter filterPlaceholder="Nama.." style={{ minWidth: '12rem' }}></Column>
                                    {console.log(dataSiswa)}
                                    <Column field="asal_sekolah" header="Sekolah asal" style={{minWidth:'14rem'}} filter filterPlaceholder="Sekolah.."></Column>
                                    <Column field="alamat" header="Alamat siswa" filter filterPlaceholder="Alamat.." style={{ minWidth: '12rem' }}></Column>
                                    <Column field="jurusan" header="Jurusan" filter filterElement={FilterJurusan}></Column>
                                </DataTable>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiswaOwner;